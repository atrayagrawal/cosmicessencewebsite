/**
 * CMS Index Generator for Cosmic Essence
 *
 * This script scans the _content/ folder and generates JSON index files
 * that the website uses to display blog posts and resources.
 *
 * Run this after creating or updating content via the CMS.
 *
 * Usage: node generate-index.js
 */

const fs = require('fs');
const path = require('path');

// Parse markdown frontmatter
function parseFrontmatter(content) {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n/);
  if (!frontmatterMatch) return {};

  const fm = {};
  frontmatterMatch[1].split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      // Remove quotes
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      // Convert boolean strings
      if (value === 'true') value = true;
      if (value === 'false') value = false;
      fm[key] = value;
    }
  });

  return fm;
}

// Get slug from filename
function getSlug(filename) {
  return path.basename(filename, '.md');
}

// Generate index for a folder
function generateIndex(folderPath, outputFile) {
  if (!fs.existsSync(folderPath)) {
    console.log(`Folder ${folderPath} does not exist, skipping...`);
    return;
  }

  const files = fs.readdirSync(folderPath)
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const content = fs.readFileSync(path.join(folderPath, file), 'utf-8');
      const fm = parseFrontmatter(content);
      const slug = getSlug(file);

      return {
        slug,
        ...fm
      };
    });

  fs.writeFileSync(outputFile, JSON.stringify(files, null, 2));
  console.log(`Generated ${outputFile} with ${files.length} items`);
}

// Create folders if they don't exist
const folders = ['_content/blog', '_content/resources', '_content/testimonials'];
folders.forEach(folder => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
    console.log(`Created folder: ${folder}`);
  }
});

// Generate indexes
generateIndex('_content/blog', '_content/blog/index.json');
generateIndex('_content/resources', '_content/resources/index.json');
generateIndex('_content/testimonials', '_content/testimonials/index.json');

console.log('\n✅ Index generation complete!');
console.log('The website will now use these indexes to display content.');
