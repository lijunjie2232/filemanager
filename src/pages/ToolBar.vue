<template>
    <v-toolbar color="light-blue" extended light>
        <!-- <v-app-bar-nav-icon color="grey-darken-4"></v-app-bar-nav-icon> -->

        <v-toolbar-title>File Manager</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn color="grey-darken-4" icon="mdi-magnify"></v-btn>

        <template v-slot:extension>
            <v-icon class="ms-2 me-2" icon="mdi-home"></v-icon>/
            <v-breadcrumbs :items="displayPath">
                <template v-v-slot:divider>
                    <v-icon icon="mdi-chevron-right"></v-icon>
                </template>
            </v-breadcrumbs>
            <v-fab class="me-4" color="orange-darken-2" icon="mdi-cloud-upload" location="bottom right" size="40"
                absolute offset @click="uploadHandler($event)">
            </v-fab>
            <input type="file" ref="upfile" v-on:change="upload($event)" style="display: none;">
        </template>
    </v-toolbar>
</template>

<script setup lang="ts">

let {displayPath, upload} = defineProps(["displayPath", "upload"])

const uploadHandler = (event:any) => {
    // console.log("upload")
    event.currentTarget.nextElementSibling.click()
}



</script>
<style scoped></style>