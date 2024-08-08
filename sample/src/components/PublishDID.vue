<script setup>
import { ref } from 'vue';
import { writeDoc, postDoc } from '@/utils/document';

var printStatus = ref("");

const publishDocument = async () => {
    const jwk = "your key pair";
    printStatus.value = "✏️ Creating DID Document...";
    const did = await writeDoc(jwk);
    printStatus.value = "📡 Publishing DID Document...";
    const URI = await postDoc(did);
    printStatus.value = "✨ DID Document published! \n" + URI;
};

</script>

<template>
    <div class="getKeys">
        <h2>Step2. Publish your DID document</h2>

        <button type="button" @click="publishDocument">ドキュメントを発行</button>
        <pre>{{ printStatus }}</pre>
    </div>
    
</template>