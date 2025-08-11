# Deployment Guide - Gereja Santo Ambrosius

This guide covers production deployment strategies for the church website using Docker, MongoDB, and Nginx as a reverse proxy.

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Environment Configuration](#environment-configuration)
4. [MongoDB Setup](#mongodb-setup)
5. [Docker Deployment](#docker-deployment)
6. [Nginx Configuration](#nginx-configuration)
7. [SSL/TLS Setup](#ssltls-setup)
8. [Monitoring and Logging](#monitoring-and-logging)
9. [Backup Strategies](#backup-strategies)
10. [Troubleshooting](#troubleshooting)

## Overview

### Architecture

```
Internet → Nginx (Reverse Proxy) → Next.js App (Container) → MongoDB (Container/External)
                ↓
            SSL Termination
            Static File Serving
            Load Balancing
```

### Deployment Options

1. **Single Server Setup**: All services on one server (recommended for small to medium traffic)
2. **Multi-Server Setup**: Separate servers for app, database, and static files
3. **Cloud Platform**: Using services like DigitalOcean, AWS, or Google Cloud

## Prerequisites

### Server Requirements

**Minimum Specifications:**
- **CPU**: 2 cores
- **RAM**: 4GB
- **Storage**: 50GB SSD
- **Network**: 1Gbps connection
- **OS**: Ubuntu 22.04 LTS (recommended) or CentOS 8+

**Recommended Specifications:**
- **CPU**: 4 cores
- **RAM**: 8GB
- **Storage**: 100GB SSD
- **Network**: 1Gbps connection

### Software Requirements

- Docker 24.0+
- Docker Compose 2.20+
- Nginx 1.20+
- Certbot (for SSL certificates)
- Git

### Domain and DNS

- Domain name pointed to your server's IP address
- DNS A record configured
- Optional: CDN setup (Cloudflare recommended)

## Environment Configuration

### Production Environment Variables

Create a production `.env` file:

```bash
# Application
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://your-domain.com
PORT=3000

# Database
DATABASE_URI=mongodb://mongo:27017/santo-ambrosius-prod

# Security
PAYLOAD_SECRET=your-super-secure-secret-key-minimum-32-characters
JWT_SECRET=another-secure-secret-for-jwt-tokens

# Media Storage (choose one)
# Option 1: Payload Cloud
PAYLOAD_CLOUD_PROJECT_ID=your-project-id
PAYLOAD_CLOUD_API_KEY=your-api-key

# Option 2: Self-hosted (see storage.md for alternatives)
PAYLOAD_PUBLIC_UPLOAD_PATH=/app/uploads
PAYLOAD_PUBLIC_UPLOAD_URL=https://your-domain.com/uploads

# Monitoring
SENTRY_DSN=your-sentry-dsn
SENTRY_ORG=your-org
SENTRY_PROJECT=your-project

# Email (optional, for notifications)
SMTP_HOST=your-smtp-server
SMTP_PORT=587
SMTP_USER=your-email@domain.com
SMTP_PASS=your-email-password

# Analytics (optional)
GOOGLE_ANALYTICS_ID=GA-XXXXXXXXX
```

### Security Considerations

- **Use strong, unique passwords** for all secrets
- **Rotate secrets regularly** (quarterly recommended)
- **Limit environment variable access** to necessary personnel
- **Use encrypted storage** for sensitive configuration files

## MongoDB Setup

### Option 1: MongoDB in Docker (Recommended for simplicity)

Create `docker-compose.prod.yml`:

```yaml
version: '3.8'

services:
  mongo:
    image: mongo:7.0
    container_name: santo-ambrosius-mongo
    restart: unless-stopped
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_ROOT_PASSWORD}
      MONGO_INITDB_DATABASE: santo-ambrosius-prod
    volumes:
      - mongo_data:/data/db
      - ./mongodb/init:/docker-entrypoint-initdb.d
    networks:
      - app-network
    command: mongod --auth --bind_ip_all
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

volumes:
  mongo_data:
    driver: local

networks:
  app-network:
    driver: bridge
```

### Option 2: External MongoDB Service

**MongoDB Atlas (Cloud)**:
1. Create account at [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a new cluster
3. Configure network access (whitelist server IP)
4. Create database user
5. Get connection string and update `DATABASE_URI`

**Self-hosted MongoDB**:
```bash
# Install MongoDB on Ubuntu
curl -fsSL https://pgp.mongodb.com/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start and enable MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Create database and user
mongosh
use santo-ambrosius-prod
db.createUser({
  user: "appuser",
  pwd: "your-secure-password",
  roles: [{ role: "readWrite", db: "santo-ambrosius-prod" }]
})
```

### MongoDB Security

```javascript
// Create admin user
use admin
db.createUser({
  user: "admin",
  pwd: "your-admin-password",
  roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
})

// Create application user
use santo-ambrosius-prod
db.createUser({
  user: "appuser",
  pwd: "your-app-password",
  roles: [
    { role: "readWrite", db: "santo-ambrosius-prod" }
  ]
})
```

## Docker Deployment

### Production Dockerfile

The provided `Dockerfile` is already optimized for production. Key features:
- Multi-stage build for smaller image size
- Non-root user for security
- Standalone Next.js output for better performance

### Production Docker Compose

Create `docker-compose.prod.yml`:

```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: santo-ambrosius-app
    restart: unless-stopped
    environment:
      - NODE_ENV=production
    env_file:
      - .env.production
    ports:
      - "3000:3000"
    depends_on:
      - mongo
    networks:
      - app-network
    volumes:
      - uploads:/app/uploads
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

  mongo:
    image: mongo:7.0
    container_name: santo-ambrosius-mongo
    restart: unless-stopped
    environment:
      MONGO_INITDB_ROOT_USERNAME: ${MONGO_ROOT_USERNAME}
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_ROOT_PASSWORD}
      MONGO_INITDB_DATABASE: santo-ambrosius-prod
    volumes:
      - mongo_data:/data/db
      - ./mongodb/backup:/backup
    networks:
      - app-network
    command: mongod --auth --bind_ip_all
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

volumes:
  mongo_data:
    driver: local
  uploads:
    driver: local

networks:
  app-network:
    driver: bridge
```

### Deployment Script

Create `scripts/deploy.sh`:

```bash
#!/bin/bash

set -e

echo "🚀 Starting deployment..."

# Pull latest code
git pull origin main

# Build and start services
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml up -d

# Wait for services to be healthy
echo "⏳ Waiting for services to start..."
sleep 30

# Check health
if docker-compose -f docker-compose.prod.yml exec app curl -f http://localhost:3000/api/health; then
    echo "✅ Deployment successful!"
else
    echo "❌ Deployment failed - rolling back..."
    docker-compose -f docker-compose.prod.yml logs app
    exit 1
fi

echo "🧹 Cleaning up old images..."
docker image prune -f

echo "🎉 Deployment completed successfully!"
```

## Nginx Configuration

### Install Nginx

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nginx

# CentOS/RHEL
sudo yum install nginx
```

### Nginx Site Configuration

Create `/etc/nginx/sites-available/santo-ambrosius`:

```nginx
# Rate limiting
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
limit_req_zone $binary_remote_addr zone=general:10m rate=30r/s;

# Upstream backend
upstream santo_ambrosius_app {
    server 127.0.0.1:3000;
    keepalive 32;
}

# HTTP redirect to HTTPS
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    return 301 https://your-domain.com$request_uri;
}

# HTTPS configuration
server {
    listen 443 ssl http2;
    server_name your-domain.com www.your-domain.com;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    ssl_trusted_certificate /etc/letsencrypt/live/your-domain.com/chain.pem;

    # SSL Security
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    ssl_stapling on;
    ssl_stapling_verify on;

    # Security Headers
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; media-src 'self' https:;" always;

    # Logging
    access_log /var/log/nginx/santo-ambrosius.access.log;
    error_log /var/log/nginx/santo-ambrosius.error.log;

    # Basic settings
    client_max_body_size 100M;
    client_body_timeout 60s;
    client_header_timeout 60s;
    keepalive_timeout 65;
    send_timeout 60s;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json
        application/xml
        image/svg+xml;

    # Static files
    location /_next/static/ {
        alias /var/www/santo-ambrosius/static/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location /images/ {
        alias /var/www/santo-ambrosius/public/images/;
        expires 1M;
        add_header Cache-Control "public";
    }

    # API routes with rate limiting
    location /api/ {
        limit_req zone=api burst=20 nodelay;
        proxy_pass http://santo_ambrosius_app;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_redirect off;
    }

    # Admin panel
    location /admin {
        limit_req zone=general burst=10 nodelay;
        proxy_pass http://santo_ambrosius_app;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_redirect off;
    }

    # Main application
    location / {
        limit_req zone=general burst=20 nodelay;
        proxy_pass http://santo_ambrosius_app;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_redirect off;
    }

    # Health check endpoint
    location /health {
        access_log off;
        proxy_pass http://santo_ambrosius_app;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }
}
```

### Enable the Site

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/santo-ambrosius /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

## SSL/TLS Setup

### Using Let's Encrypt (Recommended)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal setup
sudo crontab -e
# Add this line:
0 12 * * * /usr/bin/certbot renew --quiet

# Test renewal
sudo certbot renew --dry-run
```

### Manual SSL Certificate

If using a purchased SSL certificate:

1. **Upload certificate files** to `/etc/ssl/certs/`
2. **Upload private key** to `/etc/ssl/private/`
3. **Update Nginx configuration** with correct paths
4. **Test configuration** and reload Nginx

## Monitoring and Logging

### Application Monitoring

#### Health Check Endpoint

Add to your Next.js app (`src/app/api/health/route.ts`):

```typescript
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Check database connectivity
    // Add any other health checks here
    
    return NextResponse.json({ 
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    })
  } catch (error) {
    return NextResponse.json(
      { status: 'unhealthy', error: error.message },
      { status: 500 }
    )
  }
}
```

#### System Monitoring Script

Create `scripts/monitor.sh`:

```bash
#!/bin/bash

# Check if services are running
check_service() {
    if docker-compose -f docker-compose.prod.yml ps | grep -q "Up"; then
        echo "✅ Services are running"
    else
        echo "❌ Services are down"
        # Send alert (email, Slack, etc.)
        return 1
    fi
}

# Check application health
check_health() {
    if curl -f -s http://localhost:3000/api/health > /dev/null; then
        echo "✅ Application is healthy"
    else
        echo "❌ Application health check failed"
        # Send alert
        return 1
    fi
}

# Check disk space
check_disk() {
    usage=$(df / | awk 'NR==2 {print $5}' | sed 's/%//')
    if [ $usage -gt 80 ]; then
        echo "⚠️ Disk usage is high: ${usage}%"
        # Send alert
    else
        echo "✅ Disk usage is normal: ${usage}%"
    fi
}

# Run checks
check_service
check_health
check_disk
```

### Logging Configuration

#### Application Logs

Docker Compose already includes log rotation. View logs:

```bash
# View app logs
docker-compose -f docker-compose.prod.yml logs app

# View MongoDB logs
docker-compose -f docker-compose.prod.yml logs mongo

# Follow logs in real-time
docker-compose -f docker-compose.prod.yml logs -f app
```

#### Nginx Logs

```bash
# Access logs
sudo tail -f /var/log/nginx/santo-ambrosius.access.log

# Error logs
sudo tail -f /var/log/nginx/santo-ambrosius.error.log

# Log rotation is handled by logrotate automatically
```

#### Log Monitoring

Use tools like:
- **ELK Stack** (Elasticsearch, Logstash, Kibana)
- **Grafana + Loki**
- **Papertrail** (cloud-based)
- **Simple monitoring scripts**

## Backup Strategies

### Database Backup

#### Automated MongoDB Backup Script

Create `scripts/backup-db.sh`:

```bash
#!/bin/bash

BACKUP_DIR="/backup/mongodb"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="santo-ambrosius-${DATE}"

# Create backup directory
mkdir -p ${BACKUP_DIR}

# Create MongoDB dump
docker exec santo-ambrosius-mongo mongodump \
    --db santo-ambrosius-prod \
    --out /backup/

# Compress backup
docker exec santo-ambrosius-mongo tar czf \
    /backup/${BACKUP_NAME}.tar.gz \
    -C /backup santo-ambrosius-prod

# Copy to host
docker cp santo-ambrosius-mongo:/backup/${BACKUP_NAME}.tar.gz ${BACKUP_DIR}/

# Keep only last 7 days of backups
find ${BACKUP_DIR} -name "*.tar.gz" -mtime +7 -delete

echo "Backup completed: ${BACKUP_NAME}.tar.gz"
```

#### Backup Schedule

```bash
# Add to crontab
sudo crontab -e

# Daily backup at 2 AM
0 2 * * * /path/to/scripts/backup-db.sh

# Weekly full backup
0 1 * * 0 /path/to/scripts/backup-full.sh
```

### Application Files Backup

```bash
#!/bin/bash
# scripts/backup-files.sh

BACKUP_DIR="/backup/files"
DATE=$(date +%Y%m%d_%H%M%S)

# Backup uploads
tar czf ${BACKUP_DIR}/uploads-${DATE}.tar.gz /var/lib/docker/volumes/santo-ambrosius_uploads/

# Backup configuration
tar czf ${BACKUP_DIR}/config-${DATE}.tar.gz \
    /path/to/project/.env.production \
    /etc/nginx/sites-available/santo-ambrosius \
    /path/to/project/docker-compose.prod.yml

# Clean old backups
find ${BACKUP_DIR} -name "*.tar.gz" -mtime +30 -delete
```

### Offsite Backup

Consider using:
- **AWS S3** or **Google Cloud Storage**
- **rsync** to remote server
- **Dedicated backup services** (Backblaze, etc.)

Example S3 backup:
```bash
# Install AWS CLI
sudo apt install awscli

# Configure AWS credentials
aws configure

# Sync backups to S3
aws s3 sync /backup/ s3://your-backup-bucket/santo-ambrosius/
```

## Troubleshooting

### Common Issues

#### 1. Container Won't Start

```bash
# Check logs
docker-compose -f docker-compose.prod.yml logs app

# Check container status
docker-compose -f docker-compose.prod.yml ps

# Rebuild if needed
docker-compose -f docker-compose.prod.yml build --no-cache app
```

#### 2. Database Connection Issues

```bash
# Check MongoDB container
docker-compose -f docker-compose.prod.yml logs mongo

# Test connection from app container
docker-compose -f docker-compose.prod.yml exec app mongosh mongodb://mongo:27017/santo-ambrosius-prod
```

#### 3. Nginx Configuration Issues

```bash
# Test Nginx config
sudo nginx -t

# Check Nginx logs
sudo tail -f /var/log/nginx/error.log

# Reload Nginx
sudo systemctl reload nginx
```

#### 4. SSL Certificate Issues

```bash
# Check certificate status
sudo certbot certificates

# Renew certificate manually
sudo certbot renew

# Check certificate expiry
openssl x509 -in /etc/letsencrypt/live/your-domain.com/cert.pem -text -noout | grep "Not After"
```

### Performance Issues

#### 1. High Memory Usage

```bash
# Check container memory usage
docker stats

# Increase memory limits in docker-compose.prod.yml
deploy:
  resources:
    limits:
      memory: 2G
```

#### 2. Slow Database Queries

```bash
# Enable MongoDB profiling
docker exec santo-ambrosius-mongo mongosh
use santo-ambrosius-prod
db.setProfilingLevel(2)
db.system.profile.find().limit(5).sort({ts:-1}).pretty()
```

#### 3. High CPU Usage

- Check for memory leaks in application logs
- Review Nginx worker processes configuration
- Consider implementing caching strategies

### Recovery Procedures

#### 1. Complete System Recovery

```bash
# Stop services
docker-compose -f docker-compose.prod.yml down

# Restore database
docker run --rm -v mongo_data:/data/db -v /backup:/backup mongo:7.0 \
    bash -c "cd /data/db && tar xzf /backup/latest-backup.tar.gz --strip 1"

# Restart services
docker-compose -f docker-compose.prod.yml up -d
```

#### 2. Application-Only Recovery

```bash
# Pull latest code
git pull origin main

# Rebuild and restart app
docker-compose -f docker-compose.prod.yml up -d --build app
```

### Emergency Contacts

Maintain a list of emergency contacts and procedures:
- **Technical lead contact information**
- **Hosting provider support**
- **Domain registrar support**
- **Emergency rollback procedures**

---

## Additional Resources

- **[Storage Guide](./storage.md)**: Alternative storage solutions
- **[Admin Guide](./admin-guide.md)**: Content management procedures
- **[Development Guide](./development.md)**: Local development setup

For technical support or deployment assistance, contact the technical team.

---

*Last updated: [Date] | Version: 1.0*
