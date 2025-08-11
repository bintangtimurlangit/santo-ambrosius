# Development Guide - Gereja Santo Ambrosius

This guide covers local development setup, coding standards, testing procedures, and contribution guidelines for the church website project.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Development Environment](#development-environment)
3. [Project Structure](#project-structure)
4. [Coding Standards](#coding-standards)
5. [Testing](#testing)
6. [Git Workflow](#git-workflow)
7. [Contributing](#contributing)
8. [Common Tasks](#common-tasks)

## Getting Started

### Prerequisites

- **Node.js**: 18.20.2+ or 20.9.0+
- **pnpm**: 9+ or 10+
- **Git**: Latest version
- **MongoDB**: Local instance or cloud connection
- **Code Editor**: VS Code recommended

### Initial Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-org/santo-ambrosius.git
   cd santo-ambrosius
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your local configuration:
   ```env
   DATABASE_URI=mongodb://localhost:27017/santo-ambrosius-dev
   PAYLOAD_SECRET=your-local-secret-key
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Start development server:**
   ```bash
   pnpm dev
   ```

5. **Access the application:**
   - Frontend: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin

## Development Environment

### Recommended VS Code Extensions

Create `.vscode/extensions.json`:

```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-json",
    "yzhang.markdown-all-in-one",
    "ms-playwright.playwright"
  ]
}
```

### VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "typescript.preferences.includePackageJsonAutoImports": "on",
  "typescript.suggest.autoImports": true,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ],
  "files.associations": {
    "*.css": "tailwindcss"
  }
}
```

### Environment Files

- `.env.example`: Template with all available variables
- `.env`: Local development (ignored by git)
- `.env.production`: Production environment variables

## Project Structure

```
santo-ambrosius/
├── src/                          # Source code
│   ├── app/                      # Next.js App Router
│   │   ├── (frontend)/           # Public pages
│   │   │   ├── artikel/          # Article pages
│   │   │   ├── jadwal/           # Schedule page
│   │   │   ├── sapta-bidang/     # Ministry pages
│   │   │   └── tentang-kami/     # About pages
│   │   ├── (payload)/            # CMS routes
│   │   │   ├── admin/            # Admin panel
│   │   │   └── api/              # API routes
│   │   ├── global-error.tsx      # Global error boundary
│   │   └── layout.tsx            # Root layout
│   ├── collections/              # Payload CMS collections
│   │   ├── Berita.ts             # News articles
│   │   ├── Renungan.ts           # Spiritual reflections
│   │   ├── HomePage.ts           # Homepage content
│   │   ├── Media.ts              # Media files
│   │   └── Users.ts              # Admin users
│   ├── components/               # React components
│   │   ├── ui/                   # Reusable UI components
│   │   ├── Navbar.tsx            # Navigation component
│   │   ├── Footer.tsx            # Footer component
│   │   └── ...                   # Feature components
│   ├── lib/                      # Utility functions
│   │   ├── getBeritaData.ts      # Data fetching
│   │   ├── slugify.ts            # URL slug generation
│   │   └── utils.ts              # General utilities
│   ├── styles/                   # Stylesheets
│   │   ├── global.css            # Global styles
│   │   └── payloadStyles.css     # CMS admin styles
│   ├── payload.config.ts         # CMS configuration
│   └── payload-types.ts          # Generated types
├── public/                       # Static assets
├── docs/                         # Documentation
├── tests/                        # Test files
│   ├── e2e/                      # End-to-end tests
│   └── int/                      # Integration tests
├── docker-compose.yml            # Local Docker setup
├── Dockerfile                    # Production container
├── next.config.mjs               # Next.js configuration
├── tailwind.config.js            # Tailwind CSS config
├── tsconfig.json                 # TypeScript config
└── package.json                  # Dependencies and scripts
```

### Key Directories

- **`src/app/(frontend)/`**: Public-facing pages using Next.js App Router
- **`src/app/(payload)/`**: CMS admin panel and API routes
- **`src/collections/`**: Payload CMS content type definitions
- **`src/components/`**: Reusable React components
- **`src/lib/`**: Utility functions and data fetching logic

## Coding Standards

### TypeScript

All code should be written in TypeScript with strict type checking:

```typescript
// Good: Proper typing
interface ArticleProps {
  title: string
  description: string
  publishedDate: Date
  author: string
}

function Article({ title, description, publishedDate, author }: ArticleProps) {
  return (
    <article>
      <h2>{title}</h2>
      <p>{description}</p>
      <small>By {author} on {publishedDate.toLocaleDateString()}</small>
    </article>
  )
}

// Bad: Any types
function Article(props: any) {
  return <div>{props.title}</div>
}
```

### React Components

#### Functional Components

Use functional components with hooks:

```typescript
// Good: Functional component with proper types
interface ButtonProps {
  variant?: 'primary' | 'secondary'
  onClick: () => void
  children: React.ReactNode
  disabled?: boolean
}

export function Button({ 
  variant = 'primary', 
  onClick, 
  children, 
  disabled = false 
}: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
```

#### Component Organization

```typescript
// ComponentName.tsx
import { useState, useEffect } from 'react'

// Types at the top
interface Props {
  // ...
}

// Helper functions (if small)
function helperFunction() {
  // ...
}

// Main component
export function ComponentName({ prop1, prop2 }: Props) {
  // Hooks at the top
  const [state, setState] = useState()
  
  // Event handlers
  const handleClick = () => {
    // ...
  }
  
  // Effects
  useEffect(() => {
    // ...
  }, [])
  
  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  )
}
```

### CSS and Styling

#### Tailwind CSS

Use Tailwind utility classes with semantic grouping:

```tsx
// Good: Grouped by purpose
<div className={`
  // Layout
  flex flex-col gap-4 p-6
  // Appearance
  bg-white rounded-lg shadow-md
  // Responsive
  md:flex-row md:gap-6
  // States
  hover:shadow-lg transition-shadow
`}>
  <h2 className="text-xl font-semibold text-gray-900">
    Title
  </h2>
</div>

// For complex conditional classes, use clsx or similar
import clsx from 'clsx'

<button className={clsx(
  'px-4 py-2 rounded font-medium',
  variant === 'primary' && 'bg-blue-500 text-white',
  variant === 'secondary' && 'bg-gray-200 text-gray-900',
  disabled && 'opacity-50 cursor-not-allowed'
)}>
```

#### Custom Components

For reusable components, create composable utilities:

```typescript
// lib/styles.ts
import { cva, VariantProps } from 'class-variance-authority'

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-blue-500 text-white hover:bg-blue-600',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
        outline: 'border border-gray-300 hover:bg-gray-50',
      },
      size: {
        sm: 'px-3 py-1 text-sm',
        md: 'px-4 py-2',
        lg: 'px-6 py-3 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
         VariantProps<typeof buttonVariants> {}

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return (
    <button 
      className={buttonVariants({ variant, size, className })} 
      {...props} 
    />
  )
}
```

### File Naming Conventions

- **Components**: PascalCase (`ArticleCard.tsx`)
- **Utilities**: camelCase (`getArticleData.ts`)
- **Pages**: kebab-case folder structure
- **Types**: PascalCase (`ArticleType.ts`)

### Import Organization

```typescript
// External libraries
import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import clsx from 'clsx'

// Internal utilities
import { getArticleData } from '@/lib/getArticleData'
import { formatDate } from '@/lib/utils'

// Components
import { Button } from '@/components/ui/Button'
import { ArticleCard } from '@/components/ArticleCard'

// Types
import type { Article } from '@/types'
```

## Testing

### Test Structure

```
tests/
├── e2e/                    # End-to-end tests (Playwright)
│   ├── frontend.e2e.spec.ts
│   └── admin.e2e.spec.ts
├── int/                    # Integration tests (Vitest)
│   ├── api.int.spec.ts
│   └── components.int.spec.ts
└── unit/                   # Unit tests (if needed)
    └── utils.unit.spec.ts
```

### Integration Testing

Using Vitest for component and API testing:

```typescript
// tests/int/components.int.spec.ts
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ArticleCard } from '@/components/ArticleCard'

describe('ArticleCard', () => {
  const mockArticle = {
    id: '1',
    title: 'Test Article',
    description: 'Test description',
    slug: 'test-article',
    author: 'Test Author',
    publishedDate: new Date('2024-01-01'),
    saptaBidang: 'pewartaan',
  }

  it('renders article information correctly', () => {
    render(<ArticleCard article={mockArticle} />)
    
    expect(screen.getByText('Test Article')).toBeInTheDocument()
    expect(screen.getByText('Test description')).toBeInTheDocument()
    expect(screen.getByText('Test Author')).toBeInTheDocument()
  })

  it('has correct link to article', () => {
    render(<ArticleCard article={mockArticle} />)
    
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/artikel/test-article')
  })
})
```

### E2E Testing

Using Playwright for end-to-end testing:

```typescript
// tests/e2e/frontend.e2e.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('loads homepage successfully', async ({ page }) => {
    await page.goto('/')
    
    await expect(page).toHaveTitle(/Santo Ambrosius/)
    await expect(page.locator('h1')).toContainText('Paguyuban umat beriman')
  })

  test('navigates to articles page', async ({ page }) => {
    await page.goto('/')
    
    await page.click('text=Artikel')
    await expect(page).toHaveURL('/artikel')
    await expect(page.locator('h1')).toContainText('Artikel Terkini')
  })
})

test.describe('Article Page', () => {
  test('displays article content', async ({ page }) => {
    // Assuming there's a test article
    await page.goto('/artikel/test-article')
    
    await expect(page.locator('article h1')).toBeVisible()
    await expect(page.locator('article .content')).toBeVisible()
  })
})
```

### API Testing

```typescript
// tests/int/api.int.spec.ts
import { describe, it, expect } from 'vitest'

describe('API Endpoints', () => {
  it('returns published articles', async () => {
    const response = await fetch('http://localhost:3000/api/berita?where[status][equals]=published')
    const data = await response.json()
    
    expect(response.ok).toBe(true)
    expect(data.docs).toBeInstanceOf(Array)
    expect(data.totalDocs).toBeGreaterThanOrEqual(0)
  })

  it('returns article by slug', async () => {
    const response = await fetch('http://localhost:3000/api/berita?where[slug][equals]=test-article')
    const data = await response.json()
    
    expect(response.ok).toBe(true)
    if (data.docs.length > 0) {
      expect(data.docs[0]).toHaveProperty('title')
      expect(data.docs[0]).toHaveProperty('content')
    }
  })
})
```

### Running Tests

```bash
# All tests
pnpm test

# Integration tests only
pnpm test:int

# E2E tests only
pnpm test:e2e

# Watch mode for development
pnpm test:int --watch

# Generate test coverage
pnpm test:int --coverage
```

## Git Workflow

### Branch Naming

- **Feature branches**: `feature/article-search`
- **Bug fixes**: `fix/navbar-mobile-menu`
- **Hotfixes**: `hotfix/security-patch`
- **Chores**: `chore/update-dependencies`

### Commit Messages

Follow Conventional Commits specification:

```bash
# Feature
git commit -m "feat: add search functionality to articles"

# Bug fix
git commit -m "fix: resolve mobile navigation menu overlap"

# Documentation
git commit -m "docs: update API documentation for new endpoints"

# Style changes
git commit -m "style: improve article card spacing on mobile"

# Refactoring
git commit -m "refactor: extract article fetching logic to custom hook"

# Tests
git commit -m "test: add e2e tests for admin panel login"

# Chores
git commit -m "chore: update dependencies to latest versions"
```

### Pull Request Process

1. **Create feature branch:**
   ```bash
   git checkout -b feature/new-feature
   ```

2. **Make changes and commit:**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

3. **Push to remote:**
   ```bash
   git push origin feature/new-feature
   ```

4. **Create Pull Request** with:
   - Clear title and description
   - Link to related issues
   - Screenshots for UI changes
   - Test coverage information

5. **Code Review** checklist:
   - Code follows style guidelines
   - Tests pass
   - No console errors
   - Accessible markup
   - Performance considerations

## Contributing

### Development Process

1. **Check existing issues** before starting work
2. **Create issue** for new features or bugs
3. **Fork repository** and create feature branch
4. **Write tests** for new functionality
5. **Ensure all tests pass**
6. **Update documentation** if needed
7. **Submit pull request**

### Code Review Guidelines

#### For Authors
- Keep PRs focused and small
- Write descriptive commit messages
- Include tests for new features
- Update documentation
- Self-review before submitting

#### For Reviewers
- Be constructive and helpful
- Focus on code quality and maintainability
- Check for security issues
- Verify tests cover edge cases
- Approve when satisfied

### Setting Up for Contribution

```bash
# Fork repository on GitHub
# Clone your fork
git clone https://github.com/YOUR_USERNAME/santo-ambrosius.git
cd santo-ambrosius

# Add upstream remote
git remote add upstream https://github.com/ORIGINAL_OWNER/santo-ambrosius.git

# Install dependencies
pnpm install

# Create feature branch
git checkout -b feature/your-feature

# Make changes and test
pnpm dev
pnpm test

# Commit and push
git commit -m "feat: your feature description"
git push origin feature/your-feature

# Create pull request on GitHub
```

## Common Tasks

### Adding New Content Types

1. **Create collection file:**
   ```typescript
   // src/collections/NewCollection.ts
   import type { CollectionConfig } from 'payload'
   
   export const NewCollection: CollectionConfig = {
     slug: 'new-collection',
     labels: {
       singular: 'Item',
       plural: 'Items',
     },
     fields: [
       {
         name: 'title',
         type: 'text',
         required: true,
       },
       // ... other fields
     ],
   }
   ```

2. **Add to payload config:**
   ```typescript
   // src/payload.config.ts
   import { NewCollection } from './collections/NewCollection'
   
   export default buildConfig({
     collections: [
       // ... existing collections
       NewCollection,
     ],
   })
   ```

3. **Generate types:**
   ```bash
   pnpm generate:types
   ```

### Creating New Pages

1. **Create page file:**
   ```typescript
   // src/app/(frontend)/new-page/page.tsx
   import type { Metadata } from 'next'
   
   export const metadata: Metadata = {
     title: 'New Page | Santo Ambrosius',
     description: 'Page description',
   }
   
   export default function NewPage() {
     return (
       <div>
         <h1>New Page</h1>
         {/* Page content */}
       </div>
     )
   }
   ```

2. **Add navigation link:**
   ```typescript
   // src/components/Navbar.tsx
   const navigationItems = [
     // ... existing items
     { name: 'New Page', href: '/new-page' },
   ]
   ```

### Adding New Components

1. **Create component file:**
   ```typescript
   // src/components/NewComponent.tsx
   interface NewComponentProps {
     title: string
     // ... other props
   }
   
   export function NewComponent({ title }: NewComponentProps) {
     return (
       <div>
         <h2>{title}</h2>
         {/* Component content */}
       </div>
     )
   }
   ```

2. **Write tests:**
   ```typescript
   // tests/int/NewComponent.test.tsx
   import { render, screen } from '@testing-library/react'
   import { NewComponent } from '@/components/NewComponent'
   
   test('renders component correctly', () => {
     render(<NewComponent title="Test Title" />)
     expect(screen.getByText('Test Title')).toBeInTheDocument()
   })
   ```

### Debugging Common Issues

#### TypeScript Errors

```bash
# Clear Next.js cache
rm -rf .next

# Regenerate types
pnpm generate:types

# Check TypeScript
pnpm tsc --noEmit
```

#### Build Issues

```bash
# Clear all caches
rm -rf .next node_modules
pnpm install

# Try safe dev restart
pnpm devsafe
```

#### Database Connection Issues

```bash
# Check MongoDB status
brew services list | grep mongodb

# Start MongoDB
brew services start mongodb/brew/mongodb-community

# Test connection
mongosh mongodb://localhost:27017/santo-ambrosius-dev
```

### Performance Optimization

#### Bundle Analysis

```bash
# Analyze bundle size
pnpm build
npx @next/bundle-analyzer
```

#### Image Optimization

```typescript
// Use Next.js Image component
import Image from 'next/image'

<Image
  src="/path/to/image.jpg"
  alt="Description"
  width={800}
  height={600}
  priority // For above-the-fold images
  placeholder="blur" // Optional blur placeholder
/>
```

#### Code Splitting

```typescript
// Dynamic imports for code splitting
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
})
```

---

## Resources

- **[Next.js Documentation](https://nextjs.org/docs)**
- **[Payload CMS Documentation](https://payloadcms.com/docs)**
- **[Tailwind CSS Documentation](https://tailwindcss.com/docs)**
- **[Playwright Documentation](https://playwright.dev/docs/intro)**
- **[Vitest Documentation](https://vitest.dev/guide/)**

For development support or questions, contact the development team or create an issue on GitHub.

---

*Last updated: [Date] | Version: 1.0*
