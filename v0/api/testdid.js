// test did document 
const test = require("../util/testdid.js");
const express = require("express");
const router = express.Router();

// read document is not necessary



// send did doc  post->{jwk, controller, id}
router.post("/", (req, res) => {
    if(test.testDID(req.body.jwt)){
        res.json({ "verified": true });
    }
    else{
        res.json({ "verified": false });
    }
}); 

module.exports = router; 