/**
 * HANAFI COLLECTIONS — High Performance Local Server
 * Standard Node.js built-in server with HTTP 206 Video Range Streaming support,
 * accurate MIME types, and instant zero-dependency execution.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = parsedUrl.pathname;

  if (pathname === '/' || pathname === '') {
    pathname = '/index.html';
  }

  // Prevent directory traversal
  const safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  const filePath = path.join(PUBLIC_DIR, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
        res.end('404 Not Found — HANAFI COLLECTIONS');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
        res.end(`Server Error: ${err.code}`);
      }
      return;
    }

    if (stats.isDirectory()) {
      res.writeHead(302, { 'Location': path.posix.join(pathname, 'index.html') });
      res.end();
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Support HTTP 206 Partial Content for MP4 video streaming
    if (ext === '.mp4') {
      const range = req.headers.range;
      if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : stats.size - 1;
        const chunksize = (end - start) + 1;
        const fileStream = fs.createReadStream(filePath, { start, end });

        res.writeHead(206, {
          'Content-Range': `bytes ${start}-${end}/${stats.size}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': contentType,
        });
        fileStream.pipe(res);
        return;
      }
    }

    // Normal static serving
    res.writeHead(200, {
      'Content-Length': stats.size,
      'Content-Type': contentType,
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*'
    });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(` HANAFI COLLECTIONS — Premium Islamic Decor E-Commerce `);
  console.log(` Server running at: http://localhost:${PORT}`);
  console.log(` Strict Brand Palette:`);
  console.log(`   1. Luxury Black — #090909`);
  console.log(`   2. Royal Gold   — #C6A15B`);
  console.log(`   3. Elegant Ivory — #F5F0E6`);
  console.log(`   4. Rich Brown   — #78614A`);
  console.log(` Founder: Rizwan Raza Qadri (+91 8341886299)`);
  console.log(`=======================================================`);
});
