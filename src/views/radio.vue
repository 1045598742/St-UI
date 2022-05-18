<template>
	<div>
		<st-radio v-model="radioValue" label="张三">
			<span>张三</span>
		</st-radio>
		<st-radio v-model="radioValue" label="李四">
			<span>李四</span>
		</st-radio>
		<st-radio-group v-model="radioValue">
			<st-radio label="张三">
				<span>张三</span>
			</st-radio>
			<st-radio label="李四">
				<span>李四</span>
			</st-radio>
		</st-radio-group>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const radioValue = ref('张三')
</script>

<style lang="scss"></style>
