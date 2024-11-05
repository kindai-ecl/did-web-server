<script setup>
import { RouterView } from "vue-router";
import "@/utils/indexedDB";
import Navber from "@/components/Navber.vue";
</script>

<template>
  <Navber />
  <router-view v-slot="{Component}">
  </router-view>
  <div class="footer"></div>
</template>

<style scoped>
  .footer{
    background-color: transparent;
    color: black;
    padding: 1rem 0;
    bottom: 0;
    width: 100%;
    height:3rem;
  }
</style>
