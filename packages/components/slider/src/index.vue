<template>
	<div ref="sliderBox" class="st-slider">
		<div
			ref="btn"
			class="st-slider__btn"
			:style="{ left: leftStyle }"
			@mousedown="sliderMouseDown"
		></div>
		<div class="st-slider__line"></div>
	</div>
	<div>{{ modelValue }}</div>
</template>

<script lang="ts">
import { shallowRef, computed } from 'vue'
import { precisionFormat } from '@st-ui/utils/math'
import { domEvent } from '@st-ui/utils/dom'
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

/** 鼠标放下触发 */
function sliderMouseDown(ev: MouseEvent) {
	if (props.disabled) return
	const btnEl = btn.value as HTMLDivElement
	const sliderBoxEl = sliderBox.value as HTMLDivElement
	let left: number | string = 0
	const { offsetX } = ev
	const rect = sliderBoxEl.getBoundingClientRect()
	const mousemoveCallback = (ev: Event) => {
		ev.preventDefault()
		let leftValue =
			((ev as MouseEvent).pageX - rect.left - offsetX + btnEl.offsetWidth / 2) /
			rect.width
		if (leftValue <= 0) {
			leftValue = 0
		} else if (leftValue >= 1) {
			leftValue = 1
		}
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
	domEvent.on(window, 'mousemove', mousemoveCallback)
	const mouseUpCallback = () => {
		domEvent.off(window, 'mousemove', mousemoveCallback)
		domEvent.off(window, 'mouseup', mouseUpCallback)
	}
	domEvent.on(window, 'mouseup', mouseUpCallback)
}
</script>
