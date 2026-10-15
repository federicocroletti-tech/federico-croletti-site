const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const srcRoot = path.join(root, 'src', 'app');
const issues = [];

for (const filePath of walk(srcRoot).filter((file) => file.endsWith('.component.html'))) {
  const relativePath = path.relative(root, filePath).replace(/\\/g, '/');
  const html = fs.readFileSync(filePath, 'utf8');

  if (relativePath.includes('/page/') && !/<h1[\s>]/.test(html)) {
    issues.push(`${relativePath}: page templates must expose one visible h1.`);
  }

  if (/<table[\s>]/.test(html) && !/<th\s+scope="col"/.test(html)) {
    issues.push(`${relativePath}: data tables must use column header scope attributes.`);
  }

  if (/<form[\s>]/.test(html)) {
    for (const field of ['contact-full-name', 'contact-email', 'contact-message']) {
      if (!html.includes(`data-cy="${field}"`)) {
        issues.push(`${relativePath}: contact form is missing ${field}.`);
      }
    }

    if (!html.includes('aria-hidden="true"')) {
      issues.push(`${relativePath}: honeypot or hidden helper content must be hidden from assistive tech.`);
    }
  }

  for (const iconButton of html.matchAll(/<button[^>]*mat-icon-button[^>]*>/g)) {
    if (!/aria-label=/.test(iconButton[0])) {
      issues.push(`${relativePath}: icon-only buttons must provide aria-label.`);
    }
  }
}

if (issues.length > 0) {
  console.error('Accessibility check failed:');
  for (const issue of issues) {
    console.error(`- ${issue}`);
  }
  process.exit(1);
}

console.log('Accessibility check passed.');

function walk(directory) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(entryPath) : entryPath;
  });
}