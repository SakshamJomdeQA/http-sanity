export default async function handler(req, res) {
  const responseJson = {method: req.method};

  if (req.method === "POST" || req.method === "PATCH" || req.method === "PUT") {
    const body = req.body;
    if (body && body.bodyIdentifier === 'BODY_IDENTIFIER') {
      responseJson.body = 'VALID';
    }
  
    return res
      .status(200)
      .json(responseJson);
  }

  if (req.query.redirect === 'true') {
    res.setHeader('Set-Cookie', 'myCookie=myValue; Path=/; HttpOnly');
    return res.redirect('/');
  }

  res
    .status(200)
    .json(responseJson)
}