<template>
	<li
		:class="['st-option', { active: modelValue === value }]"
		@click="checkOption"
	>
		<slot>
			<span>{{ label }}</span>
		</slot>
	</li>
</template>

<script lang="ts">
import { inject } from 'vue'

export default {
	name: 'StOption'
}
</script>

<script lang="ts" setup>
const props = defineProps({
	label: {
		type: String,
		default: ''
	},
	value: {
		type: String,
		default: ''
	},
	disabled: {
		type: Boolean,
		default: false
	}
})

const emit = inject<Function>('emit')

const modelValue = inject('modelValue')

function checkOption() {
	if (props.disabled) return
	if (emit) {
		emit(props.value)
	}
}
</script>
