<script setup>
import { ref } from 'vue';
import { KeyPairs, getKeys } from '@/utils/keys';

var printKeys = ref("");
var isClick = false;

const initKeys = async () => {
  isClick = true;

  const key = await getKeys();
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
        <h2>Step1. Get your key pair</h2>

        <button type="button" v-bind:disabled="isClick" @click="initKeys">Generate</button>
        <pre>{{ printKeys }}</pre>
    </div>
</template>