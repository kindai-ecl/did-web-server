<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6">My Wallet</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <CardItem
        v-for="card in cards"
        :key="card.id"
        :card="card"
        @click="handleCardClick(card)"
      />
    </div>
    <CardModal v-if="isModalOpen" :card="selectedCard" @close="handleCloseModal" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CardItem from '@/components/CardItem.vue';
import CardModal from '@/components/CardModal.vue';

const cards = [
  { id: 1, last4: 'address', manufacturer: 'did:web:did.lcyou.org:did:user:91fdcf89-2271-4cf9-9764-6383728494a2#owner', expiryDate: '12/24', cardHolder: 'John Doe' },
  { id: 2, last4: 'tell', manufacturer: 'did:web:did.lcyou.org#owner', expiryDate: '06/25', cardHolder: 'lcyou' },
  
];

const selectedCard = ref(null);
const isModalOpen = ref(false);

const handleCardClick = (card) => {
  selectedCard.value = card;
  isModalOpen.value = true;
};

const handleCloseModal = () => {
  isModalOpen.value = false;
  selectedCard.value = null;
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
}
</style>
