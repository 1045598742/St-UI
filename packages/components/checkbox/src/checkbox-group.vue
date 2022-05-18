<template>
	<div class="st-checkbox-group">
		<slot />
	</div>
</template>

<script lang="ts">
import { computed, defineProps, defineEmits, provide } from 'vue'

export default {
	name: 'StCheckboxGroup',
	inheritAttrs: false
}
</script>

<script setup lang="ts">
const props = defineProps({
	modelValue: {
		type: Array,
		default: () => []
	},
	min: {
		type: Number,
		default: undefined
	},
	max: {
		type: Number,
		default: undefined
	}
})

const emits = defineEmits(['update:modelValue'])

type GroupMap = Record<string, boolean | undefined>

const groupMap = computed(() => {
	return props.modelValue.reduce<GroupMap>((it, label: any) => {
		return { ...it, [label as string]: true }
	}, {})
})

provide('isGroup', true)

provide('groupMap', groupMap)

const groupConfig = computed(() => {
	const { length } = props.modelValue
	return {
		isMin: typeof props.min === 'number' && length <= props.min,
		isMax: typeof props.max === 'number' && length >= props.max
	}
})

provide('groupConfig', groupConfig)

provide('groupChange', (label: string) => {
	if (groupMap.value[label]) {
		emits(
			'update:modelValue',
			props.modelValue.filter((item) => item !== label)
		)
	} else {
		emits('update:modelValue', [...props.modelValue, label])
	}
})
</script>
