// test did document 
const test = require("../util/testdid.js");
const express = require("express");
const router = express.Router();

// read document is not necessary



// send did doc  post->{jwk, controller, id}
router.post("/", (req, res) => {
    if(test.testDID(req.body)){
        res.status(200).json({ "verified": true });
        return;
    } else {
        res.status(500).json({ "verified": false });
        return;
    }
}); 

module.exports = router; 