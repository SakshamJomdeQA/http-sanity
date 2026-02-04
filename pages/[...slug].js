export default function Page() {
  return null
}

export async function getServerSideProps(context) {
  const { req, res, query, params } = context
  
  // Set headers to prevent caching and set content type
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
  res.setHeader('Content-Type', 'application/json')
  
  // Collect all request details
  const querystring = req.url.includes('?') ? req.url.split('?')[1] : null
  const requestDetails = {
    method: req.method,
    url: req.url,
    path: req.url.split('?')[0],
    pathname: req.url.split('?')[0],
    query: query,
    querystring: querystring,
    params: params,
    headers: req.headers,
    cookies: req.cookies || {},
    protocol: req.protocol || (req.connection?.encrypted ? 'https' : 'http'),
    host: req.headers.host,
    ip: req.headers['x-forwarded-for'] || req.connection?.remoteAddress || req.socket?.remoteAddress,
    userAgent: req.headers['user-agent'],
    referer: req.headers.referer || req.headers.referrer,
    timestamp: new Date().toISOString(),
    // Additional Next.js context
    locale: context.locale || null,
    locales: context.locales || null,
    defaultLocale: context.defaultLocale || null,
  }
  
  // Send JSON response
  res.statusCode = 200
  res.end(JSON.stringify({
    success: true,
    requestDetails,
  }))
  
  return {
    props: {},
  }
}
