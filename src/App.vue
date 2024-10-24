<template>
    <v-card class="mx-auto" width="auto">
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
                    absolute offset @click="uploadHandler">
                </v-fab>
                <input type="file" ref="upfile" v-on:change="upload($event)" style="display: none;">
            </template>
        </v-toolbar>
        <v-progress-linear color="orange-darken-1" height="5" :model-value="upLoadProgress" striped
            :active="progressActivate"></v-progress-linear>
        <v-list lines="two" subheader>
            <v-list-item v-for="item in fileData" :key="item.name" link @click="downloadHandler($event, item)">
                <template v-slot:prepend>
                    <v-avatar :class="[item.dir ? classDir : classFile]"
                        :icon="item.dir ? iconDir : iconFile"></v-avatar>
                </template>

                <v-list-item-title>{{ item.name }}</v-list-item-title>

                <v-list-item-subtitle>{{ new Date(item.modify) }}<v-chip class="ms-4" size="x-small" color="default"
                        v-if="!item.dir">
                        {{ sizeFitter(item.size) }}
                    </v-chip>
                </v-list-item-subtitle>
            </v-list-item>
        </v-list>
    </v-card>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const sizeKeta = ['B', 'KB', 'MB', 'GB', 'TB']
const sizeFitter = (size) => {
    let keta = 0
    while (size >= 1024) {
        size /= 1024
        keta += 1
    }
    return String(size.toFixed(2)) + sizeKeta[keta];
}

const displayPath = ref([])
const iconDir = 'mdi-folder'
const iconFile = 'mdi-clipboard-text'
const classDir = 'bg-blue text-white'
const classFile = 'bg-grey-lighten-1 text-white'

const sortBy = "name"
const sortRevert = false
const fileMae = false
const fileData = ref([])
let pathList = Array()
const url = import.meta.env.VITE_APP_API_BASE_URL + "/file"

// console.log(import.meta.env.VITE_APP_API_BASE_URL);


const pathParser = (path) => {
    if (path[0] === '/') path = path.substr(1)
    path.trim('/')
    if (path.length === 0)
        pathList = []
    else
        pathList = path.split("/")
    displayPath.value = []
    let totalPath = ""
    for (let p in pathList) {
        if (pathList[p] === "") continue
        path += pathList[p]
        if (path[path.length - 1] !== '/')
            path += '/'
        displayPath.value.push({
            title: pathList[p],
            path: totalPath,
            disabled: false
        })
    }
}

const pwd = () => {
    let totalPath = "/" + pathList.join('/')
    if (totalPath[totalPath.length - 1] != "/")
        totalPath += '/'
    return totalPath
}

const forwardPath = (item) => {
    console.log("forwardPath");
    console.log(item);
}

const backwardPath = (item) => {
    console.log("backwardPath");
    console.log(item);
}

const sortFiles = (items) => {
    items.sort((a, b) => {
        // Sort by dir (true comes before false)
        if (a.dir != b.dir) {
            return fileMae ? a.dir - b.dir : b.dir - a.dir;
        }
        // Sort by name if dir is the same
        return sortRevert ? b[sortBy].localeCompare(a.name) : a[sortBy].localeCompare(b.name);
    })
    return items
}
const setFiles = (files) => {
    fileData.value = sortFiles(files)
}
const setPath = (path) => {
    pathParser(path)
}

const refreshFiles = () => {

    // console.log(url);

    axios({
        url: url,
        method: "GET",
        params: {
            limit: 10,
            page: 1,
            path: pwd()
        }
    })
        .then(response => {
            // console.log(response.data.file);

            setFiles(response.data.file)
            setPath(response.data.path)
        }, error => {
            // console.log('错误', error.data.message)
            alert(error.data.message)
        })
}

const upLoadProgress = ref(0) //定义上传进度
const progressActivate = ref(false)

const upload = (event) => {
    event.preventDefault()

    // console.log("upload")

    const file = event.currentTarget.files[0]

    const formData = new FormData() //声明一个formdata对象，用于存储file文件以及其他需要传递给服务器的参数

    formData.append('path', '/')
    formData.append('overwrite', true)
    formData.append('upfile', file)

    // console.log('formData', formData)

    axios(
        {
            url: url,
            method: 'PUT',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData,
            onUploadProgress: function (progressEvent) { //原生获取上传进度的事件
                if (!progressActivate.value) progressActivate.value = true
                if (progressEvent.lengthComputable) {
                    //属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
                    //如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
                    upLoadProgress.value = progressEvent.loaded / progressEvent.total * 100 //实时获取上传进度
                }
            }
        }).then(res => {
            // console.log(res.data.msg)
            progressActivate.value = false
            alert(res.data.msg)
        }).catch(error => {
            // console.log(error.data.msg)
            alert(error.data.msg)
        })
}

const download = (filePath, title) => {
    // console.log("download");
    // console.log(filePath);

    const a = document.createElement('a');
    a.setAttribute('href', url + "?path=" + filePath);
    a.setAttribute('download', title);
    a.click();
    // console.log(a);

}

const uploadHandler = (event) => {
    // console.log("upload")
    event.currentTarget.nextElementSibling.click()
}

const downloadHandler = (evnet, file) => {

    let filePath = pwd() + file.name
    if (file.dir) {
        // into directory
        pathParser(filePath)
        refreshFiles()
    } else {
        // download
        download(filePath, file.name)
    }
}

refreshFiles()
</script>