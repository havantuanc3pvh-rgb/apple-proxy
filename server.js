const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.use(express.urlencoded({ extended: true }));

// Trang giao diện
app.get("/", (req, res) => {
  res.send(`
    <h2>Drive Proxy</h2>
    <form method="POST" action="/go">
      <input type="text" name="link" placeholder="Dán link Google Drive vào đây" style="width:400px" />
      <button type="submit">Mở</button>
    </form>
  `);
});

// Xử lý link Drive
app.post("/go", async (req, res) => {
  let link = req.body.link;

  if (!link) {
    return res.send("Thiếu link Google Drive");
  }

  // Chuyển link Drive sang dạng xem trực tiếp
  let fileId = link.match(/[-\\w]{25,}/);
  if (!fileId) {
    return res.send("Link không hợp lệ");
  }

  let driveUrl = `https://drive.google.com/uc?id=${fileId[0]}&export=download`;

  res.redirect(driveUrl);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Drive Proxy đang chạy tại cổng", PORT);
});
