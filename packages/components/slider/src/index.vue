<template>
	<div ref="sliderBox" class="st-slider">
		<div ref="btn" class="st-slider__btn" :style="{ left: leftStyle }"></div>
		<div class="line"></div>
	</div>
	<div>{{ modelValue }}</div>
</template>

<script lang="ts">
import { onMounted, shallowRef, ref, computed } from 'vue'
export default {
	name: 'StSlider',
	inheritAttrs: false
}
</script>
<script lang="ts" setup>
const btn = shallowRef<HTMLDivElement>()
const sliderBox = shallowRef<HTMLDivElement>()

const props = defineProps({
	/** 是否需要步长 */
	needStep: {
		type: Boolean,
		default: true
	},
	// 最小值
	min: {
		type: Number,
		default: 50
	},
	// 最大值
	max: {
		type: Number,
		default: 100
	},
	// 是否禁止滑动
	disabled: {
		type: Boolean,
		default: false
	},
	// 步长	(需要needStep为true才生效)
	step: {
		type: Number,
		default: 10
	},
	modelValue: {
		type: Number,
		default: 0
	}
})

const emits = defineEmits(['update:modelValue'])

const leftStyle = computed(() => {
	return `${
		(Math.max(props.modelValue - props.min, 0) / (props.max - props.min)) * 100
	}%`
})

/**
 * 处理计算精度
 * @param value
 */
function precisionFormat(value: number) {
	return parseFloat(value.toFixed(9))
}

onMounted(() => {
	const btnEl = btn.value as HTMLDivElement
	const sliderBoxEl = sliderBox.value as HTMLDivElement
	btnEl.addEventListener('mousedown', (ev) => {
		let left: number | string = 0
		const { offsetX } = ev
		const rect = sliderBoxEl.getBoundingClientRect()
		const mousemoveCallback = (ev: MouseEvent) => {
			ev.preventDefault()
			let leftValue =
				(ev.pageX - rect.left - offsetX + btnEl.offsetWidth / 2) / rect.width
			if (leftValue <= 0) {
				leftValue = 0
			} else if (leftValue >= 1) {
				leftValue = 1
			}
			// console.log(leftValue)
			if (props.needStep) {
				const equally = props.step / (props.max - props.min)
				const multiple = precisionFormat(equally / 0.01)
				const value = Math.round(leftValue / equally) * multiple
				left = value
			} else {
				left = (leftValue * 100).toFixed(2)
			}
			emits(
				'update:modelValue',
				precisionFormat((+left / 100) * (props.max - props.min) + props.min)
			)
		}
		window.addEventListener('mousemove', mousemoveCallback)
		const mouseUpCallback = () => {
			window.removeEventListener('mousemove', mousemoveCallback)
			window.removeEventListener('mouseup', mouseUpCallback)
		}
		window.addEventListener('mouseup', mouseUpCallback)
	})
})
</script>

<style lang="scss">
.st-slider {
	position: relative;
	width: 30%;
	margin: 0 auto;
	.st-slider__btn {
		cursor: pointer;
		position: absolute;
		width: 20px;
		height: 20px;
		background-color: red;
		border-radius: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
	.line {
		width: 100%;
		height: 4px;
		border-radius: 2px;
		background-color: blue;
	}
}
</style>
