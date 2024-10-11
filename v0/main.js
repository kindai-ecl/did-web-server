const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.static("static"));
app.use(cors());

app.use("/did/api/keys", require("./did/api/key.js"));
app.use("/did/api/did", require("./did/api/document.js"));
app.use("/did/api/testdid", require("./did/api/testdid.js"));

app.listen(8080, (err) => {
    if (err) {
      console.log("ERROR");
    } else {
      console.log(`Start server.`);
    }
  });