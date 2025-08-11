# Troubleshooting Guide - Gereja Santo Ambrosius

This guide covers common issues, solutions, and debugging procedures for the church website.

## Table of Contents

1. [Common Issues](#common-issues)
2. [Development Problems](#development-problems)
3. [Deployment Issues](#deployment-issues)
4. [Database Problems](#database-problems)
5. [Performance Issues](#performance-issues)
6. [Content Management](#content-management)
7. [Security Concerns](#security-concerns)
8. [Monitoring and Logs](#monitoring-and-logs)

## Common Issues

### Application Won't Start

#### Symptoms
- Server fails to start
- Error messages during `pnpm dev`
- Port already in use

#### Solutions

**1. Port Already in Use**
```bash
# Find process using port 3000
lsof -ti:3000

# Kill process
kill -9 $(lsof -ti:3000)

# Or use different port
PORT=3001 pnpm dev
```

**2. Environment Variables Missing**
```bash
# Check if .env file exists
ls -la .env

# Copy from example if missing
cp .env.example .env

# Verify required variables
cat .env | grep -E "(DATABASE_URI|PAYLOAD_SECRET)"
```

**3. Node Version Issues**
```bash
# Check Node version
node --version

# Should be 18.20.2+ or 20.9.0+
# Use nvm to switch versions
nvm use 18.20.2
```

**4. Dependencies Issues**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
pnpm install

# Clear Next.js cache
rm -rf .next
pnpm dev
```

### Build Failures

#### Symptoms
- `pnpm build` fails
- TypeScript compilation errors
- Missing dependencies

#### Solutions

**1. TypeScript Errors**
```bash
# Check TypeScript without building
pnpm tsc --noEmit

# Regenerate Payload types
pnpm generate:types

# Check for unused imports
npx eslint . --fix
```

**2. Memory Issues**
```bash
# Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=8000" pnpm build

# Or use the configured script
pnpm build
```

**3. Missing Environment Variables**
```bash
# Create production env file
cp .env.example .env.production

# Update with production values
nano .env.production
```

### Database Connection Issues

#### Symptoms
- "MongooseError: Operation timed out"
- "Connection refused"
- Admin panel shows database errors

#### Solutions

**1. Local MongoDB Not Running**
```bash
# Check MongoDB status (macOS with Homebrew)
brew services list | grep mongodb

# Start MongoDB
brew services start mongodb/brew/mongodb-community

# Check MongoDB logs
tail -f /usr/local/var/log/mongodb/mongo.log
```

**2. Connection String Issues**
```bash
# Test connection with mongosh
mongosh "mongodb://localhost:27017/santo-ambrosius-dev"

# Check environment variable
echo $DATABASE_URI

# Verify correct format
# mongodb://localhost:27017/database-name
# mongodb+srv://user:pass@cluster.mongodb.net/database-name
```

**3. Authentication Problems**
```javascript
// Test connection in Node.js
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URI)
  .then(() => console.log('Connected successfully'))
  .catch(err => console.error('Connection failed:', err))
```

## Development Problems

### Hot Reload Not Working

#### Symptoms
- Changes not reflected automatically
- Need to manually refresh browser
- File watcher issues

#### Solutions

**1. File System Issues (macOS)**
```bash
# Increase file watcher limit
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf

# Restart development server
pnpm devsafe
```

**2. Next.js Cache Issues**
```bash
# Clear Next.js cache
rm -rf .next

# Restart with clean cache
pnpm devsafe
```

**3. Browser Cache**
```bash
# Hard refresh (Cmd+Shift+R on macOS, Ctrl+Shift+R on Windows)
# Or disable cache in DevTools (Network tab)
```

### TypeScript Errors

#### Common Errors and Solutions

**1. "Cannot find module" Errors**
```typescript
// Bad: Relative imports
import { Button } from '../../../components/Button'

// Good: Absolute imports with path mapping
import { Button } from '@/components/Button'

// Check tsconfig.json paths configuration
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**2. "Type 'unknown' is not assignable" Errors**
```typescript
// Bad: Using any or unknown types
const data: any = await response.json()

// Good: Proper typing
interface ApiResponse {
  docs: Article[]
  totalDocs: number
}
const data: ApiResponse = await response.json()
```

**3. Payload Types Out of Sync**
```bash
# Regenerate types after collection changes
pnpm generate:types

# Check generated types file
cat src/payload-types.ts
```

### CSS and Styling Issues

#### Tailwind CSS Not Working

**1. Tailwind Not Compiling**
```bash
# Check Tailwind config
cat tailwind.config.js

# Verify content paths include all files
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
}

# Restart development server
pnpm dev
```

**2. Custom CSS Not Loading**
```css
/* Check global.css imports */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom styles should come after */
.custom-class {
  /* styles */
}
```

**3. Responsive Breakpoints**
```typescript
// Debug responsive classes
<div className="bg-red-500 md:bg-blue-500 lg:bg-green-500">
  Test responsive colors
</div>

// Check browser DevTools for applied classes
```

## Deployment Issues

### Docker Build Failures

#### Symptoms
- Docker build fails during dependencies installation
- Container exits immediately
- Build timeouts

#### Solutions

**1. Dependency Installation Failures**
```dockerfile
# Check Dockerfile for correct package manager
RUN corepack enable pnpm && pnpm i --frozen-lockfile

# Build with verbose output
docker build . --progress=plain --no-cache
```

**2. Memory Issues During Build**
```bash
# Increase Docker memory limit (Docker Desktop)
# Settings > Resources > Advanced > Memory: 8GB

# Or build on host and copy
pnpm build
docker build . -f Dockerfile.prebuilt
```

**3. Environment Variables in Container**
```bash
# Check environment variables in running container
docker exec santo-ambrosius-app env | grep -E "(NODE_ENV|DATABASE_URI)"

# Update docker-compose.yml
services:
  app:
    environment:
      - NODE_ENV=production
    env_file:
      - .env.production
```

### Nginx Configuration Issues

#### Common Nginx Problems

**1. Configuration Syntax Errors**
```bash
# Test Nginx configuration
sudo nginx -t

# Check configuration file
sudo nano /etc/nginx/sites-available/santo-ambrosius

# Reload if configuration is valid
sudo systemctl reload nginx
```

**2. SSL Certificate Issues**
```bash
# Check certificate status
sudo certbot certificates

# Test SSL configuration
openssl s_client -connect your-domain.com:443

# Renew certificate if expired
sudo certbot renew --dry-run
```

**3. Proxy Connection Issues**
```bash
# Check if application is running
curl http://localhost:3000

# Check Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Verify upstream configuration
upstream santo_ambrosius_app {
    server 127.0.0.1:3000;
}
```

### Container Orchestration Issues

**1. Service Dependencies**
```yaml
# Ensure proper service dependencies
services:
  app:
    depends_on:
      mongo:
        condition: service_healthy
  
  mongo:
    healthcheck:
      test: echo 'db.runCommand("ping").ok' | mongosh localhost:27017/test --quiet
      interval: 10s
      timeout: 10s
      retries: 5
```

**2. Volume Mounting Issues**
```bash
# Check volume permissions
docker exec santo-ambrosius-app ls -la /app/uploads

# Fix volume ownership
docker exec santo-ambrosius-app chown -R nextjs:nodejs /app/uploads
```

## Database Problems

### MongoDB Performance Issues

#### Symptoms
- Slow query responses
- High CPU usage
- Connection timeouts

#### Solutions

**1. Database Indexing**
```javascript
// Create indexes for frequently queried fields
db.berita.createIndex({ "status": 1, "publishedDate": -1 })
db.berita.createIndex({ "slug": 1 }, { unique: true })
db.berita.createIndex({ "saptaBidang": 1 })

// Check existing indexes
db.berita.getIndexes()
```

**2. Query Optimization**
```javascript
// Enable profiling to identify slow queries
db.setProfilingLevel(2, { slowms: 100 })

// View slow queries
db.system.profile.find().limit(5).sort({ ts: -1 }).pretty()

// Optimize queries by adding proper filters
// Bad: Find all documents then filter in application
db.berita.find({})

// Good: Filter at database level
db.berita.find({ status: "published", publishedDate: { $gte: new Date("2024-01-01") } })
```

**3. Connection Pool Optimization**
```typescript
// payload.config.ts
export default buildConfig({
  db: mongooseAdapter({
    url: process.env.DATABASE_URI!,
    connectOptions: {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    },
  }),
})
```

### Data Consistency Issues

**1. Duplicate Content**
```javascript
// Find and remove duplicate articles by slug
db.berita.aggregate([
  { $group: { _id: "$slug", count: { $sum: 1 }, docs: { $push: "$_id" } } },
  { $match: { count: { $gt: 1 } } }
])

// Remove duplicates (keep first one)
db.berita.deleteMany({ 
  _id: { $in: duplicate_ids_except_first }
})
```

**2. Missing References**
```javascript
// Find articles with missing featured images
db.berita.find({ 
  featuredImage: { $exists: true },
  "featuredImage": { $nin: valid_media_ids }
})

// Clean up orphaned media files
db.media.find({
  _id: { $nin: referenced_media_ids }
})
```

## Performance Issues

### Slow Page Load Times

#### Diagnostic Steps

**1. Identify Bottlenecks**
```bash
# Use Chrome DevTools Performance tab
# Check Network tab for slow resources
# Analyze Core Web Vitals

# Server-side performance
time curl -s -o /dev/null -w "%{time_total}" https://your-domain.com
```

**2. Database Query Performance**
```typescript
// Add query timing to API routes
console.time('article-query')
const articles = await payload.find({
  collection: 'berita',
  where: { status: { equals: 'published' } },
  limit: 10,
})
console.timeEnd('article-query')
```

**3. Bundle Size Analysis**
```bash
# Analyze bundle size
pnpm build
npx @next/bundle-analyzer

# Check for large dependencies
npx bundlephobia [package-name]
```

#### Performance Optimizations

**1. Image Optimization**
```typescript
// Use Next.js Image component with proper sizing
import Image from 'next/image'

<Image
  src={article.featuredImage.url}
  alt={article.featuredImage.alt}
  width={800}
  height={600}
  priority={index < 3} // Prioritize above-fold images
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/..."
/>
```

**2. API Response Caching**
```typescript
// src/app/api/berita/route.ts
export async function GET(request: NextRequest) {
  const articles = await payload.find({
    collection: 'berita',
    where: { status: { equals: 'published' } },
    limit: 10,
  })

  return NextResponse.json(articles, {
    headers: {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    },
  })
}
```

**3. Database Query Optimization**
```typescript
// Only fetch required fields
const articles = await payload.find({
  collection: 'berita',
  select: {
    title: true,
    description: true,
    slug: true,
    publishedDate: true,
    featuredImage: true,
  },
  where: { status: { equals: 'published' } },
})
```

### Memory Issues

#### Symptoms
- Application crashes with "out of memory" errors
- High memory usage in monitoring
- Slow garbage collection

#### Solutions

**1. Node.js Memory Settings**
```bash
# Increase memory limit
NODE_OPTIONS="--max-old-space-size=2048" pnpm start

# Monitor memory usage
node --expose-gc --inspect your-app.js
```

**2. Memory Leak Detection**
```typescript
// Monitor memory usage
setInterval(() => {
  const used = process.memoryUsage()
  console.log('Memory usage:', {
    rss: `${Math.round(used.rss / 1024 / 1024 * 100) / 100} MB`,
    heapTotal: `${Math.round(used.heapTotal / 1024 / 1024 * 100) / 100} MB`,
    heapUsed: `${Math.round(used.heapUsed / 1024 / 1024 * 100) / 100} MB`,
  })
}, 60000)
```

**3. Optimize Large Data Processing**
```typescript
// Use streaming for large datasets
async function processArticles() {
  const cursor = db.collection('berita').find({}).stream()
  
  cursor.on('data', (doc) => {
    // Process one document at a time
    processDocument(doc)
  })
  
  cursor.on('end', () => {
    console.log('Processing complete')
  })
}
```

## Content Management

### Admin Panel Issues

#### Login Problems

**1. Can't Access Admin Panel**
```bash
# Check if admin route is properly configured
curl http://localhost:3000/admin

# Verify admin user exists
mongosh mongodb://localhost:27017/santo-ambrosius-dev
db.users.findOne({ email: "admin@example.com" })
```

**2. Password Reset**
```javascript
// Reset admin password in MongoDB
use santo-ambrosius-dev
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { 
    password: "$2b$10$hash_generated_password_here",
    salt: "salt_value"
  }}
)

// Or create new admin user through Payload CLI
npx payload generate:user
```

#### Content Upload Issues

**1. File Upload Failures**
```bash
# Check upload directory permissions
ls -la uploads/
chmod 755 uploads/

# Verify file size limits
# In nginx.conf:
client_max_body_size 100M;

# In Next.js:
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '100mb',
    },
  },
}
```

**2. Rich Text Editor Problems**
```javascript
// Check browser console for Lexical editor errors
// Verify editor configuration in payload.config.ts
editor: lexicalEditor({
  features: ({ defaultFeatures }) => [
    ...defaultFeatures,
    // Custom features
  ],
})
```

### Content Synchronization

**1. Environment Sync Issues**
```bash
# Export content from one environment
npx payload backup --collection berita --output backup.json

# Import to another environment
npx payload restore --collection berita --input backup.json
```

**2. Media File Sync**
```bash
# Sync media between environments
rsync -av --progress ./uploads/ user@server:/path/to/uploads/

# Update media URLs in database
db.media.updateMany(
  {},
  { $set: { url: { $regex: "s/old-domain/new-domain/g" } } }
)
```

## Security Concerns

### Authentication Issues

**1. JWT Token Problems**
```bash
# Check JWT secret configuration
echo $PAYLOAD_SECRET | wc -c  # Should be at least 32 characters

# Verify token in browser DevTools
# Application > Storage > Cookies/LocalStorage
```

**2. Session Management**
```typescript
// Check session configuration
// payload.config.ts
export default buildConfig({
  admin: {
    user: Users.slug,
    // Session settings
  },
  // Cookie settings for security
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  },
})
```

### API Security

**1. Rate Limiting Issues**
```nginx
# Check Nginx rate limiting
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;

location /api/ {
    limit_req zone=api burst=20 nodelay;
    # proxy settings
}
```

**2. CORS Configuration**
```typescript
// Check CORS settings in API routes
export async function GET(request: NextRequest) {
  const response = NextResponse.json(data)
  
  response.headers.set('Access-Control-Allow-Origin', 'https://your-domain.com')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  
  return response
}
```

## Monitoring and Logs

### Log Analysis

**1. Application Logs**
```bash
# Docker container logs
docker-compose logs -f app

# Specific error patterns
docker-compose logs app | grep -i error

# Filter by timestamp
docker-compose logs --since="2024-01-01T00:00:00" app
```

**2. Database Logs**
```bash
# MongoDB logs
tail -f /var/log/mongodb/mongod.log

# Query profiler logs
mongosh
db.system.profile.find().sort({ts:-1}).limit(10).pretty()
```

**3. Nginx Logs**
```bash
# Access logs
tail -f /var/log/nginx/access.log

# Error logs
tail -f /var/log/nginx/error.log

# Filter 4xx/5xx errors
grep " [45][0-9][0-9] " /var/log/nginx/access.log
```

### Health Monitoring

**1. Application Health Checks**
```bash
# Create health monitoring script
#!/bin/bash
# scripts/health-check.sh

check_app() {
    if curl -f -s http://localhost:3000/api/health > /dev/null; then
        echo "✅ Application healthy"
        return 0
    else
        echo "❌ Application unhealthy"
        return 1
    fi
}

check_database() {
    if mongosh --eval "db.adminCommand('ping')" > /dev/null; then
        echo "✅ Database healthy"
        return 0
    else
        echo "❌ Database unhealthy"
        return 1
    fi
}

check_app && check_database
```

**2. Automated Monitoring**
```bash
# Add to crontab for regular checks
*/5 * * * * /path/to/scripts/health-check.sh >> /var/log/health-check.log 2>&1
```

### Error Tracking

**1. Sentry Integration**
```typescript
// Check Sentry configuration
// sentry.server.config.ts
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  debug: false,
})

// Test Sentry
Sentry.captureException(new Error('Test error'))
```

**2. Custom Error Logging**
```typescript
// lib/logger.ts
export const logger = {
  error: (message: string, error?: Error) => {
    console.error(`[ERROR] ${message}`, error)
    // Send to external service
  },
  warn: (message: string) => {
    console.warn(`[WARN] ${message}`)
  },
  info: (message: string) => {
    console.info(`[INFO] ${message}`)
  },
}
```

---

## Emergency Procedures

### Critical System Recovery

**1. Complete System Failure**
```bash
# Stop all services
docker-compose -f docker-compose.prod.yml down

# Check disk space
df -h

# Restore from backup
./scripts/restore-backup.sh latest

# Restart services
docker-compose -f docker-compose.prod.yml up -d
```

**2. Database Corruption**
```bash
# Stop application
docker-compose stop app

# Create emergency backup
mongodump --db santo-ambrosius-prod --out /emergency-backup/

# Repair database
mongod --repair --dbpath /data/db

# Restart services
docker-compose start
```

**3. Security Breach Response**
```bash
# Immediately change all passwords
# Rotate API keys and secrets
# Check access logs for suspicious activity
# Update all dependencies
# Deploy security patches
```

### Escalation Procedures

1. **Check this troubleshooting guide**
2. **Search existing GitHub issues**
3. **Contact technical team lead**
4. **Create detailed issue report** with:
   - Error messages
   - Steps to reproduce
   - Environment information
   - Screenshots/logs

---

For urgent issues or emergencies, contact the technical support team immediately.

---

*Last updated: [Date] | Version: 1.0*
