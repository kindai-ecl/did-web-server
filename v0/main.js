const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.static("static"));
app.use(cors());

const routes = [
  { path: "/did/api/healthez", module: "./did/api/healthez.js" },
  { path: "/did/api/did", module: "./did/api/document.js" },
  { path: "/did/api/testdid", module: "./did/api/testdid.js" },
  { path: "/did/user", module: "./did/api/read.js" },
];

routes.forEach(route => {
  app.use(route.path, require(route.module));
});

app.listen(8080, (err) => {
    if (err) {
      console.log("ERROR");
    } else {
      console.log(`Start server.`);
    }
  });