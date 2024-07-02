
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const dirPath = path.join(process.env.SERVICE_DIR_PATH);
const servicePath = process.env.SERVICE_URI ;

function validateDoc(didDoc){
    if(!didDoc.id){
        return false;
    }
    return true;
}

function generateUsername() {
    // username をランダムに生成する。
    // サービスが巨大になったりユーザーのアクセスを考えると非推奨
    return encodeURIComponent(crypto.randomBytes(16).toString('base64'));
}

function create(didDoc){
    const username = generateUsername();
    const userpath = path.join(dirPath, "user", username);
    const filePath = path.join(userpath, "did.json");

    if(!validateDoc(didDoc)){
        return "";
    }

    fs.mkdirSync(userpath, { recursive: true }, (err) => {
        if (err) {
          console.error('Error creating directory:', err);
          return ""
        }
    });
    fs.writeFile(filePath, JSON.stringify(didDoc, null, 2), (err) => {
        if (err) {
          console.error('Error writing file:', err);
          return ""
        }
    });
    return path.join(servicePath, "user", username, "did.json");
}

exports.create = create;