<script setup>
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'

import GetKeys from '@/components/GetKeys.vue';
import PublishDID from '@/components/PublishDID.vue';
import VerifyDoc from '@/components/VerifyDoc.vue';
import PWABadge from '@/components/PWABadge.vue';
import { document, removeDoc } from '@/utils/document';

// same as beforeRouteLeave option but with no access to `this`
onBeforeRouteLeave((to, from) => {
    if (document.uri) {
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
    <h2 v-show="document.verified"> &#x1F389; Now you available to use your DID &#x1F389;</h2>
    <PWABadge />
</template>

<style scoped>

</style>