const diddoc = require("../util/document.js");
const express = require("express");
const router = express.Router();

// did method https://www.w3.org/TR/did-core/#method-operations
// Read method by going directly to the URL of the DIDDocument

// send did doc  post->{jwk, controller, Auth option}
router.post("/", (req, res) => {
    diduri = diddoc.create(req.body);
    if ( diduri == "" ) {
        return res.status(500).json({"error": "cannot generated"})
    }
    return res.status(200).json(diduri);
}); 

router.get("/user/:id", (req, res) => {
    diddoc.read(req.params.id, (err, data) => {
        if (err) {
            return res.status(404).json({"error": "cannot read"})
        }
        return res.status(200).json(data);
    });
});

// didcore update method 
router.put("/", (req, res) => {

});

module.exports = router; 