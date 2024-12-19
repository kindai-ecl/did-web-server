<template>
    <div class="coution">
        本バージョンはVC Schema非対応です。<br>
        スキーマは各Issuerから取得・確認してください。
    </div>

    <h1>Create VC request</h1>
    
    <div class="card flex justify-center">
        <div class="flex flex-col">
            <h3>Select the DID to request with</h3>
            <select id="did-select" v-model="selectedDID">
                <option value="" selected>-- Choose a DID --</option>
                <option v-for="did in dids" :key="did.id" :value="did.uri">
                    {{ did.uri }}
                </option>
            </select>
        </div>
        <h3>VC JSON</h3>
        <p>Enter your username to reset your password.</p>
        <Textarea v-model="value" cols="40" rows="7"/><br>

        <button @click="requestVC">Request</button>
        <GenQRcode :credentialJSON="credential"/>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Textarea from 'primevue/textarea';
import { getAll } from '@/utils/indexedDB';
import GenQRcode from '@/components/GenQRcode.vue';

const value = ref('');
const selectedDID = ref();
const dids = ref([]);
const credential = ref('');

onMounted(async () => {
    dids.value = await getAll()
    console.log(dids.value)
});

const ubf = () =>{ Math.round((new Date()).getTime() / 1000); }

function requestVC() {
    if (!selectedDID.value) {
        console.log(selectedDID.value);
        alert('Please select a DID');
        return;
    }
    if (value.value=="") {
        alert('Please enter a VC JSON');
        return;
    }
    try {
        JSON.parse(value.value);
    } catch (e) {
        alert('Please enter a valid JSON');
        return;
    }
    credential.value = {
        sub: selectedDID.value,
        nbf: ubf(),
        vc: {
            '@context': ['https://www.w3.org/2018/credentials/v1'],
            type: ['VerifiableCredential'],
            credentialSubject: value.value,
        }
    }
    return;
}

</script>

<style scoped>
    .coution {
        background-color: yellow;
        font-size: 0.7rem;
        text-align: center;
    }
    .Textarea{
        width: 80%;
    }
    select{
        width: 80%;
    }
</style>

