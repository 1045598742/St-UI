<template>
	<section :class="['st-container', { 'is-vertical': isVertical }]">
		<slot />
	</section>
</template>

<script lang="ts">
import type { Component } from 'vue'
import { defineProps, useSlots, computed } from 'vue'

export default {
	name: 'StContainer',
	inheritAttrs: false
}
</script>

<script setup lang="ts">
const props = defineProps({
	direction: {
		type: String,
		default: 'horizontal'
	}
})

const slot = useSlots()

const isVertical = computed(() => {
	if (slot.default) {
		return slot.default().some((slotItem) => {
			const componentName = (slotItem.type as Component).name || ''
			return ['StHeader', 'StFooter'].includes(componentName)
		})
	}
	return props.direction === 'vertical'
})
</script>
