const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "pug");

app.get("/", (req,res) => {
  res.setHeader("Content-Security-Policy", "default-src 'self';");
  res.render("index", { title: "index" });
});

app.get("/none", (req,res) => {
  res.setHeader("Content-Security-Policy", "default-src 'none';");
  res.render("index", { title: "index" });
});

app.get("/http", (req,res) => {
  res.setHeader("Content-Security-Policy", "default-src http:;");
  res.render("index", { title: "index" });
});

app.get("/https", (req,res) => {
  res.setHeader("Content-Security-Policy", "default-src https:;");
  res.render("index", { title: "index" });
});

app.get("/img", (req,res) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; img-src http://http.cat/200;");
  res.render("index", { title: "index" });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
