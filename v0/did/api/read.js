const diddoc = require("../util/document.js");
const express = require("express");
const router = express.Router();

router.get("/:id", (req, res) => {
    diddoc.read(req.params.id, (err, data) => {
        if (err) {
            return res.status(404).json({"error": "cannot read"})
        }
        return res.status(200).json(data);
    });
});

module.exports = router; 