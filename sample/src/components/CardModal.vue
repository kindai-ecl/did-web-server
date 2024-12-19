<template>
    <div class="modal-overlay" @click.self="onClose">
      <div class="modal-content">
        <h2 class="modal-title">{{ card.last4 }}</h2>
        <div class="modal-body">
          <p><strong>did uri:</strong> {{ card.manufacturer }}</p>
          <p><strong>Expiry Date:</strong> {{ card.expiryDate }}</p>
          <p><strong>Holder:</strong> {{ card.cardHolder }}</p>
        </div>
        <button>send VPs</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    card: Object,
  });
  const emit = defineEmits(['close']);
  
  const onClose = () => emit('close');
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal-content {
    background: #fff;
    padding: 1.5rem;
    border-radius: 8px;
    width: 75%;
    max-width: 500px;
    position: relative;
  }
  .close-button {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }
  .modal-title {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  .modal-body p {
    margin: 0.5rem 0;
  }
  </style>
  