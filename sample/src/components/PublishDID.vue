<script setup>
import { ref, watch } from 'vue';
import { didDocument, writeDoc } from '@/utils/document';
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
        if ( did["location"] ) {
            didDocument.location = did["location"];
            didDocument.uri = did["uri"];
            printStatus.value = "✨ DID Document published!";
        } else { 
            printStatus.value = "⚠ Failed to publish DID Document.\n";
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
    <div class="getKeys" v-if="isAvailable || didDocument.verified">
        <h2 v-if="isAvailable && !isClick">Step2. Publish your DID document</h2>
        <h2 v-else style="color:darkgray">Step2. Done</h2>

        <button type="button" v-bind:disabled="isClick"  @click="publishDocument">Publish</button>
        <pre>{{ printStatus }}</pre>
    </div>
    
</template>