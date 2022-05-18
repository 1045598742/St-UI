<template>
	<div class="st-radio-group">
		<slot />
	</div>
</template>

<script lang="ts">
import { computed, defineProps, defineEmits, provide } from 'vue'

export default {
	name: 'StRadioGroup',
	inheritAttrs: false
}
</script>

<script setup lang="ts">
const props = defineProps({
	modelValue: {
		type: String
	},
	disabled: {
		type: Boolean
	}
})

const emits = defineEmits(['update:modelValue', 'change'])

provide('isRadioGroup', true)

provide(
	'groupValue',
	computed(() => props.modelValue)
)

provide(
	'disabled',
	computed(() => props.disabled)
)

provide('changeGroupValue', (value: string) => {
	console.log(value)
	emits('update:modelValue', value)
	emits('change', value)
})
</script>
