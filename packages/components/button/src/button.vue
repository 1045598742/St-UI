<template>
	<button
		:class="classNames"
		:disabled="disabled"
		type="button"
		@click="handelClick"
	>
		<!-- 图标按钮 -->
		<template v-if="iconClass">
			<i :class="iconClass"></i>
		</template>
		<!-- 默认插槽 -->
		<span v-else-if="$slots.default">
			<slot />
		</span>
	</button>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { buttonProps } from '../types/button'
export default defineComponent({
	inheritAttrs: false,

	name: 'StButton',

	props: buttonProps,

	setup(props, content) {
		/**
		 * 类名
		 */
		const classNames = computed(() => {
			const baseClass = 'st-button'
			const classList = [
				baseClass,
				{
					'is-disabled': props.disabled, // 禁用
					'is-round': props.round, // 圆角
					'is-text': props.text, // 文本
					'is-plain': props.plain, // 边框
					'is-circle': props.circle // 边框
				}
			]
			if (props.size) classList.push(`is-${props.size}`)
			if (props.type) classList.push(`${baseClass}__${props.type}`)
			return classList
		})

		const iconClass = computed(() => {
			if (props.icon && !props.circle) {
				return `st-icon_${props.icon}`
			}
			return ''
		})

		/**
		 * 按钮点击触发
		 */
		function handelClick(event: MouseEvent) {
			content.emit('click', event)
		}

		return {
			classNames,
			iconClass,
			handelClick
		}
	}
})
</script>
