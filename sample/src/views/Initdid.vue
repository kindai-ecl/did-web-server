<script setup>
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'

import GetKeys from '@/components/GetKeys.vue';
import PublishDID from '@/components/PublishDID.vue';
import VerifyDoc from '@/components/VerifyDoc.vue';
import { didDocument, removeDoc } from '@/utils/document';
import Stepper from 'primevue/stepper';
import StepList from 'primevue/steplist';
import StepPanels from 'primevue/steppanels';
import StepItem from 'primevue/stepitem';
import Step from 'primevue/step';
import StepPanel from 'primevue/steppanel';

// same as beforeRouteLeave option but with no access to `this`
onBeforeRouteLeave((to, from) => {
    if (didDocument.uri) {
        const answer = window.confirm(
            'Do you really want to leave? you have unsaved changes!'
        )
        // cancel the navigation and stay on the same page
        if (!answer) return false
        removeDoc()
    }
})
</script>

<template>
    <h1>Create your DID &#x1FAAA;</h1>
    <GetKeys />
    <PublishDID />
    <VerifyDoc />
    <h2 v-show="didDocument.verified"> &#x1F389; Now available &#x1F389;</h2>
<!-- 
    <div class="card">
        <Stepper value="1">
            <StepItem value="1">
                <Step>Header I</Step>
                <StepPanel v-slot="{ activateCallback }">
                    <GetKeys />
                    <div class="py-6">
                        <Button label="Next" @click="activateCallback('2')" />
                    </div>
                </StepPanel>
            </StepItem>
            <StepItem value="2">
                <Step>Header II</Step>
                <StepPanel v-slot="{ activateCallback }">
                    <PublishDID />
                    <div class="flex py-6 gap-2">
                        <Button label="Back" severity="secondary" @click="activateCallback('1')" />
                        <Button label="Next" @click="activateCallback('3')" />
                    </div>
                </StepPanel>
            </StepItem>
            <StepItem value="3">
                <Step>Header III</Step>
                <StepPanel v-slot="{ activateCallback }">
                    <VerifyDoc />
                    <div class="py-6">
                        <Button label="Back" severity="secondary" @click="activateCallback('2')" />
                    </div>
                </StepPanel>
            </StepItem>
        </Stepper>
    </div> -->
</template>

<style scoped>

</style>