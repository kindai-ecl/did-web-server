<script setup>
import { ref, watch } from 'vue';
import { createJWT, ES256KSigner, hexToBytes } from 'did-jwt';
import { verifyJWK, DIDDoc } from '@/utils/document';
import { KeyPairs } from '@/utils/keys';

var printStatus = ref("");
var isAvailable = ref(false);
var isClick = ref(false);


const verifyDoc = async () => {
    isClick = true;

    printStatus.value = "🔍 Verifying JWK...\n";
    const isVerified = await verifyJWK();
    printStatus.value = "✅ JWK verified!\n" + isVerified;

};

watch(
    () => [DIDDoc.URL],
    ([url]) => {
        if (url && url.length > 0) {
            isAvailable.value = true; 
        } else {
            isAvailable.value = false;
        }
    },
  { immediate: true }
);
</script>

<template>
    <div v-if="isAvailable" class="getKeys">
        <h2>Step3. Verify your DID document</h2>

        <button type="button" v-bind:disabled="isClick" @click="verifyDoc">Verify</button>
        <pre>{{ printStatus }}</pre>
    </div>
    
</template>