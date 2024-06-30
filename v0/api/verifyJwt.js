
const express = require("express");
const router = express.Router();




// send {jwk, controller, id}
router.post("/", (req, res) => {
    req.body;
    console.log("jwt");
    res.json({ "test": "test" });
}); 

module.exports = router;