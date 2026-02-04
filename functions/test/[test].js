export default function handler(req, res) {
    const { query } = req;
    
    // Set headers to prevent caching
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Content-Type', 'application/json');
    
    // Collect all request details
    const querystring = req.url?.includes('?') ? req.url.split('?')[1] : null
    const requestDetails = {
      method: req.method,
      url: req.url,
      path: req.url?.split('?')[0] || null,
      pathname: req.url?.split('?')[0] || null,
      query: query,
      querystring: querystring,
      headers: req.headers,
      cookies: req.cookies || {},
      protocol: req.protocol || (req.connection?.encrypted ? 'https' : 'http'),
      host: req.headers.host || null,
      ip: req.headers['x-forwarded-for'] || req.connection?.remoteAddress || req.socket?.remoteAddress || null,
      userAgent: req.headers['user-agent'] || null,
      referer: req.headers.referer || req.headers.referrer || null,
      timestamp: new Date().toISOString(),
      body: req.body || null,
    };
    
    // Return JSON response
    res.status(200).json({
      success: true,
      requestDetails,
    });
  }
  