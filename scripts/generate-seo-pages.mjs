import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const browserOutput = resolve(projectRoot, 'dist/federico-croletti-site/browser');
const sourceHtml = await readFile(resolve(browserOutput, 'index.html'), 'utf8');
const siteUrl = 'https://federico-croletti-site.onrender.com';

const pages = [
  {
    path: '/chi-sono',
    title: 'Chi sono - Federico Croletti',
    description:
      'Scopri Federico Croletti: Senior Software Engineer Angular, consulente per siti web, WordPress, servizi digitali, SPID, PEC, firma digitale, backup, email e AI con certificazione AWS AI Practitioner.',
  },
  {
    path: '/servizi',
    title: 'Servizi informatici a Milano - Federico Croletti',
    description:
      'Servizi informatici a Milano con Federico Croletti: assistenza PC, backup, formattazione, gestione email, PEC, SPID, firma digitale, sicurezza online, siti web e consulenza IT.',
  },
  {
    path: '/progetti',
    title: 'Progetti - Federico Croletti',
    description:
      'Portfolio progetti di Federico Croletti: Angular, Micro Frontend, mappe interattive, AI, cloud e applicazioni enterprise.',
  },
  {
    path: '/contatti',
    title: 'Contatti e recensioni Google - Federico Croletti',
    description:
      'Contatta Federico Croletti, tecnico informatico a Milano. Telefono, WhatsApp, email, sito web ufficiale, profilo Google Business e recensioni Google.',
  },
  {
    path: '/privacy',
    title: 'Privacy - Federico Croletti',
    description:
      'Informativa privacy del sito personale di Federico Croletti e del form contatti.',
  },
  {
    path: '/cookie-policy',
    title: 'Cookie Policy - Federico Croletti',
    description:
      'Cookie policy del sito personale di Federico Croletti: cookie tecnici, preferenze, analytics e gestione del consenso.',
  },
];

function replaceTag(html, pattern, update, label) {
  let replacements = 0;
  const result = html.replace(pattern, (tag) => {
    replacements += 1;
    return update(tag);
  });

  if (replacements !== 1) {
    throw new Error(`Expected one ${label} tag, found ${replacements}.`);
  }

  return result;
}

function updateAttribute(html, pattern, attribute, value, label) {
  return replaceTag(
    html,
    pattern,
    (tag) => {
      const attributePattern = new RegExp(`\\b${attribute}="[^"]*"`);
      if (!attributePattern.test(tag)) {
        throw new Error(`Missing ${attribute} on the ${label} tag.`);
      }

      return tag.replace(attributePattern, `${attribute}="${value}"`);
    },
    label,
  );
}

function setMetaContent(html, attribute, name, content) {
  const pattern = new RegExp(
    `<meta(?=[^>]*\\b${attribute}="${name}")[^>]*>`,
    'g',
  );
  return updateAttribute(html, pattern, 'content', content, `${attribute}=${name} meta`);
}

for (const page of pages) {
  const canonicalUrl = `${siteUrl}${page.path}/`;
  let html = sourceHtml;

  html = replaceTag(html, /<title>[^<]*<\/title>/g, () => `<title>${page.title}</title>`, 'title');
  html = setMetaContent(html, 'name', 'description', page.description);
  html = setMetaContent(html, 'property', 'og:title', page.title);
  html = setMetaContent(html, 'property', 'og:description', page.description);
  html = setMetaContent(html, 'property', 'og:url', canonicalUrl);
  html = setMetaContent(html, 'name', 'twitter:title', page.title);
  html = setMetaContent(html, 'name', 'twitter:description', page.description);
  html = updateAttribute(
    html,
    /<link rel="canonical"[^>]*>/g,
    'href',
    canonicalUrl,
    'canonical link',
  );
  html = updateAttribute(
    html,
    /<link rel="alternate" hreflang="it"[^>]*>/g,
    'href',
    canonicalUrl,
    'Italian alternate link',
  );
  html = updateAttribute(
    html,
    /<link rel="alternate" hreflang="x-default"[^>]*>/g,
    'href',
    canonicalUrl,
    'x-default alternate link',
  );

  const outputPath = resolve(browserOutput, page.path.slice(1), 'index.html');
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html);
}

console.log(`Generated SEO-ready HTML for ${pages.length} routes.`);
