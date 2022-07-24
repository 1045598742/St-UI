<template>
	<st-tag v-for="tag in dynamicTags" :key="tag" @click="click" @a="a">{{
		tag
	}}</st-tag>
	<st-button @click="add">添加</st-button>
	<st-button @click="js">减少</st-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const dynamicTags = ref(['Tag 1', 'Tag 2', 'Tag 3'])

function add() {
	dynamicTags.value.push('Tag 4')
}

function click(ev: any) {
	console.log(ev)
}

function a() {
	console.log(666)
}

function js() {
	dynamicTags.value.pop()
}
</script>
