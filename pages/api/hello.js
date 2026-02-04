export default function handler(req, res) {
    console.log("Env:", process.env);
    console.log("Env with whitespace:", process.env.NEXT_PUBLIC_PARTNER_PORTAL_URL);
    
    res
      .status(200)
      .send({
        query: req.query,
        method: req.method,
        body: req.body,
        headers: req.headers,
        env: process.env,
        envWhitespace: process.env.NEXT_PUBLIC_PARTNER_PORTAL_URL,
        randomNum: Math.floor((Math.random()*100) + 1)
      });
  }
  