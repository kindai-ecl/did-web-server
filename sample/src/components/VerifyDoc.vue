<script setup>
import { ref } from 'vue';
import { verifyJWK } from '@/utils/document';

var printStatus = ref("");

const verifyDoc = async () => {

    printStatus.value = "✏️ Creating signed JWK...";

    printStatus.value = "🔍 Verifying JWK...";
    await verifyJWK("jwk");
    printStatus.value = "✅ JWK verified!";
};

</script>

<template>
    <div class="getKeys">
        <h2>Step3. Verify your DID document</h2>

        <button type="button" @click="verifyDoc">ドキュメントを発行</button>
        <pre>{{ printStatus }}</pre>
    </div>
    
</template>