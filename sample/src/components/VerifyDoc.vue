<script setup>
import { ref, watch } from 'vue';
import { createJWT, ES256KSigner, hexToBytes } from 'did-jwt';
import { verifyJWK } from '@/utils/document';
import { KeyPairs } from '@/utils/keys';
import { DIDDoc } from '@/utils/document';

var printStatus = ref("");
var isClick = ref(false);

const key = '8eb63d435de4d634bc5f3df79c361e9233f55c9c2fca097758eefb018c4c61df';
const signer = ES256KSigner(hexToBytes(key))

const verifyDoc = async () => {
    printStatus.value = "✏️ Creating signed JWT...";
    const jwt = await createJWT(
        { aud: 'did:web:skounis.github.io', name: 'Bob Smith' },
        { issuer: 'did:web:skounis.github.io', signer },
        { alg: 'ES256K' }
    );
    printStatus.value = "🔍 Verifying JWK...\n" + jwt;
    const isVerified = await verifyJWK(jwt);
    printStatus.value = "✅ JWK verified!\n" + isVerified;

    isClick = true;
};

watch(
    () => [DIDDoc.URL],
    ([url]) => {
        if (url && url.length > 0) {
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
        <h2>Step3. Verify your DID document</h2>

        <button type="button" v-bind:disabled="isClick" @click="verifyDoc">Verify</button>
        <pre>{{ printStatus }}</pre>
    </div>
    
</template>