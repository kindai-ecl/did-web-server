<!-- 
<template>
    <div>
      <canvas ref="qrCanvas"></canvas>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, onMounted } from "vue";
  import QRCode from "qrcode";
  
  const props = defineProps({
    text: {
      type: String,
      required: true,
    },
  });
  
  const qrCanvas = ref(null);
  
  // QRコードを生成する関数
  const generateQR = async () => {
    if (props.text) {
      await QRCode.toCanvas(qrCanvas.value, props.text, {
        width: 200, // QRコードのサイズ
      });
    }
  };

  watch (() => props.text, () => {
    generateQR();
  });
  
  </script>
   -->

   <template>
    <div class="qrcode-container">
        <canvas ref="canvas"></canvas>
        <p v-if="!credentialJSON">QRコードを生成するには有効なデータが必要です。</p>
    </div>
</template>

<script setup>
import { onMounted, watch, ref } from 'vue';
import QRCode from 'qrcode';

// Prop to accept credentialJSON
const props = defineProps({
    credentialJSON: {
        type: Object,
        required: false,
    },
});

// Refs
const canvas = ref(null);

// Watch for changes in credentialJSON and generate QR code
watch(
    () => props.credentialJSON,
    async (newVal) => {
        if (newVal && canvas.value) {
            try {
                // Convert JSON to string and generate QR code
                const jsonString = JSON.stringify(newVal);
                await QRCode.toCanvas(canvas.value, jsonString, {
                    width: 200,
                });
            } catch (err) {
                console.error('QRコードの生成に失敗しました:', err);
            }
        }
    },
    { immediate: true } // Watch immediately after mounting
);

onMounted(() => {
    // Initial QR code generation if credentialJSON is available
    if (props.credentialJSON) {
        QRCode.toCanvas(canvas.value, JSON.stringify(props.credentialJSON), {
            width: 200,
        }).catch((err) => console.error('QRコードの生成に失敗しました:', err));
    }
});
</script>

<style scoped>
.qrcode-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
}
canvas {
    border: 1px solid #ddd;
}
</style>
