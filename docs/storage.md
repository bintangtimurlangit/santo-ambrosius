# Storage Solutions Guide - Gereja Santo Ambrosius

This guide covers alternative storage solutions for media files, including self-hosted options like MinIO and cloud services like Cloudflare R2.

## Table of Contents

1. [Overview](#overview)
2. [Current Storage Setup](#current-storage-setup)
3. [MinIO Self-Hosted Storage](#minio-self-hosted-storage)
4. [Cloudflare R2 Storage](#cloudflare-r2-storage)
5. [AWS S3 Compatible Solutions](#aws-s3-compatible-solutions)
6. [Migration Strategies](#migration-strategies)
7. [Performance Considerations](#performance-considerations)
8. [Cost Analysis](#cost-analysis)
9. [Implementation Guide](#implementation-guide)

## Overview

### Why Consider Alternative Storage?

1. **Cost Optimization**: Reduce storage costs for large media libraries
2. **Performance**: Improve load times with CDN integration
3. **Scalability**: Handle growing media requirements
4. **Control**: Maintain full control over your data
5. **Redundancy**: Improve backup and disaster recovery

### Storage Options Comparison

| Solution | Cost | Setup Complexity | Performance | Control | Scalability |
|----------|------|------------------|-------------|---------|-------------|
| Local Storage | Low | Easy | Good | High | Limited |
| Payload Cloud | Medium | Easy | Excellent | Medium | High |
| MinIO | Low | Medium | Good | High | High |
| Cloudflare R2 | Low | Easy | Excellent | Medium | High |
| AWS S3 | Medium | Easy | Excellent | Medium | High |

## Current Storage Setup

### Default Configuration

Currently, the project uses local file storage with optional Payload Cloud integration:

```typescript
// payload.config.ts
export default buildConfig({
  // ... other config
  plugins: [
    payloadCloudPlugin(), // Handles cloud storage automatically
  ],
})
```

### Local Storage Structure

```
/app/uploads/
├── images/
│   ├── original/
│   ├── thumbnails/
│   └── optimized/
└── videos/
    ├── original/
    └── compressed/
```

## MinIO Self-Hosted Storage

MinIO is an open-source, S3-compatible object storage solution perfect for self-hosting.

### Benefits of MinIO

- **S3 Compatible**: Works with existing S3 SDKs and tools
- **High Performance**: Optimized for high throughput
- **Easy Scaling**: Add nodes as needed
- **Cost Effective**: No per-request fees
- **Data Sovereignty**: Keep all data on your infrastructure

### MinIO Setup

#### Docker Compose Integration

Add MinIO to your `docker-compose.prod.yml`:

```yaml
version: '3.8'

services:
  # ... existing services

  minio:
    image: minio/minio:latest
    container_name: santo-ambrosius-minio
    restart: unless-stopped
    ports:
      - "9000:9000"  # API
      - "9001:9001"  # Console
    environment:
      MINIO_ROOT_USER: ${MINIO_ROOT_USER}
      MINIO_ROOT_PASSWORD: ${MINIO_ROOT_PASSWORD}
      MINIO_BROWSER_REDIRECT_URL: https://minio-console.your-domain.com
    volumes:
      - minio_data:/data
    networks:
      - app-network
    command: server /data --console-address ":9001"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:9000/minio/health/live"]
      interval: 30s
      timeout: 20s
      retries: 3

volumes:
  minio_data:
    driver: local

networks:
  app-network:
    driver: bridge
```

#### MinIO Configuration

Create MinIO initialization script (`scripts/setup-minio.sh`):

```bash
#!/bin/bash

# Wait for MinIO to be ready
until curl -f http://localhost:9000/minio/health/live; do
    echo "Waiting for MinIO..."
    sleep 5
done

# Install MinIO client
docker exec santo-ambrosius-minio curl -LO https://dl.min.io/client/mc/release/linux-amd64/mc
docker exec santo-ambrosius-minio chmod +x mc
docker exec santo-ambrosius-minio mv mc /usr/local/bin/

# Configure MinIO client
docker exec santo-ambrosius-minio mc alias set local http://localhost:9000 ${MINIO_ROOT_USER} ${MINIO_ROOT_PASSWORD}

# Create buckets
docker exec santo-ambrosius-minio mc mb local/santo-ambrosius-media
docker exec santo-ambrosius-minio mc mb local/santo-ambrosius-backups

# Set bucket policies (public read for media)
docker exec santo-ambrosius-minio mc anonymous set public local/santo-ambrosius-media

echo "MinIO setup completed!"
```

### Payload CMS MinIO Integration

Install the S3 adapter for Payload:

```bash
pnpm add @payloadcms/storage-s3
```

Update your `payload.config.ts`:

```typescript
import { s3Storage } from '@payloadcms/storage-s3'

export default buildConfig({
  // ... other config
  plugins: [
    s3Storage({
      collections: {
        media: {
          prefix: 'media',
        },
      },
      bucket: 'santo-ambrosius-media',
      config: {
        endpoint: process.env.MINIO_ENDPOINT || 'http://minio:9000',
        region: 'us-east-1', // MinIO default
        credentials: {
          accessKeyId: process.env.MINIO_ACCESS_KEY!,
          secretAccessKey: process.env.MINIO_SECRET_KEY!,
        },
        forcePathStyle: true, // Required for MinIO
      },
    }),
  ],
})
```

### Environment Variables for MinIO

Add to your `.env.production`:

```env
# MinIO Configuration
MINIO_ROOT_USER=minioadmin
MINIO_ROOT_PASSWORD=your-secure-password
MINIO_ACCESS_KEY=your-access-key
MINIO_SECRET_KEY=your-secret-key
MINIO_ENDPOINT=http://minio:9000
MINIO_BUCKET=santo-ambrosius-media
MINIO_REGION=us-east-1

# Public URL for accessing files
MINIO_PUBLIC_URL=https://cdn.your-domain.com
```

### MinIO Nginx Configuration

Add to your Nginx configuration:

```nginx
# MinIO API
server {
    listen 443 ssl http2;
    server_name minio-api.your-domain.com;

    # SSL configuration (same as main site)
    # ... SSL config ...

    location / {
        proxy_pass http://127.0.0.1:9000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Large file uploads
        client_max_body_size 100M;
        proxy_request_buffering off;
    }
}

# MinIO Console
server {
    listen 443 ssl http2;
    server_name minio-console.your-domain.com;

    # SSL configuration
    # ... SSL config ...

    location / {
        proxy_pass http://127.0.0.1:9001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # WebSocket support for console
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}

# CDN/Public access
server {
    listen 443 ssl http2;
    server_name cdn.your-domain.com;

    # SSL configuration
    # ... SSL config ...

    # Cache static assets
    location / {
        proxy_pass http://127.0.0.1:9000;
        proxy_set_header Host $host;
        
        # Caching headers
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header X-Served-By "MinIO-CDN";
        
        # CORS for web fonts and assets
        add_header Access-Control-Allow-Origin "*";
    }
}
```

## Cloudflare R2 Storage

Cloudflare R2 offers S3-compatible storage with zero egress fees and excellent global performance.

### Benefits of Cloudflare R2

- **Zero Egress Fees**: No charges for data transfer out
- **Global Performance**: Cloudflare's edge network
- **S3 Compatible**: Easy migration from S3
- **Competitive Pricing**: $0.015/GB/month
- **Built-in CDN**: Automatic global distribution

### Cloudflare R2 Setup

#### 1. Create R2 Bucket

1. Log into Cloudflare Dashboard
2. Go to R2 Object Storage
3. Create a new bucket: `santo-ambrosius-media`
4. Generate API tokens with R2 permissions

#### 2. Configure API Tokens

Create API token with these permissions:
- **Zone**: Zone Settings:Read, Zone:Read
- **Account**: Cloudflare R2:Edit
- **Resources**: Include all accounts and zones

#### 3. Payload CMS R2 Integration

Update `payload.config.ts`:

```typescript
import { s3Storage } from '@payloadcms/storage-s3'

export default buildConfig({
  // ... other config
  plugins: [
    s3Storage({
      collections: {
        media: {
          prefix: 'media',
        },
      },
      bucket: 'santo-ambrosius-media',
      config: {
        endpoint: process.env.CLOUDFLARE_R2_ENDPOINT!,
        region: 'auto',
        credentials: {
          accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
          secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
        },
      },
    }),
  ],
})
```

#### 4. Environment Variables for R2

```env
# Cloudflare R2 Configuration
CLOUDFLARE_R2_ENDPOINT=https://your-account-id.r2.cloudflarestorage.com
CLOUDFLARE_R2_ACCESS_KEY_ID=your-access-key-id
CLOUDFLARE_R2_SECRET_ACCESS_KEY=your-secret-access-key
CLOUDFLARE_R2_BUCKET=santo-ambrosius-media
CLOUDFLARE_R2_PUBLIC_URL=https://your-bucket.your-domain.com
```

#### 5. Custom Domain for R2

1. In Cloudflare Dashboard, go to R2 > Manage > Settings
2. Add custom domain: `cdn.your-domain.com`
3. Configure DNS CNAME record
4. Enable public access if needed

## AWS S3 Compatible Solutions

### Other Compatible Services

1. **DigitalOcean Spaces**
   - S3-compatible API
   - Built-in CDN
   - $5/month for 250GB

2. **Linode Object Storage**
   - S3-compatible
   - $5/month for 250GB
   - Global availability

3. **Wasabi**
   - Hot cloud storage
   - No egress fees
   - $5.99/TB/month

### Generic S3 Configuration

```typescript
// payload.config.ts
import { s3Storage } from '@payloadcms/storage-s3'

export default buildConfig({
  plugins: [
    s3Storage({
      collections: {
        media: {
          prefix: 'media',
        },
      },
      bucket: process.env.S3_BUCKET!,
      config: {
        endpoint: process.env.S3_ENDPOINT, // Optional for custom endpoints
        region: process.env.S3_REGION!,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
        },
        forcePathStyle: process.env.S3_FORCE_PATH_STYLE === 'true', // For MinIO/custom endpoints
      },
    }),
  ],
})
```

## Migration Strategies

### From Local Storage to Cloud

#### 1. Data Migration Script

Create `scripts/migrate-to-cloud.js`:

```javascript
const fs = require('fs')
const path = require('path')
const AWS = require('aws-sdk')

// Configure S3 client (works with MinIO, R2, etc.)
const s3 = new AWS.S3({
  endpoint: process.env.S3_ENDPOINT,
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_REGION || 'us-east-1',
  s3ForcePathStyle: true,
})

async function migrateFiles(localPath, s3Prefix = '') {
  const files = fs.readdirSync(localPath, { withFileTypes: true })
  
  for (const file of files) {
    const filePath = path.join(localPath, file.name)
    const s3Key = path.join(s3Prefix, file.name).replace(/\\/g, '/')
    
    if (file.isDirectory()) {
      await migrateFiles(filePath, s3Key)
    } else {
      console.log(`Uploading ${filePath} to ${s3Key}`)
      
      const fileContent = fs.readFileSync(filePath)
      
      await s3.upload({
        Bucket: process.env.S3_BUCKET,
        Key: s3Key,
        Body: fileContent,
        ContentType: getContentType(file.name),
      }).promise()
    }
  }
}

function getContentType(filename) {
  const ext = path.extname(filename).toLowerCase()
  const contentTypes = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.mp4': 'video/mp4',
    '.pdf': 'application/pdf',
  }
  return contentTypes[ext] || 'application/octet-stream'
}

// Run migration
migrateFiles('./uploads')
  .then(() => console.log('Migration completed'))
  .catch(console.error)
```

#### 2. Database Updates

Update media collection documents to reflect new URLs:

```javascript
// scripts/update-media-urls.js
const payload = require('payload')

async function updateMediaUrls() {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    mongoURL: process.env.DATABASE_URI,
    local: true,
  })

  const media = await payload.find({
    collection: 'media',
    limit: 1000,
  })

  for (const item of media.docs) {
    const newUrl = item.url.replace('/uploads/', `${process.env.CDN_URL}/`)
    
    await payload.update({
      collection: 'media',
      id: item.id,
      data: {
        url: newUrl,
      },
    })
    
    console.log(`Updated ${item.filename}: ${newUrl}`)
  }
}

updateMediaUrls()
```

### Zero-Downtime Migration

1. **Setup new storage** alongside existing
2. **Configure dual-write** to both storages
3. **Migrate existing files** in background
4. **Update database URLs** gradually
5. **Switch read traffic** to new storage
6. **Decommission old storage**

## Performance Considerations

### CDN Integration

#### Cloudflare CDN

```nginx
# Nginx configuration with Cloudflare
server {
    location /media/ {
        # Let Cloudflare handle caching
        proxy_pass https://cdn.your-domain.com/;
        proxy_set_header Host cdn.your-domain.com;
        
        # Don't cache on server since Cloudflare handles it
        expires off;
        add_header Cache-Control "no-cache";
    }
}
```

#### Image Optimization

Consider using services like:
- **Cloudflare Images**: Automatic optimization and resizing
- **ImageKit**: Real-time image transformation
- **Cloudinary**: Comprehensive media management

### Caching Strategies

```typescript
// Custom image optimization endpoint
// src/app/api/images/[...path]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const imagePath = params.path.join('/')
  const { searchParams } = new URL(request.url)
  
  const width = searchParams.get('w') ? parseInt(searchParams.get('w')!) : undefined
  const quality = searchParams.get('q') ? parseInt(searchParams.get('q')!) : 80
  
  try {
    // Fetch original image from storage
    const response = await fetch(`${process.env.CDN_URL}/${imagePath}`)
    const buffer = await response.arrayBuffer()
    
    // Optimize with Sharp
    let image = sharp(Buffer.from(buffer))
    
    if (width) {
      image = image.resize(width, undefined, { withoutEnlargement: true })
    }
    
    const optimized = await image
      .jpeg({ quality })
      .toBuffer()
    
    return new NextResponse(optimized, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    return new NextResponse('Image not found', { status: 404 })
  }
}
```

## Cost Analysis

### Monthly Cost Comparison (100GB storage, 1TB transfer)

| Solution | Storage Cost | Transfer Cost | Total | Notes |
|----------|-------------|---------------|-------|-------|
| Local Storage | $0 | $0 | $10-20/month | Server costs only |
| MinIO Self-hosted | $0 | $0 | $15-30/month | Server + backup costs |
| Cloudflare R2 | $1.50 | $0 | $1.50/month | No egress fees |
| AWS S3 | $2.30 | $90 | $92.30/month | High egress costs |
| DigitalOcean Spaces | $5 | $0 | $5/month | 1TB transfer included |

### Cost Optimization Tips

1. **Use CDN** to reduce origin requests
2. **Implement caching** at multiple layers
3. **Compress images** before upload
4. **Use appropriate formats** (WebP, AVIF)
5. **Clean up unused files** regularly

## Implementation Guide

### Phase 1: Planning

1. **Assess current storage usage**
2. **Choose storage solution** based on requirements
3. **Plan migration timeline**
4. **Prepare fallback strategy**

### Phase 2: Setup

1. **Configure new storage service**
2. **Set up CDN and custom domains**
3. **Update application configuration**
4. **Test with sample files**

### Phase 3: Migration

1. **Deploy dual-write configuration**
2. **Migrate existing files**
3. **Update database references**
4. **Verify all files accessible**

### Phase 4: Cutover

1. **Switch read traffic to new storage**
2. **Monitor performance and errors**
3. **Decommission old storage**
4. **Update backup procedures**

### Example Migration Checklist

- [ ] Storage service account created
- [ ] Buckets/containers configured
- [ ] API keys generated and secured
- [ ] Payload CMS storage adapter configured
- [ ] CDN/custom domain set up
- [ ] Migration scripts tested
- [ ] Database backup created
- [ ] Test environment validated
- [ ] Production deployment planned
- [ ] Rollback procedure documented
- [ ] Monitoring alerts configured
- [ ] Team trained on new system

## Monitoring and Maintenance

### Storage Monitoring

```bash
#!/bin/bash
# scripts/monitor-storage.sh

# Check storage usage
echo "Storage Usage Report - $(date)"
echo "=================================="

# MinIO usage (if using MinIO)
if command -v mc &> /dev/null; then
    echo "MinIO Bucket Usage:"
    mc ls --recursive --summarize local/santo-ambrosius-media
fi

# Cloudflare R2 usage (via API)
if [ ! -z "$CLOUDFLARE_API_TOKEN" ]; then
    echo "Cloudflare R2 Usage:"
    curl -X GET "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/r2/buckets/santo-ambrosius-media/usage" \
         -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
fi

# Check application storage health
echo "Application Storage Health:"
curl -f http://localhost:3000/api/health/storage || echo "Storage health check failed"
```

### Backup Procedures

```bash
#!/bin/bash
# scripts/backup-storage.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backup/storage"

# Create backup directory
mkdir -p $BACKUP_DIR

# Sync from primary storage to backup location
aws s3 sync s3://santo-ambrosius-media $BACKUP_DIR/media-$DATE \
    --endpoint-url $BACKUP_ENDPOINT \
    --region $BACKUP_REGION

# Keep only last 30 days of backups
find $BACKUP_DIR -name "media-*" -mtime +30 -exec rm -rf {} \;

echo "Storage backup completed: media-$DATE"
```

### Performance Optimization

1. **Regular cleanup** of unused files
2. **Image optimization** automation
3. **CDN cache optimization**
4. **Monitoring storage costs**
5. **Performance metrics tracking**

---

## Next Steps

1. **Choose your storage solution** based on requirements and budget
2. **Test in development environment** first
3. **Plan migration timeline** with minimal downtime
4. **Implement monitoring** and backup procedures
5. **Document the new setup** for your team

For technical support or implementation assistance, contact the development team.

---

*Last updated: [Date] | Version: 1.0*
