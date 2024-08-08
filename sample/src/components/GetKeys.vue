<script setup>
import { ref } from 'vue';
import getKeys from '@/utils/keys';

var printKeys = ref("");

const initKeys = async () => {
  const key = await getKeys();
  printKeys.value = JSON.stringify(key, null, 2);
};

</script>

<template>
    <div class="getKeys">
        <h2>Step1. Get your key pair</h2>

        <button type="button" @click="initKeys">鍵を生成</button>
        <pre>{{ printKeys }}</pre>
    </div>
</template>