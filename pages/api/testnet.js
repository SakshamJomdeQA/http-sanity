import https from "https"

const getContent = function (url) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, (response) => {
      if (response.statusCode < 200 || response.statusCode > 299) {
        reject(
          new Error("Failed to load page, status code: " + response.statusCode)
        );
      }
      const body = [];
      response.on("data", (chunk) => body.push(chunk));
      response.on("end", () => resolve(body.join("")));
    });

    request.on("error", (err) => reject(err));
  });
};

export default async function handler(req, res) {
  const url = "https://jsonplaceholder.typicode.com/users";
  try {
    const content = await getContent(url);
    console.log("Response content: %j", content);
    console.log("You have access to the internet, congratulations!");

    res.status(200).send(content);
  } catch (e) {
    console.error(e);
    res.status(501).send(e.toString());
  }
}
