<script setup>
import { ref, watch } from 'vue';
import { verifyJWK, didDocument } from '@/utils/document';
import { KeyPairs } from '@/utils/keys';
import { addDid, addKey } from '../utils/indexedDB';

var printStatus = ref("");
var isAvailable = ref(false);
var isClick = ref(false);

const verifyDoc = async () => {
    isClick = true;

    printStatus.value = "🔍 Verifying JWK...\n";
    const isVerified = await verifyJWK( didDocument.uri );
    addDid(didDocument.location, didDocument.uri);
    addKey(KeyPairs.privateKey);
    printStatus.value = "✅ JWK verified!\n" + JSON.stringify(isVerified);
    KeyPairs.init();
    didDocument.init();
    didDocument.verified = true;
};

watch(
    () => [didDocument.location],
    ([uri]) => {
        if (uri && uri.length > 0) {
            isAvailable.value = true; 
        } else {
            isAvailable.value = false;
        }
    },
  { immediate: true }
);
</script>

<template>
    <div v-if="isAvailable || didDocument.verified" class="getKeys">
        <h2 v-if="isAvailable && !isClick">Step3. Verify your DID document</h2>
        <h2 v-else style="color:darkgray">Step3. Done</h2>

        <button type="button" v-bind:disabled="isClick" @click="verifyDoc">Verify</button>
        <pre>{{ printStatus }}</pre>
    </div>
    
</template>