
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const dirPath = path.join(process.env.SERVICE_DIR_PATH);
const servicePath = process.env.SERVICE_URI ;
const content = ["https://www.w3.org/ns/did/v1","https://w3id.org/security/suites/jws-2020/v1"]

function validateDoc(didDoc){
    if(!didDoc.id){
        return false;
    }
    return true;
}

function generateName() {
    // username をランダムに生成する。
    // サービスが巨大になったりユーザーのアクセスを考えると非推奨
    return encodeURIComponent(crypto.randomBytes(16).toString('base64'));
}

function create(reqBody){
    // generate did document id
    // path-abempty is used to indicate the location of the User's URL
    // ex) did:web:(host)/user/(random byte)
    // query and fragment are not available this version.
    const username = generateName();
    const userpath = path.join( "/user", username );

    const id = process.env.DID_HOST_URL + userpath + "#owner"

    // create verification method
    // pk = JSON.stringify(reqBody.publicKeyJwk);
    // controller = JSON.stringify(reqBody.controller);
    req = JSON.parse(JSON.stringify(reqBody));
    pk = req.publicKeyJwk;
    controller = req.controller;
    console.log(req);
    console.log(pk);
    if ( pk == null ) {
        console.error( "public key is not defined" );
        return "";
    }

    // when controller is not defind, fill did document id
    if ( controller == "" || controller == null ) { 
        controller = process.env.DID_HOST_URL + userpath + "#owner"
    }

    // first verification method is your own verification material
    const verification = {
        id: id,
        type: "JsonWebKey2020",
        controller: id,
        publicKeyJwk: pk,
    }
    
    const didDoc = {
        "@content": content,
        id: id,
        verificationMethod: [verification,],
        authentication:[id,],
        assertionMethod:[id,],
    }

    fs.mkdirSync(path.join( dirPath, userpath ), { recursive: true }, (err) => {
        if (err) {
          console.error('Error creating directory:', err);
          return ""
        }
    });
    fs.writeFile(path.join( dirPath, userpath, "did.json" ), JSON.stringify(didDoc), (err) => {
        if (err) {
          console.error('Error writing file:', err);
          return ""
        }
    });

    return path.join( servicePath, "user", username, "did.json");
}

exports.create = create;