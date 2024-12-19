<template>
    <div class="card cursor-pointer hover:shadow-lg transition-shadow" @click="onClick">
      <div class="card-content">
        <div>
          <h2 class="font-semibold">{{ card.last4 }}</h2>
          <p class="text-sm text-gray-500">{{ card.manufacturer }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    card: Object,
  });
  const emit = defineEmits(['click']);
  
  const onClick = () => emit('click', props.card);
  </script>
  
  <style scoped>
  .card {
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    margin: 5%;
  }
  .card-content {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  .icon {
    border-radius: 50%;
    font-size: 1.5rem;
  }
  </style>
  