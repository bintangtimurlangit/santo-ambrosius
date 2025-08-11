# Gereja Santo Ambrosius - Official Website

![Santo Ambrosius Logo](./public/logo.png)

A modern church website built with Next.js 15, Payload CMS 3.0, and MongoDB, featuring content management for news articles, spiritual reflections, and parish information.

## 🏛️ About

The official website for Gereja Santo Ambrosius (Saint Ambrose Church) - "Paguyuban umat beriman yang peduli, berbagi dan merakyat" (A congregation of faithful believers who care, share, and serve the people).

### Features

- **📰 News & Articles**: Manage parish news categorized by Sapta Bidang (Seven Ministries)
- **🙏 Spiritual Reflections**: Daily reflections and spiritual content
- **📅 Event Scheduling**: Parish event calendar and announcements
- **👥 Ministry Information**: Organizational structure and ministry details
- **📱 Responsive Design**: Mobile-first, accessible design
- **🎬 Rich Media**: Support for images, videos, and rich text content
- **🔍 SEO Optimized**: Built-in SEO tools and meta management
- **⚡ Performance**: Optimized for speed and Core Web Vitals

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 with React 19
- **CMS**: Payload CMS 3.0 with Lexical Rich Text Editor
- **Database**: MongoDB with Mongoose
- **Styling**: Tailwind CSS 4.0
- **Media Storage**: Payload Cloud (with support for self-hosted alternatives)
- **Monitoring**: Sentry integration
- **Testing**: Playwright (E2E) + Vitest (Integration)
- **Package Manager**: pnpm

## 🚀 Quick Start

### Prerequisites

- Node.js 18.20.2+ or Node.js 20.9.0+
- pnpm 9+ or 10+
- MongoDB instance (local or cloud)

### Environment Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd santo-ambrosius
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your configuration:
   ```env
   # Required
   DATABASE_URI=mongodb://localhost:27017/santo-ambrosius
   PAYLOAD_SECRET=your-secure-secret-key
   
   # Optional but recommended
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   SENTRY_DSN=your-sentry-dsn
   ```

4. **Start development server**
   ```bash
   pnpm dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin

6. **Create your first admin user**
   Navigate to the admin panel and follow the setup wizard.

## 📋 Content Management

### Content Types

- **Berita (News)**: Parish news categorized by Sapta Bidang ministries
- **Renungan (Reflections)**: Spiritual reflections and devotional content
- **Homepage**: Hero section and announcement carousel content
- **Sejarah Paroki**: Parish history and milestone content
- **WAM/WAB**: Special ministry content for women and men's groups
- **Media**: Image and video asset management

### Sapta Bidang (Seven Ministries)

1. **Pewartaan** - Evangelization
2. **Pelayanan** - Service
3. **Persekutuan** - Fellowship
4. **Peribadatan** - Worship
5. **Pemerhati** - Social Care
6. **PITK** - Youth Ministry
7. **OKK** - Children's Ministry

## 🐳 Docker Development

For containerized development with MongoDB:

```bash
# Start with Docker Compose
docker-compose up -d

# Or build and run manually
docker build -t santo-ambrosius .
docker run -p 3000:3000 santo-ambrosius
```

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Integration tests only
pnpm test:int

# E2E tests only
pnpm test:e2e
```

## 📚 Documentation

Comprehensive documentation is available in the `/docs` folder:

- **[Administrator Guide](./docs/admin-guide.md)** - Content management and admin panel usage
- **[Deployment Guide](./docs/deployment.md)** - Production deployment with Docker, MongoDB, and Nginx
- **[Storage Guide](./docs/storage.md)** - Media storage options and migration strategies
- **[API Documentation](./docs/api.md)** - REST and GraphQL API reference
- **[Development Guide](./docs/development.md)** - Local development and contribution guidelines
- **[Troubleshooting](./docs/troubleshooting.md)** - Common issues and solutions

## 🔧 Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm devsafe          # Clean start (removes .next folder)

# Building
pnpm build            # Build for production
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run ESLint
pnpm generate:types   # Generate TypeScript types from Payload

# Payload CMS
pnpm payload          # Access Payload CLI commands
```

## 🚀 Deployment

### Production Checklist

- [ ] Configure production environment variables
- [ ] Set up MongoDB production instance
- [ ] Configure media storage (Payload Cloud or alternatives)
- [ ] Set up SSL certificates
- [ ] Configure domain and DNS
- [ ] Set up monitoring and error tracking
- [ ] Configure backup strategies

See the [Deployment Guide](./docs/deployment.md) for detailed instructions.

## 🏗️ Project Structure

```
santo-ambrosius/
├── src/
│   ├── app/                    # Next.js app router
│   │   ├── (frontend)/         # Public-facing pages
│   │   └── (payload)/          # CMS admin and API routes
│   ├── collections/            # Payload CMS collections
│   ├── components/             # React components
│   ├── lib/                    # Utility functions
│   └── styles/                 # Global styles
├── public/                     # Static assets
├── docs/                       # Documentation
├── tests/                      # Test suites
├── docker-compose.yml          # Development Docker setup
├── Dockerfile                  # Production Docker image
└── payload.config.ts           # Payload CMS configuration
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add new feature'`
5. Push to the branch: `git push origin feature/new-feature`
6. Submit a pull request

### Development Guidelines

- Follow the existing code style and patterns
- Write tests for new features
- Update documentation for any changes
- Ensure all tests pass before submitting PR
- Use conventional commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the `/docs` folder for detailed guides
- **Issues**: Report bugs or request features via GitHub Issues
- **Community**: Join our parish community discussions

## 🙏 Acknowledgments

- Built with [Payload CMS](https://payloadcms.com/) - The best TypeScript CMS
- [Next.js](https://nextjs.org/) - The React Framework for Production
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- Parish community of Gereja Santo Ambrosius for their support and feedback

---

**Gereja Santo Ambrosius** - Paguyuban umat beriman yang peduli, berbagi dan merakyat.