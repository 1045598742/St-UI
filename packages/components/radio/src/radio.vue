<template>
	<label class="st-radio">
		<input
			type="radio"
			:name="name"
			:checked="checked"
			:value="inputValue"
			:disabled="realDisabled"
			@change="handleChange"
		/>
		<slot />
	</label>
</template>

<script lang="ts">
import { computed, inject } from 'vue'

export default {
	name: 'StRadio',
	inheritAttrs: false
}
</script>

<script setup lang="ts">
const props = defineProps({
	modelValue: {
		type: [String, Number]
	},
	disabled: {
		type: Boolean
	},
	name: {
		type: String
	},
	label: {
		type: String
	}
})

const isRadioGroup = inject<boolean>('isRadioGroup', false)
// console.log(isRadioGroup)
const groupValue = inject<any>('groupValue', '')

const groupDisabled = inject<any>('disabled', {})

const changeGroupValue = inject<(value: string) => any>(
	'changeGroupValue',
	(value) => {
		return
	}
)

const emit = defineEmits(['update:modelValue', 'focus', 'blur', 'change'])

const checked = computed(() => {
	return isRadioGroup
		? props.label === groupValue.value
		: props.label === props.modelValue
})

const inputValue = computed(() =>
	isRadioGroup ? groupValue.value : props.label
)

const realDisabled = computed(() =>
	isRadioGroup ? groupDisabled.value : props.disabled
)

function handleChange() {
	const emitValue = props.label as string
	if (isRadioGroup) {
		changeGroupValue && changeGroupValue(emitValue)
	} else {
		emit('update:modelValue', emitValue)
		emit('change', emitValue)
	}
}
</script>
