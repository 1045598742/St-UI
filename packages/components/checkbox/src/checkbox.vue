<template>
	<label
		:class="[
			'st-checkbox',
			{ 'is-checked': checkValue, 'is-disabled': realDisabled }
		]"
	>
		<span class="st-checkbox__illusion">
			<input
				type="checkbox"
				:checked="checkValue"
				:disabled="disabled"
				class="st-checkbox__primordial"
				v-bind="elAttrs"
				@change="handleChange"
			/>
		</span>
		<slot v-if="slots.default" />
		<span v-else-if="label" class="st-checkbox__label">{{ label }}</span>
	</label>
</template>
<script lang="ts">
import { useSlots, computed, inject, reactive } from 'vue'

export default {
	name: 'StCheckbox',
	inheritAttrs: false
}
</script>

<script setup lang="ts">
const props = defineProps({
	modelValue: {
		type: [Number, String, Boolean],
		default: false
	},
	trueLabel: {
		type: [String, Number, Boolean],
		default: true
	},
	falseLabel: {
		type: [String, Number, Boolean],
		default: false
	},
	disabled: {
		type: Boolean,
		default: false
	},
	label: {
		type: String,
		default: ''
	},
	name: {
		type: String,
		default: ''
	}
})

const slots = useSlots()
// console.log((slots.default as () => any)()[0].type)
const emits = defineEmits(['update:modelValue', 'change'])

const isGroup = inject('isGroup', false)

const groupMap = inject<any>('groupMap', reactive({}))

const groupConfig = inject<any>('groupConfig', reactive({}))

const groupChange = inject<(a: any) => void>('groupChange', () => undefined)

const checkValue = computed<boolean>(() => {
	if (isGroup) {
		return groupMap.value[props.label] || false
	} else {
		if (props.trueLabel === props.modelValue) {
			return true
		}
		if (props.falseLabel === props.modelValue) {
			return false
		}
		return false
	}
})

const elAttrs = computed(() => {
	const attrs: { name?: string } = {}
	if (props.name) {
		attrs.name = props.name
	}

	return attrs
})

/**
 * 计算disabled
 */
const realDisabled = computed(() => {
	if (props.disabled) return true
	if (isGroup) {
		// todo 设置
		if (groupConfig.value.isMax && !groupMap.value[props.label]) return true
		if (groupConfig.value.isMin && groupMap.value[props.label]) return true
	}
	return false
})

/**
 * 点击触发change事件
 */
function handleChange(ev: Event) {
	console.log(realDisabled.value)
	if (realDisabled.value) return
	if (isGroup) {
		groupChange && groupChange(props.label)
	} else {
		let emitValue: string | boolean | number = (ev.target as HTMLInputElement)
			.checked
		emitValue = emitValue ? props.trueLabel : props.falseLabel
		emits('update:modelValue', emitValue)
		emits('change', ev)
	}
}
</script>
