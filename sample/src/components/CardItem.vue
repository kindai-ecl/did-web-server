<template>
    <div class="card cursor-pointer hover:shadow-lg transition-shadow" @click="onClick">
      <div class="card-content flex items-center p-6">
        <div class="icon w-8 h-8 mr-4 bg-gray-300 flex items-center justify-center">💳</div>
        <div>
          <p class="font-semibold">{{ card.last4 }}</p>
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
  }
  .card-content {
    display: flex;
    align-items: center;
  }
  .icon {
    border-radius: 50%;
    font-size: 1.5rem;
  }
  </style>
  