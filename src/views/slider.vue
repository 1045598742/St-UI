<template>
	<div>
		<st-slider
			v-model="value"
			:min="0"
			:needStep="true"
			:step="1"
			:marks="marks"
		/>
		<br />
		<st-slider
			v-model="value1"
			:min="0"
			:needStep="true"
			range
			:step="1"
			:marks="marks"
		/>
	</div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import type { CSSProperties } from 'vue'

interface Mark {
	style: CSSProperties
	label: string
}
type Marks = Record<number, Mark | string>

const value = ref(0)
const value1 = ref<[number, number]>([20, 80])
const marks = reactive<Marks>({
	0: '0°C',
	8: '8°C',
	37: '37°C',
	50: {
		style: {
			color: '#1989FA'
		},
		label: '50%'
	}
})
</script>

<style lang="scss">
.st-slider {
	width: 500px;
}
</style>
