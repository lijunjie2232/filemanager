<template>
    <v-progress-linear color="orange-darken-1" height="5" :model-value="upLoadProgress" striped
        :active="progressActivate"></v-progress-linear>
</template>

<script setup lang="ts">
let {upLoadProgress, progressActivate} = defineProps(["upLoadProgress", "progressActivate"])
</script>
<style scoped></style>