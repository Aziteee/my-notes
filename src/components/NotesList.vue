<script setup>
import Icon from './Icon.vue'

const { data, clicked } = defineProps(['data', 'clicked'])
</script>

<template>
    <div class="container">
        <div class="item" v-for="item, index in data" @click="$emit('selected', $event, index)">
            <div class="title">{{ item.title }}</div>
            <p class="content">{{ item.content }}</p>
            <Icon class="delete-icon" name="delete" color="black" selectedColor="#cc0000"></Icon>
        </div>
    </div>
</template>

<style scoped>
.item {
    position: relative;
    height: 70px;
    margin: 15px 15px;
    background-color: white;
    border-radius: 10px;
    overflow: hidden;
    transition: 0.1s;
}

.item:hover {
    background-color: #faedc7;
}

/* 设定列表第一项与上方距离 */
.item:first-child {
    margin-top: 0px;
}

/* 设定列表最后项与下方距离 */
.item:last-child {
    margin-bottom: 60px;
}

.title {
    margin-top: 10px;
    margin-left: 15px;
    margin-right: 50px;

    font-size: 18px;
    font-weight: 600;

    display: block;
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.content {
    margin-top: 6px;
    margin-left: 15px;
    margin-right: 50px;
}
.title, .content {
    display: block;
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.delete-icon {
    position: absolute;
    right: 15px;
    top: calc(50% - 11px);
    width: 22px;
    height: 22px;
    user-select: none;
}
</style>