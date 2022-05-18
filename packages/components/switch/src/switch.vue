<template>
	<label
		:class="['st-switch', { 'is-checked': checked, 'is-disabled': disabled }]"
	>
		<slot name="open-text">
			<span
				v-if="openText && textPosition === 'out'"
				:style="{ color: openColor }"
			>
				{{ openText }}
			</span>
		</slot>
		<!-- 开关主要部分 -->
		<span
			class="st-switch__content"
			:style="{ 'background-color': checked ? openColor : closeColor }"
		>
			<!-- 开关圆按钮 -->
			<span class="st-switch__btn"></span>
			<!-- 开关内测的文案 -->
			<span
				v-if="textPosition === 'inner'"
				:class="['st-switch__inner-text', { 'is-checked': checked }]"
				>{{ checked ? openText : closeText }}</span
			>
		</span>
		<slot name="close-text">
			<span
				v-if="closeText && textPosition === 'out'"
				:style="{ color: closeColor }"
			>
				{{ closeText }}
			</span>
		</slot>
		<input
			type="checkbox"
			:checked="checked"
			hidden
			:disabled="disabled"
			@change="handleChange"
		/>
	</label>
</template>

<script lang="ts">
import { computed } from 'vue'
export default {
	name: 'StSwitch'
}
</script>

<script setup lang="ts">
const props = defineProps({
	modelValue: {
		type: [String, Number, Boolean],
		default: false
	},
	disabled: {
		type: Boolean
	},
	openValue: {
		type: [String, Number, Boolean],
		default: true
	},
	closeValue: {
		type: [String, Number, Boolean],
		default: false
	},
	openColor: {
		type: String,
		default: '#409EFF'
	},
	closeColor: {
		type: String,
		default: '#C0CCDA'
	},
	openText: {
		type: String,
		default: '开'
	},
	closeText: {
		type: String,
		default: '关'
	},
	textPosition: {
		type: String,
		default: 'inner' // out | inner
	}
})

const emit = defineEmits(['update:modelValue', 'change'])

/** 计算是否是开启状态 */
const checked = computed(() => props.modelValue === props.openValue)

function handleChange(ev: Event) {
	const { checked } = ev.target as HTMLInputElement
	const emitValue = checked ? props.openValue : props.closeValue
	emit('update:modelValue', emitValue)
	emit('change', emitValue)
}
</script>
