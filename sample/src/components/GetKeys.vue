<script setup>
import { ref } from 'vue';
import getKeys from '@/utils/keys';

var printKeys = ref("empty key");

const initKeys = async () => {
  const key = await getKeys();
  printKeys.value = JSON.stringify(key, null, 2);
};

</script>

<template>
    <h1>鍵を生成</h1>
    
    <div class="getKeys">
        <button type="button" @click="initKeys">鍵を生成</button>
        <pre>{{ printKeys }}</pre>
    </div>
</template>