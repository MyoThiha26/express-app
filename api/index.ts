import express, { Request, Response } from "express";
import dotenv from "dotenv";
import fs from "fs";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";
import formidable from "formidable";

const v4options = {
  random: [
    0x10, 0x91, 0x56, 0xbe, 0xc4, 0xfb, 0xc1, 0xea, 0x71, 0xb4, 0xef, 0xe1,
    0x67, 0x1c, 0x58, 0x36,
  ],
};
const form = formidable({ multiples: true });
const app = express();
dotenv.config();

const port = 3000;
const apiUrl = process.env.API_URL;
app.use(express.static("public"));
app.use(bodyParser.json());
const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>API</title>
  </head>
  <body>
    <h1>Hello API</h1>
    <script type="text/javascript">
        localStorage.setItem('apiUrl', '${apiUrl}');
        window.location.href = "/";
    </script>
  </body>
</html>
`;

app.get("/api", (req: Request, res: Response) => {
  res.send(html);
});

app.get("/api/users", (req: Request, res: Response) => {
  res.send({ name: "Myo Thiha", password: "jfoafo" });
});

app.post("/api/uploadFile", (req: Request, res: Response) => {
  const uniqueID = uuidv4(v4options);
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.writeHead(err.httpCode || 400, { "Content-Type": "text/plain" });
      return res.end(String(err));
    }
    res.send(JSON.stringify({ fields, files }, null, 2));
  });
  // const fileType = req.header("Content-Type");
  // const fileExtension = fileType.split("/")[1];
  // const writeStream = fs.createWriteStream(`./${uniqueID}.jpg`);
  // req.pipe(writeStream);
  // res.end();
});

app.listen(port, () => {
  console.log("Server Started Listening : ", port);
});
