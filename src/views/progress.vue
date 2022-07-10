<template>
	<button @click="value += 10">+{{ value }}</button>
	<button @click="value -= 10">-{{ value }}</button>
	<st-progress
		type="circle"
		:percentage="value"
		text-inside
		:format="format"
		:color="[
			{ color: '#f56c6c', percentage: 20 },
			{ color: '#e6a23c', percentage: 40 },
			{ color: '#5cb87a', percentage: 60 },
			{ color: '#1989fa', percentage: 80 },
			{ color: '#6f7ad3', percentage: 100 }
		]"
	></st-progress>
	<st-progress
		type="line"
		:percentage="value"
		text-inside
		:color="[
			{ color: '#f56c6c', percentage: 20 },
			{ color: '#e6a23c', percentage: 40 },
			{ color: '#5cb87a', percentage: 60 },
			{ color: '#1989fa', percentage: 80 },
			{ color: '#6f7ad3', percentage: 100 }
		]"
	></st-progress>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(20)

function format(percentage: number) {
	return `${percentage}-进度`
}
</script>
<style lang="scss"></style>
