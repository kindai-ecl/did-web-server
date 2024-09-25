<script setup>
import { ref } from 'vue';
import { KeyPairs, getKeys } from '@/utils/keys';
import crypto from 'crypto';
import elliptic from 'elliptic';

var printKeys = ref("ee");
var isClick = false;

const initKeys = async () => {
  isClick = true;

  const randomString = crypto.randomBytes(32).toString("hex");
  const pk = randomString;

  const ec = new elliptic.ec('secp256k1');
  const prv = ec.keyFromPrivate(pk, 'hex');
  const pub = prv.getPublic();

  const key = {
        "private": pk,
        "publicKeyJwk": {
            "x": pub.x.toBuffer().toString('base64'),
            "y": pub.y.toBuffer().toString('base64'),
            "kty": 'EC',
            "crv": 'secp256k1',
        }
    }


  if (key != null) {
    const keyJson = JSON.stringify(key);
    const status = KeyPairs.setkey(keyJson);
    if (status) {
      console.log(JSON.stringify(KeyPairs.publicKeyJwk));
      printKeys.value = "✨ Key successfully set!";
      return;
    } else {
      console.error(JSON.stringify(key, null, 2));
      printKeys.value = "⚠️ Failed to set key.";
    }
  } else {
    console.error("Failed to fetch keys.");
    printKeys.value = "💥 Failed to fetch keys";
  }

  isClick = false;
};

</script>

<template>
    <div class="getKeys">
        <h2 v-if="!isClick">Step1. Get your key pair</h2>
        <h2 v-else style="color:darkgray">Step1. Done</h2>

        <button type="button" v-bind:disabled="isClick" @click="initKeys">Generate</button>
        <pre>{{ printKeys }}</pre>
    </div>
</template>