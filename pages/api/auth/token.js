import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

function parseFormidable(req) {
  return new Promise((resolve, reject) => {
    const form = formidable({ maxFileSize: 10 * 1024 * 1024 });
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const contentType = req.headers['content-type'] || '';
  const querystring = req.url.includes('?') ? req.url.split('?')[1] : null;

  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  if (contentType.startsWith('multipart/form-data')) {
    try {
      await parseFormidable(req);
    } catch (_) {
      // ignore parse errors, still return 200
    }
  } else {
    try {
      await readRawBody(req);
    } catch (_) {
      // ignore read errors, still return 200
    }
  }

  res.status(200).json({
    success: true,
    requestDetails: {
      method: req.method,
      url: req.url,
      path: req.url.split('?')[0],
      pathname: req.url.split('?')[0],
      query: req.query,
      querystring,
      headers: req.headers,
      cookies: req.cookies || {},
      protocol: req.connection?.encrypted ? 'https' : 'http',
      host: req.headers.host,
      ip: req.headers['x-forwarded-for'] || req.connection?.remoteAddress || req.socket?.remoteAddress,
      userAgent: req.headers['user-agent'],
      referer: req.headers.referer || req.headers.referrer,
      timestamp: new Date().toISOString(),
    },
  });
}
