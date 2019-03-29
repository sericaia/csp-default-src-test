const express = require("express");
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json({
  type: ['application/json', 'application/csp-report', 'application/reports+json']
}));
app.use(bodyParser.urlencoded());

app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.setHeader("Content-Security-Policy", "default-src 'self';");
  res.render("index", { title: "index" });
});

app.get("/none", (req, res) => {
  res.setHeader("Content-Security-Policy", "default-src 'none';");
  res.render("index", { title: "index" });
});

app.get("/http", (req, res) => {
  res.setHeader("Content-Security-Policy", "default-src http:;");
  res.render("index", { title: "index" });
});

app.get("/https", (req, res) => {
  res.setHeader("Content-Security-Policy", "default-src https:;");
  res.render("index", { title: "index" });
});

app.get("/img", (req, res) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; img-src https://http.cat/200;");
  res.render("index", { title: "index" });
});

app.get("/wildcard", (req, res) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; frame-src https://*.mozilla.org;");
  res.render("wild", { title: "wild" });
});

app.get("/all", (req, res) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; img-src https://http.cat/200 https://some-other-image.jpg; frame-src https://some-ad.com; script-src https://some-external-script.js;");
  res.render("index", { title: "index" });
});

app.get("/content-report-uri", (req, res) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; frame-src https://*.mozilla.org; report-uri /report");
  res.render("wild", { title: "wild" });
});

app.get("/content-report-to", (req, res) => {

  const reportTo = [
    {
      "endpoints": [
        {
          "url": 'http://localhost:3000/report'
        }
      ],
      "include_subdomains":true,
      "group": 'csp-endpoint',
      "max_age": 31536000
    }
  ];
  
  // res.set('Content-Security-Policy-Report-Only',
  //     `default-src 'self'; report-to csp-endpoint`);
  res.setHeader("Content-Security-Policy", 
    "default-src 'self'; frame-src https://*.mozilla.org; report-to csp-endpoint;");
  res.set("Report-to", reportTo.map(JSON.stringify).join(', '));

  res.render("wild", { title: "wild" });
});


app.post("/report", (req, res) => {
  console.log(req.body)
  res.send("CSP fail: Report received");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
