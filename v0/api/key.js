// if you can generate keys in the browser, MUST not use this 

const crypto = require("crypto");
const elliptic = require("elliptic");

const express = require("express");
const router = express.Router();

const size = parseInt(process.argv.slice(2)[0]) || 32;
const ec = new elliptic.ec('secp256k1');

function getKeys(){
    const randomString = crypto.randomBytes(size).toString("hex");
    const key = randomString;
    const prv = ec.keyFromPrivate(key, 'hex');
    const pub = prv.getPublic();

    return {
        "private": key,
        "publicKeyJwk": {
            "x": pub.x.toBuffer().toString('base64'),
            "y": pub.y.toBuffer().toString('base64'),
            "kty": 'EC',
            "crv": 'secp256k1',
        }
    }
}

router.get("/", (req, res) => {
    console.log("generate key!");
    key = getKeys();
    res.json(key);
});

module.exports = router;