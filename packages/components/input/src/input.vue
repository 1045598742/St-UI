<template>
	<div :class="componentClass">
		<!-- input -->
		<template v-if="type !== 'textarea'">
			<slot name="prepend" />
			<div class="st-input__wrapper">
				<!-- 左侧图标 -->
				<template v-if="prefixIcon">
					<i :class="prefixIcon"></i>
				</template>
				<input
					ref="input"
					:value="modelValue"
					:type="type"
					:autofocus="autofocus"
					:disabled="disabled"
					:maxlength="maxlength"
					:minlength="minlength"
					:readonly="readonly"
					:name="name"
					v-bind="attrs"
					@input="handleInput"
					@focus="handleFocus"
					@blur="handleBlur"
					@change="handleChange"
					@compositionstart="handleCompositionStart"
					@compositionend="handleCompositionEnd"
				/>
				<!-- 清除按钮 -->
				<template v-if="clearable && modelValue">
					<span class="st-input__suffix" @click="handleClear">x</span>
				</template>
				<!-- 右侧图标 -->
				<template v-else-if="suffixIcon">
					<i :class="suffixIcon"></i>
				</template>
			</div>
			<slot name="append" />
		</template>
		<!-- textarea -->
		<template v-else>
			<textarea
				ref="textarea"
				:value="modelValue"
				v-bind="attrs"
				:name="name"
				:maxlength="maxlength"
				:minlength="minlength"
				:autofocus="autofocus"
				:rows="rows"
				:cols="cols"
				:readonly="readonly"
				:disabled="disabled"
				:style="textareaStyle"
				@input="handleInput"
				@focus="handleFocus"
				@blur="handleBlur"
				@compositionstart="handleCompositionStart"
				@compositionend="handleCompositionEnd"
			></textarea>
		</template>
	</div>
</template>

<script lang="ts">
import {
	defineProps,
	defineEmits,
	defineExpose,
	computed,
	useAttrs,
	shallowRef
} from 'vue'
import type { StyleValue } from 'vue'

export default {
	name: 'StInput',
	inheritAttrs: false
}
</script>

<script setup lang="ts">
type resizeTypes = 'none' | 'both' | 'horizontal' | 'vertical'

const input = shallowRef<HTMLInputElement>()
const textarea = shallowRef<HTMLTextAreaElement>()

const el = computed(() =>
	props.type === 'textarea'
		? (textarea.value as HTMLTextAreaElement)
		: (input.value as HTMLInputElement)
)

const props = defineProps({
	type: {
		type: String,
		default: 'text'
	},
	modelValue: {
		type: [String, Number],
		default: ''
	},
	maxlength: {
		type: [String, Number],
		default: ''
	},
	minlength: {
		type: [String, Number],
		default: ''
	},
	autofocus: {
		type: Boolean,
		default: false
	},
	rows: {
		type: [String, Number]
	},
	cols: {
		type: [String, Number]
	},
	resize: {
		type: String
	},
	/** 是否只读 */
	readonly: {
		type: Boolean,
		default: false
	},
	/** 是否禁用 */
	disabled: {
		type: Boolean,
		default: false
	},
	name: {
		type: String,
		default: ''
	},
	clearable: {
		type: Boolean,
		default: false
	},
	prefixIcon: {
		type: String,
		default: ''
	},
	suffixIcon: {
		type: String,
		default: ''
	}
})

const attrs = useAttrs()
const emit = defineEmits([
	'update:modelValue',
	'input',
	'change',
	'blur',
	'focus'
])

let lock = false

/** 组件顶层类名 */
const componentClass = computed(() =>
	props.type === 'textarea' ? 'st-textarea' : 'st-input'
)

const textareaStyle = computed<StyleValue>(() => [
	{
		resize: props.resize as resizeTypes
	}
])

/** input事件触发 */
function handleInput(ev: Event) {
	if (!lock) {
		const { value } = ev.target as HTMLInputElement
		emit('update:modelValue', value)
		emit('input', value)
	}
}

/** 点击清除按钮 */
function handleClear() {
	emit('update:modelValue', '')
}

/** change事件触发 */
function handleChange(ev: Event) {
	const { value } = ev.target as HTMLInputElement
	emit('change', value)
}

/** 焦点事件 */
function handleFocus(ev: FocusEvent) {
	emit('focus', ev)
}

/** 失焦事件 */
function handleBlur(ev: FocusEvent) {
	emit('blur', ev)
}

function handleCompositionStart(ev: Event) {
	lock = true
}

function handleCompositionEnd(ev: Event) {
	lock = false
	handleInput(ev)
}

defineExpose({
	focus() {
		el.value.focus()
	},
	blur() {
		el.value.blur()
	}
})
</script>
