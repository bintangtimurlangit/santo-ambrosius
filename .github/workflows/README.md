# GitHub Actions Workflows

This directory contains all the automated workflows for the Santo Ambrosius project.

## 🚀 Workflows Overview

### 1. **Code Quality & Testing** (`code-quality.yml`)
- **Triggers**: PRs to main/develop, pushes to main/develop
- **Purpose**: Ensures code quality before merging
- **Actions**:
  - ESLint checking
  - TypeScript type checking
  - Unit tests
  - Build verification
  - Bundle size analysis

### 2. **Security Scanning** (`security.yml`)
- **Triggers**: PRs to main/develop, weekly schedule, manual
- **Purpose**: Identifies security vulnerabilities
- **Actions**:
  - npm audit
  - Snyk security scan
  - CodeQL analysis
  - Trivy vulnerability scanner

### 3. **Staging Deployment** (`staging.yml`)
- **Triggers**: Push to develop branch, manual
- **Purpose**: Deploys to staging environment
- **Actions**:
  - Builds application
  - Deploys to VPS using `docker-compose.dev.yml`
  - Creates staging environment

### 4. **Production Deployment** (`deploy.yml`)
- **Triggers**: Push to main branch, manual
- **Purpose**: Deploys to production environment
- **Actions**:
  - Security checks
  - Builds application
  - Deploys to VPS using `docker-compose.yml`
  - Health checks

### 5. **Dependency Updates** (`dependencies.yml`)
- **Triggers**: Weekly schedule, manual
- **Purpose**: Automates dependency updates
- **Actions**:
  - Checks for outdated packages
  - Applies security patches
  - Creates PR for updates

## 🔐 Required Secrets

Add these to your repository secrets:

- `VPS_SSH_KEY`: SSH private key for VPS access
- `VPS_HOST`: VPS IP address (31.97.66.23)
- `VPS_USER`: VPS username (deploy)
- `VPS_APP_DIR`: VPS app directory (/home/deploy/app)
- `SNYK_TOKEN`: Snyk security token (optional)

## 📋 Workflow Sequence

1. **Development**: Create feature branch → Push to develop
2. **Staging**: Auto-deploy to staging via `staging.yml`
3. **Testing**: Test in staging environment
4. **Production**: Merge to main → Auto-deploy via `deploy.yml`

## 🛡️ Branch Protection

Recommended branch protection rules:

- **main**: Require PR reviews, status checks, up-to-date branches
- **develop**: Require status checks, up-to-date branches

## 🔧 Customization

- Modify trigger conditions in each workflow
- Adjust Node.js version in setup steps
- Customize deployment scripts for your environment
- Add/remove security scanning tools as needed
