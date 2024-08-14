<script setup>
import { ref, watch } from 'vue';
import { writeDoc } from '@/utils/document';
import { KeyPairs } from '@/utils/keys';

var printStatus = ref("");
var isClick = ref(false);


const publishDocument = async () => {
    isClick.value = true; 
    printStatus.value = "📡 Publishing DID Document...";

    try {
        const jwk = JSON.stringify(KeyPairs.publicKeyJwk, null, 2);
        const did = await writeDoc(jwk);
        printStatus.value = "✨ DID Document published! \n" + did;
    } catch (error) {
        printStatus.value = "❌ Failed to publish DID Document.";
        isClick.value = false;
    }
};

watch(
    () => [KeyPairs.privateKey, KeyPairs.publicKeyJwk],
    ([newPrivateKey, newPublicKeyJwk]) => {
        if (newPrivateKey && Object.keys(newPublicKeyJwk).length > 0) {
            isClick.value = false; 
        } else {
            isClick.value = true;
        }
    },
  { immediate: true }
);

</script>

<template>
    <div class="getKeys">
        <h2>Step2. Publish your DID document</h2>

        <button type="button" v-bind:disabled="isClick"  @click="publishDocument">Publish</button>
        <pre>{{ printStatus }}</pre>
    </div>
    
</template>