const express = require("express");
const app = express();
const path = require("path");
const { exec } = require("child_process");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.post("/build-pdf", (req, res) => {
  const { viewerPath, doceyePath } = req.body;
  exec(
    "npx gulp generic-legacy",
    {
      cwd: viewerPath,
    },
    (error, stdout, stderr) => {
      if (error) {
        console.error(`실행 오류: ${error}`);
        return res.status(500).json({ error: "뷰어 빌드 실패" });
      }
      res.json({ message: "뷰어 빌드 성공", output: stdout });
    }
  );
});

app.listen(5005, () => {
  console.log("Server is running on port 5005");
});
