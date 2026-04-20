export default function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  res.status(200).json({
    method: req.method,
    headers: req.headers,
    body: req.body,
    query: req.query,
  });
}
