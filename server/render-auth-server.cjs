const crypto = require('node:crypto');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const staticRoot = path.join(root, 'dist', 'federico-croletti-site', 'browser');
const port = Number(process.env.PORT || 10000);
const username = process.env.BASIC_AUTH_USERNAME || '';
const password = process.env.BASIC_AUTH_PASSWORD || '';
const realm = process.env.AUTH_REALM || 'Protected site';

const mimeTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.ico', 'image/x-icon'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.pdf', 'application/pdf'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.webp', 'image/webp'],
  ['.woff2', 'font/woff2'],
  ['.xml', 'application/xml; charset=utf-8'],
]);

if (!username || !password) {
  console.error('Missing BASIC_AUTH_USERNAME or BASIC_AUTH_PASSWORD. Refusing to start.');
  process.exit(1);
}

if (!fs.existsSync(staticRoot)) {
  console.error(`Missing Angular build output at ${staticRoot}. Run npm run build first.`);
  process.exit(1);
}

const server = http.createServer((request, response) => {
  if (request.url === '/healthz') {
    send(response, 200, 'ok', { 'Content-Type': 'text/plain; charset=utf-8' });
    return;
  }

  setSecurityHeaders(response);

  if (!isAuthorized(request)) {
    response.setHeader('WWW-Authenticate', `Basic realm="${realm}", charset="UTF-8"`);
    send(response, 401, 'Authentication required', { 'Content-Type': 'text/plain; charset=utf-8' });
    return;
  }

  serveStatic(request, response);
});

server.listen(port, () => {
  console.log(`Protected site listening on ${port}`);
});

function isAuthorized(request) {
  const header = request.headers.authorization || '';
  const [scheme, encodedCredentials] = header.split(' ');

  if (scheme !== 'Basic' || !encodedCredentials) {
    return false;
  }

  let credentials;

  try {
    credentials = Buffer.from(encodedCredentials, 'base64').toString('utf8');
  } catch {
    return false;
  }

  const separatorIndex = credentials.indexOf(':');

  if (separatorIndex < 0) {
    return false;
  }

  const suppliedUsername = credentials.slice(0, separatorIndex);
  const suppliedPassword = credentials.slice(separatorIndex + 1);

  return timingSafeEqual(suppliedUsername, username) && timingSafeEqual(suppliedPassword, password);
}

function timingSafeEqual(left, right) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    crypto.timingSafeEqual(leftBuffer, leftBuffer);
    return false;
  }

  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

function serveStatic(request, response) {
  const url = new URL(request.url || '/', 'https://render.local');
  const requestedPath = decodeURIComponent(url.pathname);
  const normalizedPath = path.normalize(requestedPath).replace(/^([/\\])+/, '');
  const candidatePath = path.join(staticRoot, normalizedPath);
  const filePath = resolveFilePath(candidatePath);

  if (!filePath.startsWith(staticRoot)) {
    send(response, 403, 'Forbidden', { 'Content-Type': 'text/plain; charset=utf-8' });
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      send(response, 404, 'Not found', { 'Content-Type': 'text/plain; charset=utf-8' });
      return;
    }

    const extension = path.extname(filePath).toLowerCase();
    send(response, 200, content, {
      'Cache-Control': extension === '.html' ? 'no-store' : 'private, max-age=3600',
      'Content-Type': mimeTypes.get(extension) || 'application/octet-stream',
    });
  });
}

function resolveFilePath(candidatePath) {
  if (fs.existsSync(candidatePath) && fs.statSync(candidatePath).isFile()) {
    return candidatePath;
  }

  return path.join(staticRoot, 'index.html');
}

function setSecurityHeaders(response) {
  response.setHeader('Content-Security-Policy', [
    "default-src 'self'",
    "base-uri 'self'",
    "connect-src 'self' https://api.emailjs.com https://plausible.io",
    "font-src 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "img-src 'self' data:",
    "object-src 'none'",
    "script-src 'self' https://plausible.io",
    "style-src 'self' 'unsafe-inline'",
    'upgrade-insecure-requests',
  ].join('; '));
  response.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  response.setHeader('Referrer-Policy', 'no-referrer');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('X-Frame-Options', 'DENY');
  response.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive');
}

function send(response, statusCode, body, headers = {}) {
  response.writeHead(statusCode, headers);
  response.end(body);
}