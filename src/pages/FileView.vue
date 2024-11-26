<template>
    <v-list lines="two" subheader>
        <v-list-item v-if="pwd() !== '/'" @click="prevDir">
            <template v-slot:prepend>
                <v-avatar :class="classDir" :icon="iconDir"></v-avatar>
            </template>

            <v-list-item-title>..</v-list-item-title>

            <v-list-item-subtitle>
                <v-chip class="ms-4" size="x-small" color="default">
                </v-chip>
            </v-list-item-subtitle>
        </v-list-item>
        <v-list-item v-for="item in fileData" :key="item.name" link @click="downloadHandler($event, item)">
            <template v-slot:prepend>
                <v-avatar :class="[item.dir ? classDir : classFile]" :icon="item.dir ? iconDir : iconFile"></v-avatar>
            </template>

            <v-list-item-title>{{ item.name }}</v-list-item-title>

            <v-list-item-subtitle>{{ new Date(item.modify) }}<v-chip class="ms-4" size="x-small" color="default"
                    v-if="!item.dir">
                    {{ sizeFitter(item.size) }}
                </v-chip>
            </v-list-item-subtitle>
        </v-list-item>
    </v-list>
</template>

<script setup lang="ts">
import { sizeFitter } from '../utils/utils'
import { File } from '@/types';
const classDir = 'bg-blue text-white'
const classFile = 'bg-grey-lighten-1 text-white'
const iconDir = 'mdi-folder'
const iconFile = 'mdi-clipboard-text'

let { pwd, fileData, prevDir } = defineProps(["pwd", "fileData", "prevDir"])

const emit = defineEmits(["pathParser", "refreshFiles", "download"])

const downloadHandler = (evnet: Event, file: File) => {

    console.log(file)

    let filePath = pwd() + file.name
    if (file.dir) {
        // into directory
        emit("pathParser", filePath)
        // emit("refreshFiles")
    } else {
        // download
        emit("download", filePath, file.name)
    }
}

</script>
<style scoped></style>