// import { test } from "../did-doc/document";
const diddoc = require("../did-doc/document");
const express = require("express");
const router = express.Router();

// read document is not necessary



// send did doc  post->{jwk, controller, id}
router.post("/", (req, res) => {
    req.body;
    did = diddoc.create(req.body);
    res.json({ "document-url": did });
}); 

module.exports = router; 