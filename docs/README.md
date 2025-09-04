# Documentation Index - Gereja Santo Ambrosius

Welcome to the comprehensive documentation for the Gereja Santo Ambrosius church website project. This documentation covers everything from basic usage to advanced deployment and development.

## 📋 Quick Start

New to the project? Start here:
1. **[Project README](../README.md)** - Project overview and quick setup
2. **[Development Guide](./development.md)** - Local development setup
3. **[Administrator Guide](./admin-guide.md)** - Content management basics

## 📚 Documentation Structure

### For Administrators
- **[Administrator Guide](./admin-guide.md)** 📝
  - Content management and admin panel usage
  - Article creation and publishing workflows
  - Media management and best practices
  - User management and permissions

### For Developers
- **[Development Guide](./development.md)** 👨‍💻
  - Local development environment setup
  - Coding standards and conventions
  - Testing procedures and guidelines
  - Contributing to the project

- **[API Documentation](./api.md)** 🔌
  - REST and GraphQL API reference
  - Authentication and authorization
  - Custom endpoints and integrations
  - Frontend integration examples

### For System Administrators
- **[Deployment Guide](./deployment.md)** 🚀
  - Production deployment strategies
  - Docker, MongoDB, and Nginx configuration
  - SSL/TLS setup and security
  - Monitoring and backup procedures

- **[Storage Guide](./storage.md)** 💾
  - Alternative storage solutions (MinIO, Cloudflare R2)
  - Migration strategies and cost analysis
  - Performance optimization
  - Implementation guidelines

- **[Troubleshooting Guide](./troubleshooting.md)** 🔧
  - Common issues and solutions
  - Debugging procedures
  - Performance optimization
  - Emergency recovery procedures

## 🎯 Choose Your Path

### I want to...

#### Manage Content
- **Add/edit articles** → [Admin Guide - Managing Articles](./admin-guide.md#managing-articles)
- **Upload images/videos** → [Admin Guide - Managing Media](./admin-guide.md#managing-media)
- **Update homepage** → [Admin Guide - Homepage Management](./admin-guide.md#homepage-management)
- **Fix content issues** → [Troubleshooting - Content Management](./troubleshooting.md#content-management)

#### Develop Features
- **Set up locally** → [Development Guide - Getting Started](./development.md#getting-started)
- **Add new pages** → [Development Guide - Creating New Pages](./development.md#creating-new-pages)
- **Work with API** → [API Documentation](./api.md)
- **Debug issues** → [Troubleshooting - Development Problems](./troubleshooting.md#development-problems)

#### Deploy/Maintain
- **Deploy to production** → [Deployment Guide](./deployment.md)
- **Set up monitoring** → [Deployment Guide - Monitoring](./deployment.md#monitoring-and-logging)
- **Configure storage** → [Storage Guide](./storage.md)
- **Handle emergencies** → [Troubleshooting - Emergency Procedures](./troubleshooting.md#emergency-procedures)

#### Integrate with Other Systems
- **Use REST API** → [API Documentation - REST API](./api.md#rest-api)
- **Use GraphQL** → [API Documentation - GraphQL API](./api.md#graphql-api)
- **Mobile app integration** → [API Documentation - Examples](./api.md#examples)

## 🏗️ Project Architecture

```
Gereja Santo Ambrosius Website
├── Frontend (Next.js 15)
│   ├── Public Pages (Articles, Schedule, About)
│   ├── Responsive Design (Mobile-first)
│   └── SEO Optimized
├── CMS (Payload CMS 3.0)
│   ├── Admin Panel (Content Management)
│   ├── Collections (Berita, Renungan, Media)
│   └── Rich Text Editor (Lexical)
├── Database (MongoDB)
│   ├── Content Storage
│   ├── Media References
│   └── User Management
└── Infrastructure
    ├── Docker (Containerization)
    ├── Nginx (Reverse Proxy)
    └── SSL/TLS (Security)
```

## 🔧 Quick Reference

### Common Commands

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm test             # Run all tests

# Payload CMS
pnpm generate:types   # Generate TypeScript types
pnpm payload          # Access Payload CLI

# Docker
docker-compose up -d  # Start services in background
docker-compose logs   # View logs
```

### Important URLs

- **Frontend**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
- **API**: http://localhost:3000/api
- **GraphQL**: http://localhost:3000/api/graphql

### Key Configuration Files

- `payload.config.ts` - CMS configuration
- `next.config.mjs` - Next.js settings
- `docker-compose.yml` - Local Docker setup
- `tailwind.config.js` - Styling configuration

## 📞 Support and Resources

### Getting Help

1. **Check documentation** - Start with the relevant guide above
2. **Search issues** - Look for similar problems in project issues
3. **Contact team** - Reach out to the development or admin team
4. **Create issue** - Report bugs or request features on GitHub

### External Resources

- **[Next.js Documentation](https://nextjs.org/docs)** - Framework documentation
- **[Payload CMS Docs](https://payloadcms.com/docs)** - CMS documentation
- **[Tailwind CSS](https://tailwindcss.com/docs)** - Styling framework
- **[MongoDB Manual](https://docs.mongodb.com/)** - Database documentation

### Community

- **Parish Website**: [Your domain here]
- **GitHub Repository**: [Repository URL]
- **Technical Team**: [Contact information]

## 🔄 Documentation Updates

This documentation is actively maintained. Last updated: [Date]

### Contributing to Documentation

Found an error or want to improve the docs?

1. **Edit the file** on GitHub or locally
2. **Follow markdown standards** and existing structure
3. **Test your changes** if they include code examples
4. **Submit a pull request** with clear description

### Documentation Standards

- **Clear headings** and logical structure
- **Code examples** with proper syntax highlighting
- **Step-by-step instructions** for complex procedures
- **Screenshots** for UI-related guidance (when helpful)
- **Cross-references** between related sections

---

**Welcome to the Gereja Santo Ambrosius project!** 🏛️

*Paguyuban umat beriman yang peduli, berbagi dan merakyat.*

---