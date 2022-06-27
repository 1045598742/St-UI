<template>
	<div ref="sliderBox" class="st-slider">
		<div
			ref="leftBtn"
			class="st-slider__btn"
			:style="{ left: sliderStyle.left }"
			@mousedown="sliderMouseDown($event, 'leftBtn')"
		></div>
		<div
			v-if="sliderStyle.right"
			ref="rightBtn"
			class="st-slider__btn"
			:style="{ left: sliderStyle.right }"
			@mousedown="sliderMouseDown($event, 'rightBtn')"
		></div>
		<div class="st-slider__line">
			<template v-if="showStops">
				<span
					v-for="num in stopsLen"
					:key="num"
					:style="{
						left: `${(100 / stopsLen) * num}%`
					}"
					class="st-slider__stop-item"
				></span>
			</template>
		</div>
	</div>
	<div>{{ modelValue }}</div>
</template>

<script lang="ts">
import { shallowRef, computed, PropType } from 'vue'
import { precisionFormat } from '@st-ui/utils/math'
import { domEvent } from '@st-ui/utils/dom'
export default {
	name: 'StSlider',
	inheritAttrs: false
}
</script>
<script lang="ts" setup>
const leftBtn = shallowRef<HTMLDivElement>()
const rightBtn = shallowRef<HTMLDivElement>()
const sliderBox = shallowRef<HTMLDivElement>()

type RangeModelValue = [number, number]

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
		type: [Number, Array] as PropType<number | RangeModelValue>,
		default: 0
	},
	showStops: {
		type: Boolean,
		default: false
	},
	range: {
		type: Boolean,
		default: false
	}
})

const emits = defineEmits(['update:modelValue'])

const stopsLen = computed(() => {
	return (props.max - props.min) / props.step
})

const rangeValue = computed(() => {
	if (props.range) {
		const [left, right] = props.modelValue as RangeModelValue
		return { left, right }
	} else {
		return {
			left: props.modelValue as number,
			right: null
		}
	}
})

const sliderStyle = computed(() => {
	const { left, right } = rangeValue.value
	const difference = props.max - props.min
	return {
		left: `${(Math.max(left - props.min, 0) / difference) * 100}%`,
		right:
			right !== null
				? `${(Math.max(right - props.min, 0) / difference) * 100}%`
				: null
	}
})

/** 鼠标放下触发 */
function sliderMouseDown(ev: MouseEvent, btnEnum: 'leftBtn' | 'rightBtn') {
	if (props.disabled) return
	let left: number | string = 0
	const { offsetX } = ev
	const rect = sliderBox.value!.getBoundingClientRect()
	const mousemoveCallback = (ev: Event) => {
		ev.preventDefault()
		const btn = btnEnum === 'leftBtn' ? leftBtn.value : rightBtn.value
		let leftValue =
			((ev as MouseEvent).pageX - rect.left - offsetX + btn!.offsetWidth / 2) /
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

		let emitValue!: number | RangeModelValue
		const mathValue = precisionFormat(
			(+left / 100) * (props.max - props.min) + props.min
		)
		if (props.range) {
			if (btnEnum === 'leftBtn') {
				emitValue = [mathValue, (props.modelValue as RangeModelValue)[1]]
			} else {
				emitValue = [(props.modelValue as RangeModelValue)[0], mathValue]
			}
		} else {
			emitValue = mathValue
		}
		emits('update:modelValue', emitValue)
	}
	domEvent.on(window, 'mousemove', mousemoveCallback)
	const mouseUpCallback = () => {
		domEvent.off(window, 'mousemove', mousemoveCallback)
		domEvent.off(window, 'mouseup', mouseUpCallback)
	}
	domEvent.on(window, 'mouseup', mouseUpCallback)
}
</script>
