const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// BASIC AUTH
const USERNAME = "Hà Văn Tuấn";
const PASSWORD = "Tuan@12345";

app.use((req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Basic ")) {
    res.set("WWW-Authenticate", "Basic");
    return res.status(401).send("Authentication required");
  }

  const base64Credentials = auth.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString("utf8");
  const [user, pass] = credentials.split(":");

  if (user !== USERNAME || pass !== PASSWORD) {
    return res.status(403).send("Access denied");
  }

  next();
});

// PROXY APPLE
app.use("/", createProxyMiddleware({
  target: "https://www.apple.com",
  changeOrigin: true,
  secure: true
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Apple proxy running");
});
