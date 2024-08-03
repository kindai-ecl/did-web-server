<script setup>
import { ref } from 'vue';
// import getKeys from '@/utils/keys';

var keys = ref("empty key");

const getKeys = async () => {
  const keys = await useFetch(
    '/api/v0/api/keys'
    , {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  ).then( res => {
    console.log(res);
    return res.json();
  }).catch( err => {
    console.log(err);
    return { msg: 'error occured' };
  });
  return keys;
};

</script>

<template>
    <h1>鍵を生成</h1>
    
    <div class="getKeys">
        <button type="button" @click="getKeys">鍵を生成</button>
        <pre>{{ keys }}</pre>
    </div>
</template>