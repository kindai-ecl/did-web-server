<script setup>
import { ref, watch } from 'vue';
import { document, writeDoc } from '@/utils/document';
import { KeyPairs } from '@/utils/keys';

var printStatus = ref("");
var isAvailable = ref(false);
var isClick = ref(false);


const publishDocument = async () => {
    isClick.value = true; 
    printStatus.value = "📡 Publishing DID Document...";
    const jwk = KeyPairs.publicKeyJwk;

    try {
        const did = await writeDoc(jwk);
        if ( did["document-url"] ) {
            document.location = did["document-url"];
            document.uri = did["uri"];
            printStatus.value = "✨ DID Document published! \n" + document.location;
        } else { 
            printStatus.value = "⚠ Failed to publish DID Document.\n" + JSON.stringify(did);
            isClick.value = false;
        }
    } catch (error) {
        printStatus.value = "❌ Failed to publish DID Document.";
        isClick.value = false;
    }
};

watch(
    () => [KeyPairs.privateKey, KeyPairs.publicKeyJwk],
    ([newPrivateKey, newPublicKeyJwk]) => {
        if (newPrivateKey && Object.keys(newPublicKeyJwk).length > 0) {
            isAvailable.value = true; 
        } else {
            isAvailable.value = false;
        }
    },
    { immediate: true }
);

</script>

<template>
    <div class="getKeys" v-if="isAvailable">
        <h2>Step2. Publish your DID document</h2>

        <button type="button" v-bind:disabled="isClick"  @click="publishDocument">Publish</button>
        <pre>{{ printStatus }}</pre>
    </div>
    
</template>