/**
 * Cosmic Essence - CMS Content Loader
 * Loads blog posts and resources from _content/ folder
 */

// Simple markdown parser (no external library needed)
function parseMarkdown(md) {
  // Extract frontmatter
  const frontmatterMatch = md.match(/^---\n([\s\S]*?)\n---\n/);
  let frontmatter = {};
  let content = md;

  if (frontmatterMatch) {
    const fmText = frontmatterMatch[1];
    content = md.slice(frontmatterMatch[0].length);

    // Parse simple YAML frontmatter
    fmText.split('\n').forEach(line => {
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        const key = line.slice(0, colonIndex).trim();
        let value = line.slice(colonIndex + 1).trim();
        // Remove quotes if present
        if ((value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        frontmatter[key] = value;
      }
    });
  }

  return { frontmatter, content };
}

// Convert markdown to HTML (basic)
function markdownToHtml(md) {
  return md
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold and italic
    .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // Paragraphs
    .replace(/\n\n/g, '</p><p>')
    // Wrap in paragraphs
    .replace(/^(.+)$/gim, '<p>$1</p>')
    // Clean up empty paragraphs
    .replace(/<p><\/p>/g, '')
    .replace(/<p>(<h[123].*?<\/h[123]>)<\/p>/g, '$1')
    .replace(/<p>(<p.*?<\/p>)<\/p>/g, '$1');
}

// Format date
function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date)) return dateString;
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Load blog posts
 */
async function loadBlogPosts(containerSelector, options = {}) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const { limit = 10, featured = false, category = null } = options;

  try {
    // Fetch blog index (we'll create a JSON index file)
    const response = await fetch('/_content/blog/index.json');
    if (!response.ok) {
      // Fallback: try to list files or use hardcoded array
      console.log('Blog index not found, showing default posts');
      return;
    }

    const posts = await response.json();

    // Filter published posts only
    let filteredPosts = posts.filter(post => post.draft !== 'true' && post.draft !== true);

    if (featured) {
      filteredPosts = filteredPosts.filter(post => post.featured === 'true' || post.featured === true);
    }

    if (category) {
      filteredPosts = filteredPosts.filter(post => post.category === category);
    }

    // Sort by date (newest first)
    filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Limit
    filteredPosts = filteredPosts.slice(0, limit);

    // Render
    container.innerHTML = filteredPosts.map(post => `
      <article class="blog-card">
        ${post.category ? `<span class="blog-card-category">${post.category}</span>` : ''}
        <h4><a href="/blog/post.html?slug=${post.slug}">${post.title}</a></h4>
        ${post.date ? `<p class="blog-card-date">${formatDate(post.date)}</p>` : ''}
        ${post.excerpt ? `<p class="blog-card-excerpt">${post.excerpt}</p>` : ''}
        <a href="/blog/post.html?slug=${post.slug}" class="btn btn-ghost">Read More →</a>
      </article>
    `).join('');

  } catch (error) {
    console.error('Error loading blog posts:', error);
    container.innerHTML = '<p>Unable to load blog posts. Please try again later.</p>';
  }
}

/**
 * Load single blog post
 */
async function loadSinglePost() {
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('slug');

  if (!slug) {
    document.getElementById('post-container').innerHTML = '<p>Post not found.</p>';
    return;
  }

  try {
    const response = await fetch(`/_content/blog/${slug}.md`);
    if (!response.ok) throw new Error('Post not found');

    const md = await response.text();
    const { frontmatter, content } = parseMarkdown(md);

    // Check if draft
    if (frontmatter.draft === 'true' || frontmatter.draft === true) {
      document.getElementById('post-container').innerHTML = '<p>This post is not yet published.</p>';
      return;
    }

    // Render post
    const html = `
      <article class="blog-post">
        ${frontmatter.category ? `<span class="blog-card-category">${frontmatter.category}</span>` : ''}
        <h1>${frontmatter.title || 'Untitled'}</h1>
        ${frontmatter.date ? `<p class="blog-card-date">${formatDate(frontmatter.date)}</p>` : ''}
        <div class="blog-content">
          ${markdownToHtml(content)}
        </div>
      </article>
    `;

    document.getElementById('post-container').innerHTML = html;

    // Update page title
    if (frontmatter.title) {
      document.title = `${frontmatter.title} | Cosmic Essence Blog`;
    }

  } catch (error) {
    console.error('Error loading post:', error);
    document.getElementById('post-container').innerHTML = '<p>Post not found.</p>';
  }
}

/**
 * Load resources
 */
async function loadResources(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  try {
    const response = await fetch('/_content/resources/index.json');
    if (!response.ok) {
      console.log('Resources index not found');
      return;
    }

    const resources = await response.json();

    // Filter published only
    const publishedResources = resources.filter(r => r.draft !== 'true' && r.draft !== true);

    container.innerHTML = publishedResources.map(resource => `
      <div class="resource-card">
        <span class="tag tag-students">${resource.format || 'PDF'}</span>
        <h4 class="mt-4">${resource.title}</h4>
        <p>${resource.description || ''}</p>
        <a href="${resource.gated === 'true' ? '/contact.html' : resource.download_url}"
           class="btn btn-ghost">
          ${resource.gated === 'true' ? 'Download (Email Required) →' : 'Download →'}
        </a>
      </div>
    `).join('');

  } catch (error) {
    console.error('Error loading resources:', error);
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  // Load blog posts on homepage
  if (document.querySelector('.blog-grid')) {
    loadBlogPosts('.blog-grid', { limit: 3 });
  }

  // Load all blog posts on blog page
  if (document.querySelector('.blog-list')) {
    loadBlogPosts('.blog-list', { limit: 50 });
  }

  // Load single post
  if (document.getElementById('post-container')) {
    loadSinglePost();
  }

  // Load resources
  if (document.querySelector('.resources-grid')) {
    loadResources('.resources-grid');
  }
});
