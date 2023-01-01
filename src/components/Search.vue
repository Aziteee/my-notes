<script setup>
import Icon from './Icon.vue'

const { placeholder, modelValue } = defineProps(['placeholder', 'modelValue'])

// 这里需要手动绑定一下v-model
defineEmits(['update:modelValue'])
</script>

<template>
    <div class="search-bar">
        <input class="input-search" type="search" :placeholder="placeholder" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
        <Icon class="icon-search" name="search" color="#606266"></Icon>
    </div>
</template>

<style scoped>
.search-bar {
    position: relative;
}

.input-search {
    width: 100%;
    height: 40px;
    outline: none;
    border: 1px solid #dcdfe6;
    border-radius: 18px;
    color: #606266;
    background-color: transparent;

    /* 输入框内文字与外框距离 */
    padding-left: 40px;
    padding-right: 10px;
    padding-top: 4px;

    cursor: pointer;
    transition: 0.1s;
}

.input-search:focus {
    border: 1px solid rgb(255, 192, 1);
}

.icon-search {
    position: absolute;
    width: 20px;
    height: 20px;
    left: 15px;
    top: calc(50% - 10px)
}
</style>