<template>
    <v-card class="mx-auto" width="auto">
        <ToolBar :displayPath="displayPath" :upload="upload"></ToolBar>
        <Progress :progressActivate="progressActivate" :upLoadProgress="upLoadProgress"></Progress>
        <FileView :pwd="pwd" :fileData="fileData" :prevDir="prevDir" @pathParser="pathParser"
            @refreshFiles="refreshFiles" @download="download"></FileView>
    </v-card>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import Progress from './pages/Progress.vue';
import { url, sortFiles } from './utils/utils';
import FileView from './pages/FileView.vue';
import ToolBar from './pages/ToolBar.vue';

const displayPath = ref([])

const sortBy = "name"
const sortRevert = false
const fileMae = false
const fileData = ref([])
let pathList = Array()
let historyForward = Array()
let historyBackward = Array()
let maxHistory = 20

const upLoadProgress = ref(0) //定义上传进度
const progressActivate = ref(false)

const historyPush = (path) => {
    while (historyForward.length >= maxHistory) { historyForward.shift() }
    historyForward.push(path)
}

const pathParser = (path) => {
    historyPush(path)
    if (path[0] === '/') path = path.substr(1)
    path.trim()
    if (path.length === 0)
        pathList = []
    else
        pathList = path.split("/")
    displayPath.value = []
    let totalPath = "/"
    let stack = []
    let clrPathList = []

    for (let p = pathList.length - 1; p >= 0; p--) {
        if (pathList[p] === "") continue
        else if (pathList[p] === "..") {
            stack.push(pathList[p])
        }
        else if (pathList[p] === ".") {
            continue
        }
        else {
            if (stack.length > 0) {
                stack.pop()
                continue
            }
            clrPathList.unshift(pathList[p])
            totalPath = '/' + pathList[p] + totalPath

            displayPath.value.unshift({
                title: pathList[p],
                path: totalPath,
                disabled: false
            })
        }
    }
    pathList = clrPathList
    refreshFiles()
}

const pwd = () => {
    let totalPath = "/" + pathList.join('/')
    if (totalPath[totalPath.length - 1] != "/")
        totalPath += '/'
    return totalPath
}

const forwardPath = (item) => {
    if (historyBackward.length == 0) return null
    let history = historyBackward.pop()
    historyForward.push(history)
    return history
}

const backwardPath = () => {
    if (historyForward.length == 0) return null
    let history = historyForward.pop()
    historyBackward.push(history)
    return history
}

const setFiles = (files) => {
    let ffiles = sortFiles(files)
    fileData.value = ffiles
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
            // setPath(response.data.path)
        }, error => {
            // console.log('错误', error.data.message)
            alert(error.data.message)
        })
}

const upload = (event) => {
    event.preventDefault()

    // console.log("upload")

    const file = event.currentTarget.files[0]

    const formData = new FormData() //声明一个formdata对象，用于存储file文件以及其他需要传递给服务器的参数

    formData.append('path', pwd())
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
            refreshFiles()
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

const prevDir = () => {
    if (pwd() === '/')
        return
    else {
        pathParser(pwd() + '..')
    }
}

// refreshFiles()
pathParser("/")
</script>

<style lang="css"></style>