const diddoc = require("../util/document.js");
const express = require("express");
const router = express.Router();

// read document is not necessary



// send did doc  post->{jwk, controller, id}
router.post("/", (req, res) => {
    req.body;
    diduri = diddoc.create(req.body);
    res.json({ "document-url": diduri });
}); 

module.exports = router; 