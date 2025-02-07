import formidable from 'formidable';

export default async function handler(req, res) {
  const responseJson = { method: req.method };
  const form = formidable({});

  if (req.headers['content-type'].startsWith('multipart/form-data')) {
    form.parse(req, async (err, _fields, files) => {
      if (err) {
        res.status(500).json({ message: 'Error parsing the form data.' });
        return;
      }

      if (!files.file) {
        res.status(400).json({ message: 'File upload error: No file was uploaded.' });
        return;
      }

      responseJson.body = 'VALID';

      res
        .status(200)
        .json(responseJson)
    });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};