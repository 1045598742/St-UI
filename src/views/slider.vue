<template>
	<div>
		<st-slider
			v-model="value"
			:min="0"
			:needStep="true"
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

<style lang="scss"></style>
