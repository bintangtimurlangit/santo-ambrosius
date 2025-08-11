# API Documentation - Gereja Santo Ambrosius

This document covers the REST and GraphQL APIs provided by the Payload CMS backend for the church website.

## Table of Contents

1. [Overview](#overview)
2. [Authentication](#authentication)
3. [REST API](#rest-api)
4. [GraphQL API](#graphql-api)
5. [Custom Endpoints](#custom-endpoints)
6. [Rate Limiting](#rate-limiting)
7. [Error Handling](#error-handling)
8. [Examples](#examples)

## Overview

The website provides both REST and GraphQL APIs powered by Payload CMS, allowing external applications to interact with the content management system.

### Base URLs

- **Development**: `http://localhost:3000/api`
- **Production**: `https://your-domain.com/api`

### Content Types Available

- **Berita** (News articles)
- **Renungan** (Spiritual reflections)
- **Homepage** (Homepage content)
- **SejarahParoki** (Parish history)
- **WAM/WAB** (Ministry-specific content)
- **Media** (Images and videos)
- **Users** (Admin users - restricted access)

## Authentication

### Public Access

Most content is publicly readable without authentication:
- Published articles (Berita, Renungan)
- Homepage content
- Parish history
- Media files

### Admin Access

Administrative operations require authentication:
- Creating/editing content
- User management
- Accessing draft content

### API Key Authentication

For server-to-server communication:

```bash
curl -H "Authorization: Bearer YOUR_API_TOKEN" \
     https://your-domain.com/api/berita
```

### Session-based Authentication

For web applications:

```javascript
// Login
const response = await fetch('/api/users/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'admin@example.com',
    password: 'password',
  }),
})

const { token } = await response.json()

// Use token for subsequent requests
const articles = await fetch('/api/berita', {
  headers: {
    'Authorization': `Bearer ${token}`,
  },
})
```

## REST API

### Collections Endpoints

#### Berita (News Articles)

**Get all published articles:**
```
GET /api/berita?where[status][equals]=published
```

**Get articles by ministry (Sapta Bidang):**
```
GET /api/berita?where[saptaBidang][equals]=pewartaan
```

**Get single article:**
```
GET /api/berita/{id}
```

**Get article by slug:**
```
GET /api/berita?where[slug][equals]=article-slug
```

**Create new article (requires auth):**
```
POST /api/berita
Content-Type: application/json
Authorization: Bearer {token}

{
  "title": "New Article Title",
  "description": "Article description",
  "saptaBidang": "pewartaan",
  "content": {
    "root": {
      "children": [
        {
          "children": [
            {
              "detail": 0,
              "format": 0,
              "mode": "normal",
              "style": "",
              "text": "Article content here",
              "type": "text",
              "version": 1
            }
          ],
          "direction": "ltr",
          "format": "",
          "indent": 0,
          "type": "paragraph",
          "version": 1
        }
      ],
      "direction": "ltr",
      "format": "",
      "indent": 0,
      "type": "root",
      "version": 1
    }
  },
  "author": "Author Name",
  "status": "draft"
}
```

#### Renungan (Spiritual Reflections)

Similar endpoints to Berita but without `saptaBidang` field:

```
GET /api/renungan?where[status][equals]=published
GET /api/renungan/{id}
POST /api/renungan (requires auth)
PUT /api/renungan/{id} (requires auth)
DELETE /api/renungan/{id} (requires auth)
```

#### Homepage Content

```
GET /api/homepage
PUT /api/homepage/{id} (requires auth)
```

#### Media Files

```
GET /api/media
GET /api/media/{id}
POST /api/media (requires auth, multipart/form-data)
DELETE /api/media/{id} (requires auth)
```

### Query Parameters

#### Filtering

```
# Status filter
?where[status][equals]=published

# Date range
?where[publishedDate][greater_than]=2024-01-01
?where[publishedDate][less_than]=2024-12-31

# Text search
?where[title][contains]=Christmas

# Ministry filter
?where[saptaBidang][equals]=pewartaan
```

#### Sorting

```
# Sort by published date (newest first)
?sort=-publishedDate

# Sort by title
?sort=title

# Multiple sort fields
?sort=-publishedDate,title
```

#### Pagination

```
# Limit results
?limit=10

# Pagination
?page=2&limit=10

# Skip records
?offset=20
```

#### Population (Include related data)

```
# Include featured image data
?populate=featuredImage

# Include multiple relations
?populate=featuredImage,author
```

### Response Format

All API responses follow this structure:

```json
{
  "docs": [...], // Array of documents
  "totalDocs": 25,
  "limit": 10,
  "totalPages": 3,
  "page": 1,
  "pagingCounter": 1,
  "hasPrevPage": false,
  "hasNextPage": true,
  "prevPage": null,
  "nextPage": 2
}
```

Single document responses:

```json
{
  "id": "507f1f77bcf86cd799439011",
  "title": "Article Title",
  "description": "Article description",
  "slug": "article-title",
  "status": "published",
  "publishedDate": "2024-01-15T10:30:00.000Z",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

## GraphQL API

### Endpoint

```
POST /api/graphql
```

### Schema Exploration

Visit the GraphQL Playground in development:
```
http://localhost:3000/api/graphql-playground
```

### Example Queries

#### Get Published Articles

```graphql
query GetPublishedArticles {
  Berita(where: { status: { equals: published } }, limit: 10, sort: "-publishedDate") {
    docs {
      id
      title
      description
      slug
      saptaBidang
      author
      publishedDate
      featuredImage {
        url
        alt
        width
        height
      }
    }
    totalDocs
    hasNextPage
  }
}
```

#### Get Article by Slug

```graphql
query GetArticleBySlug($slug: String!) {
  Berita(where: { slug: { equals: $slug } }) {
    docs {
      id
      title
      description
      content
      author
      publishedDate
      readingTime
      featuredImage {
        url
        alt
        width
        height
      }
    }
  }
}
```

#### Get Homepage Content

```graphql
query GetHomepage {
  Homepage {
    docs {
      heroSection {
        title
        video {
          url
          alt
        }
      }
      pengumumanSection {
        title
        subtitle
        images {
          title
          image {
            url
            alt
          }
          link
        }
      }
    }
  }
}
```

#### Search Articles

```graphql
query SearchArticles($searchTerm: String!) {
  Berita(
    where: {
      or: [
        { title: { contains: $searchTerm } }
        { description: { contains: $searchTerm } }
      ]
      status: { equals: published }
    }
  ) {
    docs {
      id
      title
      description
      slug
      saptaBidang
    }
  }
}
```

### Mutations (Require Authentication)

#### Create Article

```graphql
mutation CreateArticle($data: BeritaInput!) {
  createBerita(data: $data) {
    id
    title
    slug
    status
  }
}
```

#### Update Article

```graphql
mutation UpdateArticle($id: String!, $data: BeritaUpdateInput!) {
  updateBerita(id: $id, data: $data) {
    id
    title
    status
    updatedAt
  }
}
```

## Custom Endpoints

### Health Check

```
GET /api/health
```

Response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 86400
}
```

### Search Endpoint

```
GET /api/search?q=christmas&type=berita
```

Response:
```json
{
  "results": [
    {
      "id": "...",
      "title": "Christmas Celebration 2024",
      "type": "berita",
      "excerpt": "Join us for our Christmas celebration...",
      "url": "/artikel/christmas-celebration-2024"
    }
  ],
  "total": 5
}
```

### Article Statistics

```
GET /api/stats/articles
```

Response:
```json
{
  "totalArticles": 150,
  "publishedArticles": 145,
  "draftArticles": 5,
  "byMinistry": {
    "pewartaan": 25,
    "pelayanan": 30,
    "persekutuan": 20,
    "peribadatan": 35,
    "pemerhati": 15,
    "pitk": 10,
    "okk": 10
  },
  "lastMonth": 12
}
```

### RSS Feed

```
GET /api/feed/rss
Content-Type: application/rss+xml
```

### Sitemap

```
GET /api/sitemap.xml
Content-Type: application/xml
```

## Rate Limiting

API endpoints are rate-limited to prevent abuse:

- **Public endpoints**: 100 requests per minute per IP
- **Search endpoints**: 30 requests per minute per IP
- **Authenticated endpoints**: 300 requests per minute per user

Rate limit headers are included in responses:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642266600
```

When rate limit is exceeded:

```json
{
  "error": "Rate limit exceeded",
  "message": "Too many requests, please try again later",
  "retryAfter": 60
}
```

## Error Handling

### HTTP Status Codes

- **200**: Success
- **201**: Created
- **400**: Bad Request
- **401**: Unauthorized
- **403**: Forbidden
- **404**: Not Found
- **429**: Too Many Requests
- **500**: Internal Server Error

### Error Response Format

```json
{
  "error": "Validation Error",
  "message": "Title is required",
  "details": [
    {
      "field": "title",
      "message": "Title is required"
    }
  ]
}
```

### Common Errors

#### Validation Errors

```json
{
  "error": "Validation Error",
  "message": "The following fields are invalid: title, author",
  "details": [
    {
      "field": "title",
      "message": "Title must be at least 3 characters long"
    },
    {
      "field": "author",
      "message": "Author is required"
    }
  ]
}
```

#### Authentication Errors

```json
{
  "error": "Unauthorized",
  "message": "Valid token required"
}
```

#### Not Found Errors

```json
{
  "error": "Not Found",
  "message": "Article with slug 'non-existent' not found"
}
```

## Examples

### Frontend Integration

#### React Hook for Articles

```typescript
// hooks/useArticles.ts
import { useState, useEffect } from 'react'

interface Article {
  id: string
  title: string
  description: string
  slug: string
  saptaBidang: string
  author: string
  publishedDate: string
  featuredImage: {
    url: string
    alt: string
  }
}

export function useArticles(ministry?: string) {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchArticles() {
      try {
        const params = new URLSearchParams({
          'where[status][equals]': 'published',
          sort: '-publishedDate',
          populate: 'featuredImage',
        })

        if (ministry) {
          params.set('where[saptaBidang][equals]', ministry)
        }

        const response = await fetch(`/api/berita?${params}`)
        if (!response.ok) throw new Error('Failed to fetch articles')

        const data = await response.json()
        setArticles(data.docs)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [ministry])

  return { articles, loading, error }
}
```

#### Next.js API Route

```typescript
// src/app/api/articles/route.ts
import { NextRequest, NextResponse } from 'next/server'
import payload from 'payload'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const ministry = searchParams.get('ministry')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')

  try {
    const where: any = {
      status: { equals: 'published' }
    }

    if (ministry) {
      where.saptaBidang = { equals: ministry }
    }

    const articles = await payload.find({
      collection: 'berita',
      where,
      sort: '-publishedDate',
      limit,
      page,
      populate: {
        featuredImage: true,
      },
    })

    return NextResponse.json(articles)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    )
  }
}
```

### Mobile App Integration

#### Swift (iOS) Example

```swift
struct Article: Codable {
    let id: String
    let title: String
    let description: String
    let slug: String
    let author: String
    let publishedDate: String
}

struct ArticleResponse: Codable {
    let docs: [Article]
    let totalDocs: Int
    let hasNextPage: Bool
}

class ArticleService {
    private let baseURL = "https://your-domain.com/api"
    
    func fetchArticles(ministry: String? = nil) async throws -> [Article] {
        var components = URLComponents(string: "\(baseURL)/berita")!
        
        var queryItems = [
            URLQueryItem(name: "where[status][equals]", value: "published"),
            URLQueryItem(name: "sort", value: "-publishedDate")
        ]
        
        if let ministry = ministry {
            queryItems.append(URLQueryItem(name: "where[saptaBidang][equals]", value: ministry))
        }
        
        components.queryItems = queryItems
        
        let (data, _) = try await URLSession.shared.data(from: components.url!)
        let response = try JSONDecoder().decode(ArticleResponse.self, from: data)
        
        return response.docs
    }
}
```

### WordPress Integration

```php
<?php
// wp-content/themes/your-theme/functions.php

function fetch_church_articles($ministry = null) {
    $api_url = 'https://your-domain.com/api/berita';
    $params = array(
        'where[status][equals]' => 'published',
        'sort' => '-publishedDate',
        'limit' => 10
    );
    
    if ($ministry) {
        $params['where[saptaBidang][equals]'] = $ministry;
    }
    
    $url = $api_url . '?' . http_build_query($params);
    
    $response = wp_remote_get($url);
    
    if (is_wp_error($response)) {
        return false;
    }
    
    $body = wp_remote_retrieve_body($response);
    $data = json_decode($body, true);
    
    return $data['docs'] ?? [];
}

// Shortcode to display articles
function church_articles_shortcode($atts) {
    $atts = shortcode_atts(array(
        'ministry' => null,
        'limit' => 5
    ), $atts);
    
    $articles = fetch_church_articles($atts['ministry']);
    
    if (!$articles) {
        return '<p>No articles found.</p>';
    }
    
    $output = '<div class="church-articles">';
    foreach ($articles as $article) {
        $output .= sprintf(
            '<article><h3>%s</h3><p>%s</p><small>By %s on %s</small></article>',
            esc_html($article['title']),
            esc_html($article['description']),
            esc_html($article['author']),
            date('F j, Y', strtotime($article['publishedDate']))
        );
    }
    $output .= '</div>';
    
    return $output;
}
add_shortcode('church_articles', 'church_articles_shortcode');
?>
```

## API Testing

### Postman Collection

Import this collection for testing:

```json
{
  "info": {
    "name": "Santo Ambrosius API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "variable": [
    {
      "key": "baseUrl",
      "value": "https://your-domain.com/api"
    }
  ],
  "item": [
    {
      "name": "Get Published Articles",
      "request": {
        "method": "GET",
        "url": "{{baseUrl}}/berita?where[status][equals]=published"
      }
    },
    {
      "name": "Get Article by Slug",
      "request": {
        "method": "GET",
        "url": "{{baseUrl}}/berita?where[slug][equals]=article-slug"
      }
    }
  ]
}
```

### cURL Examples

```bash
# Get all published articles
curl "https://your-domain.com/api/berita?where[status][equals]=published&sort=-publishedDate"

# Search articles
curl "https://your-domain.com/api/berita?where[title][contains]=Christmas"

# Get homepage content
curl "https://your-domain.com/api/homepage"
```

For more information or API support, contact the development team.

---

*Last updated: [Date] | Version: 1.0*
