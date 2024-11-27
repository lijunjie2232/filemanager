<template>
    <v-list lines="two" subheader>
        <v-list-item v-if="pwd() !== '/'" @click="prevDir">
            <template v-slot:prepend>
                <v-avatar :class="classDir" :icon="iconDir"></v-avatar>
            </template>

            <v-list-item-title>..</v-list-item-title>

            <!-- <v-list-item-subtitle>
                <v-chip class="ms-4" size="x-small" color="default">
                </v-chip>
            </v-list-item-subtitle> -->
        </v-list-item>
        <v-list-item v-for="item in fileData" :key="item.name" link @click="downloadHandler($event, item)"
            @contextmenu="rclick($event, item)">
            <template v-slot:prepend>
                <v-avatar :class="[item.dir ? classDir : classFile]" :icon="item.dir ? iconDir : iconFile"></v-avatar>
            </template>

            <v-list-item-title>{{ item.name }}</v-list-item-title>

            <v-list-item-subtitle>
                {{ new Date(item.modify) }}
                <v-chip class="ms-4" size="x-small" color="default" v-if="!item.dir">
                    {{ sizeFitter(item.size) }}
                </v-chip>
            </v-list-item-subtitle>
        </v-list-item>
    </v-list>

    <!-- <v-overlay v-model="menuForm.showMenu" scrim="false"></v-overlay> -->
    <v-menu class="rcl-menu" :style="{ left: `${menuForm.y}px`, top: `${menuForm.x}px` }" v-model="menuForm.showMenu"
        absolute offset-y>
        <v-list>
            <v-list-item v-for="(item, index) in menuForm.items" :key="index"
                @click="menuOper($event, item, menuForm.file)">
                <template v-slot:prepend>
                    <v-icon :icon="item.icon"></v-icon>
                </template>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script setup lang="ts">
import { reactive, nextTick } from 'vue'
import { sizeFitter } from '../utils/utils'
import { File } from '@/types';
const classDir = 'bg-blue text-white'
const classFile = 'bg-grey-lighten-1 text-white'
const iconDir = 'mdi-folder'
const iconFile = 'mdi-clipboard-text'
// const showMenu = ref(false)
const menuForm = reactive(
    {
        showMenu: false,
        x: 0,
        y: 0,
        items: [
            { title: 'Copy', icon: 'mdi-content-copy' },
            { title: 'Paste', icon: 'mdi-content-paste' },
            { title: 'Delete', icon: 'mdi-delete' },
            { title: 'Cancel', icon: 'mdi-close' },
        ],
        file: {
            name: "",
            modify: 0,
            size: 0,
            dir: false
        }
    }
)

let { pwd, fileData, prevDir } = defineProps(["pwd", "fileData", "prevDir"])

const emit = defineEmits(["pathParser", "refreshFiles", "download"])

const rclick = async (e: any, file: File) => {
    menuForm.file = file
    e.preventDefault()
    console.log(e)
    console.log(typeof (e))
    menuForm.x = e.clientY
    menuForm.y = e.clientX
    // showMenu.value = true
    console.log(menuForm)
    // menuForm.showMenu = true
    await nextTick(
        () => {
            menuForm.showMenu = true
        }
    )

}

const menuOper = (e: any, menuItem: {}, file: File) => {
    console.log(file)
    console.log(e)
    console.log(menuItem)
}

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