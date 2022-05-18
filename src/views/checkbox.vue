<template>
	<div>
		<button @click="checkList.push('李四')">增加李四</button>
		<st-checkbox-group v-model="checkList" :min="1" :max="2">
			<st-checkbox label="张三" />
			<st-checkbox label="李四" />
			<st-checkbox label="王五" />
		</st-checkbox-group>
		<st-checkbox
			v-model="checkboxValue"
			:disabled="false"
			:true-label="1"
			:false-label="0"
			label="label"
		>
		</st-checkbox>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checkboxValue = ref(0)

const checkList = ref(['张三'])
</script>
