import express, { Request, Response } from "express";
import dotenv from "dotenv";
const app = express();
dotenv.config();

const port = 3000;
const apiUrl = process.env.API_URL;
app.use(express.static("public"));

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

app.listen(port, () => {
  console.log("Server Started Listening : ", port);
});
