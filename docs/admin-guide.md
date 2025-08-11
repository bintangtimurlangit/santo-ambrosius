# Administrator Guide - Gereja Santo Ambrosius CMS

This guide provides comprehensive instructions for content administrators to manage the church website using the Payload CMS admin panel.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Admin Panel Overview](#admin-panel-overview)
3. [Managing Articles](#managing-articles)
4. [Managing Media](#managing-media)
5. [Homepage Management](#homepage-management)
6. [User Management](#user-management)
7. [Best Practices](#best-practices)
8. [Troubleshooting](#troubleshooting)

## Getting Started

### Accessing the Admin Panel

1. Navigate to `https://your-domain.com/admin` (or `http://localhost:3000/admin` for local development)
2. Log in with your administrator credentials
3. If this is your first time accessing the system, you'll be guided through creating an admin account

### Admin Panel Layout

The admin panel is organized into several main sections:

- **Dashboard**: Overview of recent content and system status
- **Collections**: Content management areas
  - **Articles**: Berita (News) and Renungan (Reflections)
  - **Pages**: Homepage and static page content
  - **Media**: Image and video management
  - **Users**: Administrator account management

## Admin Panel Overview

### Navigation Menu

The left sidebar contains the main navigation:

- **Dashboard** 📊: System overview and recent activity
- **Article Group**:
  - **Berita** 📰: Parish news and ministry updates
  - **Renungan** 🙏: Spiritual reflections and devotional content
- **Pages Group**:
  - **Homepage** 🏠: Main page content management
  - **Sejarah Paroki** 📜: Parish history content
- **Media** 🖼️: Image and video library
- **Users** 👥: Administrator accounts

### Content Status System

All content uses a three-state status system:
- **Draft** 📝: Content is being worked on, not visible to public
- **Published** ✅: Content is live and visible on the website
- **Archived** 📦: Content is no longer active but preserved

## Managing Articles

### Creating News Articles (Berita)

1. **Navigate to Berita** in the admin sidebar
2. **Click "Create New"** button
3. **Fill in required fields**:
   - **Title**: Clear, descriptive headline
   - **Description**: Brief excerpt (will appear in article previews)
   - **Sapta Bidang**: Choose the ministry category:
     - Pewartaan (Evangelization)
     - Pelayanan (Service)
     - Persekutuan (Fellowship)
     - Peribadatan (Worship)
     - Pemerhati (Social Care)
     - PITK (Youth Ministry)
     - OKK (Children's Ministry)
     - Serba-Serbi (General)
   - **Featured Image**: Main article image (recommended: 1200x630px)
   - **Content**: Full article text with rich formatting
   - **Author**: Writer's name
   - **Published Date**: When the article should go live

4. **Set Status**:
   - Start with "Draft" while working
   - Change to "Published" when ready to go live

5. **Save and Preview**:
   - Use "Save Draft" to save work in progress
   - Use "Save and Continue Editing" to save and keep editing
   - Click "Preview" to see how it will look on the website

### Creating Spiritual Reflections (Renungan)

Similar process to news articles, but focused on spiritual content:

1. **Navigate to Renungan**
2. **Follow the same creation process** as news articles
3. **Content Guidelines**:
   - Focus on spiritual themes, Bible verses, or faith reflections
   - Include relevant scripture references
   - Keep tone inspirational and accessible
   - Consider seasonal liturgical themes

### Article Content Formatting

The rich text editor supports:

#### Text Formatting
- **Bold** and *italic* text
- Headings (H2, H3, H4)
- Bullet points and numbered lists
- Block quotes
- Links to external websites

#### Media Integration
- **Images**: Drag and drop or click to upload
- **Videos**: Embed YouTube/Vimeo or upload directly
- **Image Captions**: Add descriptive captions for accessibility

#### Best Practices for Content
- **Use clear headings** to break up long articles
- **Include relevant images** to make content engaging
- **Add alt text** to images for accessibility
- **Keep paragraphs short** for better readability
- **Use bullet points** for lists and key information

### Managing Article Categories (Sapta Bidang)

Each news article must be assigned to one of the seven ministries:

1. **Pewartaan (Evangelization)**
   - Mission work
   - Faith sharing initiatives
   - Community outreach
   - Conversion stories

2. **Pelayanan (Service)**
   - Community service projects
   - Charity work
   - Volunteer activities
   - Social assistance programs

3. **Persekutuan (Fellowship)**
   - Community gatherings
   - Small group activities
   - Social events
   - Relationship building

4. **Peribadatan (Worship)**
   - Liturgical celebrations
   - Special masses
   - Religious ceremonies
   - Worship innovations

5. **Pemerhati (Social Care)**
   - Healthcare initiatives
   - Elder care
   - Crisis support
   - Counseling services

6. **PITK (Youth Ministry)**
   - Youth programs
   - Young adult activities
   - Youth leadership
   - Educational initiatives

7. **OKK (Children's Ministry)**
   - Children's programs
   - Sunday school
   - Family activities
   - Educational content for kids

## Managing Media

### Image Management

#### Uploading Images

1. **Navigate to Media** in the admin panel
2. **Click "Upload New"**
3. **Drag and drop** files or **click to browse**
4. **Fill in metadata**:
   - **Alt Text**: Describe the image for accessibility
   - **Caption**: Optional description for display
   - **Filename**: Automatically generated, can be customized

#### Image Guidelines

**Recommended Formats**: JPEG, PNG, WebP
**Maximum File Size**: 10MB per image
**Recommended Dimensions**:
- **Hero Images**: 1920x1080px
- **Article Featured Images**: 1200x630px
- **Gallery Images**: 800x600px
- **Thumbnails**: 400x300px

#### Image Optimization Tips

- **Compress images** before uploading to reduce file size
- **Use descriptive filenames** (e.g., "christmas-mass-2024.jpg")
- **Always add alt text** for accessibility
- **Consider mobile viewing** when choosing images

### Video Management

#### Uploading Videos

1. **Navigate to Media**
2. **Upload video files** (MP4 recommended)
3. **Add metadata**: title, description, alt text

#### Video Guidelines

- **Format**: MP4 (H.264 codec)
- **Maximum Size**: 100MB
- **Recommended Resolution**: 1080p or 720p
- **Duration**: Keep under 10 minutes for web performance

#### Video Alternatives

For larger videos, consider:
- **YouTube**: Upload to church YouTube channel and embed
- **Vimeo**: Professional video hosting
- **External hosting** for very large files

## Homepage Management

### Hero Section

The homepage hero section includes:

1. **Hero Title**: Main headline (supports line breaks)
2. **Background Video**: Auto-playing background video
3. **Video Alt Text**: Accessibility description

#### Updating Hero Content

1. **Navigate to Pages > Homepage**
2. **Edit the Hero Section**:
   - Update title text
   - Replace background video if needed
   - Ensure video alt text is descriptive

### Pengumuman (Announcements) Carousel

Manage rotating announcements:

1. **In Homepage settings**, find **Pengumuman Section**
2. **Add/Edit Carousel Images**:
   - **Title**: Announcement name
   - **Image**: Upload announcement graphic
   - **Alt Text**: Describe the image
   - **Link**: Optional URL when clicked

#### Announcement Best Practices

- **Use consistent image dimensions** (1200x800px recommended)
- **Include clear, readable text** in the image
- **Limit to 5-7 announcements** for better performance
- **Update regularly** to keep content fresh
- **Test links** to ensure they work correctly

## User Management

### Adding New Administrators

1. **Navigate to Users** in the admin panel
2. **Click "Create New"**
3. **Fill in user details**:
   - **Email**: Must be unique
   - **Password**: Strong password required
   - **Role**: Administrator (default)
4. **Save the user**

### Managing User Permissions

Currently, all users have full administrative access. Future versions may include role-based permissions.

### Password Management

Users can change their passwords by:
1. **Clicking their profile** in the top-right corner
2. **Selecting "Account"**
3. **Updating password** in the security section

## Best Practices

### Content Creation Workflow

1. **Plan your content** before starting
2. **Start with "Draft" status** while working
3. **Use preview feature** to check formatting
4. **Get content reviewed** by another team member
5. **Publish when ready** and announce to community

### SEO Best Practices

- **Use descriptive titles** that include relevant keywords
- **Write compelling descriptions** for article excerpts
- **Include alt text** for all images
- **Use proper heading structure** (H2, H3, H4)
- **Add internal links** between related articles

### Content Guidelines

#### Writing Style
- **Keep language accessible** to all parishioners
- **Use active voice** when possible
- **Be concise** but informative
- **Include relevant dates and details**

#### Visual Content
- **Use high-quality images** that represent the content well
- **Ensure images are relevant** to the article topic
- **Include people** when appropriate (with permission)
- **Maintain consistent visual style** across articles

### Scheduling and Planning

#### Content Calendar Suggestions

- **Weekly**: Upcoming Sunday readings reflection
- **Monthly**: Ministry spotlights and updates
- **Seasonal**: Liturgical calendar events
- **Special**: Parish milestones and celebrations

#### Publishing Schedule

- **News articles**: As events occur
- **Reflections**: 2-3 times per week
- **Announcements**: Update weekly
- **Homepage content**: Monthly review

## Troubleshooting

### Common Issues

#### Images Not Displaying
- **Check file size**: Must be under 10MB
- **Verify format**: Use JPEG, PNG, or WebP
- **Clear browser cache** and reload

#### Content Not Saving
- **Check internet connection**
- **Try saving again** after a few minutes
- **Contact technical support** if problem persists

#### Rich Text Formatting Issues
- **Use the formatting toolbar** instead of pasting formatted text
- **Copy and paste as plain text** first, then format
- **Preview changes** before publishing

#### Preview Not Working
- **Ensure content is saved** before previewing
- **Check that required fields** are filled in
- **Clear browser cache** if preview seems outdated

### Getting Help

1. **Check this documentation** for guidance
2. **Contact the technical team** for system issues
3. **Reach out to content coordinators** for editorial questions
4. **Report bugs** through the designated support channels

### Emergency Procedures

#### Urgent Content Updates
1. **Log into admin panel** immediately
2. **Navigate to the relevant content**
3. **Make necessary changes**
4. **Publish immediately** (skip review if urgent)
5. **Notify team** of emergency update

#### Content Rollback
If incorrect content is published:
1. **Edit the content** to correct version
2. **Or change status to "Draft"** to temporarily hide
3. **Fix issues** then republish
4. **Document what happened** for future reference

---

## Additional Resources

- **[Deployment Guide](./deployment.md)**: Technical setup and hosting
- **[Development Guide](./development.md)**: For developers and technical contributors
- **[API Documentation](./api.md)**: For advanced integrations

For technical support or questions about this guide, contact the website administration team.

---

*Last updated: [Date] | Version: 1.0*
