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
			:style="{ left: sliderStyle.right, background: 'green' }"
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
			<span
				v-for="mask in maskList"
				:key="mask.num"
				:style="{
					left: `${((mask.num - min) / (max - min)) * 100}%`
				}"
				class="st-slider__stop-item"
			>
				<span class="st-slider__label">{{ mask.label }}</span>
			</span>
		</div>
	</div>
	<div>{{ modelValue }}</div>
</template>

<script lang="ts">
import { shallowRef, ref, computed, PropType } from 'vue'
import type { CSSProperties } from 'vue'
import { precisionFormat } from '@st-ui/utils/math'
import { domEvent } from '@st-ui/utils/dom'
import { typeUtils } from '@st-ui/utils/typeUtils'
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

type BtnEnum = 'leftBtn' | 'rightBtn'

type Mask = { label: string; style?: CSSProperties }
type Masks = Mask | string

const props = defineProps({
	/** 是否需要步长 */
	needStep: {
		type: Boolean,
		default: true
	},
	// 最小值
	min: {
		type: Number,
		default: 0
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
	},
	marks: {
		type: Object as PropType<Record<string, Masks>>,
		default: () => ({})
	}
})

const maskList = computed(() => {
	const arr: ({ num: number } & Mask)[] = []
	Object.keys(props.marks).forEach((key) => {
		const value = props.marks[key]
		const num = +key
		if (num >= props.min) {
			if (typeUtils.isString(value)) {
				arr.push({ num, label: value })
			} else {
				arr.push({ num, ...value })
			}
		}
	})
	return arr
})

/** 是否滑块是正序的 */
const isPositive = ref(true)

const emits = defineEmits(['update:modelValue'])

const stopsLen = computed(() => {
	return (props.max - props.min) / props.step
})

const rangeValue = computed(() => {
	if (props.range) {
		const [left, right] = props.modelValue as RangeModelValue
		return isPositive.value ? { left, right } : { left: right, right: left }
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

let first: number | undefined
let last: number | undefined

/** 触发到父组件之前的计算 */
function emitComputed(left: number | string, btnEnum: BtnEnum) {
	let emitValue!: number | RangeModelValue
	const mathValue = precisionFormat(
		(+left / 100) * (props.max - props.min) + props.min
	)
	if (props.range) {
		let leftValue = 0
		let rightValue = 0
		if (btnEnum === 'leftBtn') {
			leftValue = mathValue
			rightValue = last as number
			emitValue = [leftValue, rightValue].sort(
				(a, b) => a - b
			) as RangeModelValue
		} else {
			leftValue = first as number
			rightValue = mathValue
			emitValue = [leftValue, rightValue].sort(
				(a, b) => a - b
			) as RangeModelValue
		}
		isPositive.value = leftValue <= rightValue
	} else {
		emitValue = mathValue
	}
	emits('update:modelValue', emitValue)
}

/** 鼠标放下触发 */
function sliderMouseDown(ev: MouseEvent, btnEnum: BtnEnum) {
	if (props.disabled) return
	let left: number | string = 0
	const { offsetX } = ev
	const rect = sliderBox.value!.getBoundingClientRect()
	;[first, last] = props.range ? (props.modelValue as RangeModelValue) : []
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
		emitComputed(left, btnEnum)
	}

	domEvent.on(window, 'mousemove', mousemoveCallback)
	const mouseUpCallback = () => {
		isPositive.value = true
		domEvent.off(window, 'mousemove', mousemoveCallback)
		domEvent.off(window, 'mouseup', mouseUpCallback)
	}
	domEvent.on(window, 'mouseup', mouseUpCallback)
}
</script>
