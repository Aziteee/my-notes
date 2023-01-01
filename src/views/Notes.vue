<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

import Search from '../components/Search.vue'
import NotesList from '../components/NotesList.vue'
import RoundButton from '../components/RoundButton.vue'

const router = useRouter()

const notesData = ref([])

var completeData = []
async function refresh() {
    completeData = (await $data.getNotes()).map((item, index) => Object({ ...item, index })) // 给每条数据加上下标索引
    notesData.value = JSON.parse(JSON.stringify(completeData)) // 这里需要进行深拷贝
}

onMounted(refresh)

const selected = (event, index) => {
    index = notesData.value[index].index
    if (event.target.tagName == 'path' || event.target.tagName == 'svg') { // 判断点击目标是否为删除按钮
        if (confirm("确认删除？")) {
            $data.deleteOne(index)
            refresh() // 直接刷新页面会导致闪屏，所以得手动刷新数据
        }
    } else {
        router.push('/editor/' + index)
    }
}

const newNote = () => {
    router.push('/editor/-1')
}

const keyword = ref('')

// 监听搜索框输入，搜索便签
watch(keyword, async function() {
    notesData.value = []
    if (keyword.value == '') {
        notesData.value = JSON.parse(JSON.stringify(completeData))
        return;
    }
    for (let index in completeData) {
        if (completeData[index].title.includes(keyword.value)) {
            notesData.value.push(completeData[index])
        }
    }
})
</script>

<template>
    <div class="container">
        <div class="placeholder"></div>
        <NotesList class="notes-list" :data="notesData" @selected="selected"></NotesList>
        <div class="mask"></div>
        <Search class="search-bar" placeholder="搜索..." v-model="keyword"></Search>
        <RoundButton class="new-note-button" icon="add" color="#fcc000" selectedColor="#d4a827" iconColor="white" size="50" @click="newNote"></RoundButton>
    </div>
</template>

<style scoped>
.search-bar {
    left: 220px;
    right: 20px;
    top: 50px;
    position: absolute;
}
.mask {
    position: absolute;
    left: 200px;
    right: 0px;
    top: 40px;
    height: 65px;
    background-color: #f9f9f9;
}
.placeholder {
    margin-top: 0px;
    height: 65px;
}

.new-note-button {
    position: absolute;
    right: 25px;
    bottom: 25px;
}
</style>