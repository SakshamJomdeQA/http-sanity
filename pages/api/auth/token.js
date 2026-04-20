export default function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const querystring = req.url.includes('?') ? req.url.split('?')[1] : null;

  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

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
