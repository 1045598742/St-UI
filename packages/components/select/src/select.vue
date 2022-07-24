<template>
	<st-popover v-model="visible" trigger="click" width-type="extendReference">
		<template #reference>
			<st-input v-model="value" readonly clearable :disabled="disabled" />
		</template>
		<template #popover-content>
			<ul>
				<slot />
			</ul>
		</template>
	</st-popover>
</template>

<script lang="ts">
import { computed, provide, ref, toRef } from 'vue'
import StPopover from '@st-ui/components/popover/src/index.vue'
import StInput from '@st-ui/components/input/src/input.vue'
import type { PropType } from 'vue'

export default {
	name: 'StSelect'
}
</script>

<script lang="ts" setup>
const props = defineProps({
	/** v-model绑定的值 */
	modelValue: {
		type: [String, Number] as PropType<string | number>,
		default: ''
	},
	/** 是否禁用 */
	disabled: {
		type: Boolean,
		default: false
	},
	/** 是否显示清空按钮 */
	clearable: {
		type: Boolean,
		default: false
	}
})

const emits = defineEmits(['update:modelValue'])

const visible = ref(false)

const value = computed({
	get() {
		return props.modelValue
	},
	set(value) {
		emits('update:modelValue', value)
	}
})

provide('emit', (value: any) => {
	visible.value = false
	emits('update:modelValue', value)
})

provide('modelValue', toRef(props, 'modelValue'))

provide('disabled', toRef(props, 'disabled'))
</script>
