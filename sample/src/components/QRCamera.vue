<template>
    <div>
      <p>
        <select v-model="selectedConstraints">
          <option
            v-for="option in constraintOptions"
            :key="option.label"
            :value="option.constraints"
          >
            {{ option.label }}
          </option>
        </select>
      </p>
  
      <p class="error">{{ error }}</p>
  
      <div>
        <qrcode-stream
          :constraints="selectedConstraints"
          :track="paintOutline"
          @error="onError"
          @detect="onDetect"
          @camera-on="onCameraReady"
        />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  import { QrcodeStream } from 'vue-qrcode-reader'
  
  /*** detection handling ***/
  
  const result = ref('')
  
  function onDetect(detectedCodes) {
    console.log(detectedCodes)
    result.value = JSON.stringify(detectedCodes.map((code) => code.rawValue))
    console.log(JSON.parse(result.value))
    //modalだす，Verifyする，署名する，送り返す
    // JWTで帰ってくるのはVCのみ？JSON-LDでくるのはPayloadのみ？
  }
  
  /*** select camera ***/
  
  const selectedConstraints = ref({ facingMode: 'environment' })
  const defaultConstraintOptions = [
    { label: 'rear camera', constraints: { facingMode: 'environment' } },
    { label: 'front camera', constraints: { facingMode: 'user' } }
  ]
  const constraintOptions = ref(defaultConstraintOptions)
  
  async function onCameraReady() {
    // NOTE: on iOS we can't invoke `enumerateDevices` before the user has given
    // camera access permission. `QrcodeStream` internally takes care of
    // requesting the permissions. The `camera-on` event should guarantee that this
    // has happened.
    const devices = await navigator.mediaDevices.enumerateDevices()
    const videoDevices = devices.filter(({ kind }) => kind === 'videoinput')
  
    constraintOptions.value = [
      ...defaultConstraintOptions,
      ...videoDevices.map(({ deviceId, label }) => ({
        label: `${label}`,
        constraints: { deviceId }
      }))
    ]
  
    error.value = ''
  }
  
  /*** track functons ***/
  
  function paintOutline(detectedCodes, ctx) {
    for (const detectedCode of detectedCodes) {
      const [firstPoint, ...otherPoints] = detectedCode.cornerPoints
  
      ctx.strokeStyle = 'red'
  
      ctx.beginPath()
      ctx.moveTo(firstPoint.x, firstPoint.y)
      for (const { x, y } of otherPoints) {
        ctx.lineTo(x, y)
      }
      ctx.lineTo(firstPoint.x, firstPoint.y)
      ctx.closePath()
      ctx.stroke()
    }
  }
  
  /*** barcode formats ***/
  
  // const barcodeFormats = ref({
  //   aztec: false,
  //   code_128: false,
  //   code_39: false,
  //   code_93: false,
  //   codabar: false,
  //   databar: false,
  //   databar_expanded: false,
  //   data_matrix: false,
  //   dx_film_edge: false,
  //   ean_13: false,
  //   ean_8: false,
  //   itf: false,
  //   maxi_code: false,
  //   micro_qr_code: false,
  //   pdf417: false,
  //   qr_code: true,
  //   rm_qr_code: false,
  //   upc_a: false,
  //   upc_e: false,
  //   linear_codes: false,
  //   matrix_codes: false
  // })
  // const selectedBarcodeFormats = computed(() => {
  //   return Object.keys(barcodeFormats.value).filter((format) => barcodeFormats.value[format])
  // })
  
  /*** error handling ***/
  
  const error = ref('')
  
  function onError(err) {
    error.value = `[${err.name}]: `
  
    if (err.name === 'NotAllowedError') {
      error.value += 'you need to grant camera access permission'
    } else if (err.name === 'NotFoundError') {
      error.value += 'no camera on this device'
    } else if (err.name === 'NotSupportedError') {
      error.value += 'secure context required (HTTPS, localhost)'
    } else if (err.name === 'NotReadableError') {
      error.value += 'is the camera already in use?'
    } else if (err.name === 'OverconstrainedError') {
      error.value += 'installed cameras are not suitable'
    } else if (err.name === 'StreamApiNotSupportedError') {
      error.value += 'Stream API is not supported in this browser'
    } else if (err.name === 'InsecureContextError') {
      error.value +=
        'Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.'
    } else {
      error.value += err.message
    }
  }
  </script>
  
  <style scoped>
  .select{
    width: 300px;
  }
  .error {
    font-weight: bold;
    color: red;
  }

  .qrcode-stream{
    width :100%;
    height:1/4;
  }
  </style>