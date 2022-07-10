<template>
	<div :class="['st-progress', `st-progress__${type}`]" :style="progressStyle">
		<div
			v-if="type === 'line'"
			class="st-progress__shell"
			:style="{ height: `${strokeWidth}px` }"
		>
			<div
				class="st-progress__kernel"
				:style="{ width: `${progressValue}%`, backgroundColor: getColor() }"
			>
				<slot name="text">
					<span v-if="textInside" class="progress-inner__text">{{
						format ? format(progressValue) : `${progressValue}%`
					}}</span>
				</slot>
			</div>
		</div>
		<template v-else-if="type === 'circle'">
			<svg
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				:viewBox="`0,0,${props.width},${props.width}`"
			>
				<path v-bind="getPathAttrs(true)" class="st-progress__shell"></path>
				<path v-bind="getPathAttrs()" class="st-progress__kernel"></path>
			</svg>
			<slot name="text">
				<div v-if="textInside" class="progress-inner__text">
					{{ format ? format(progressValue) : `${progressValue}%` }}
				</div>
			</slot>
		</template>
	</div>
</template>

<script lang="ts">
export default {
	name: 'StProgress'
}
</script>
<script lang="ts" setup>
import { typeUtils } from '@st-ui/utils/typeUtils'
import { computed, PropType, CSSProperties, SVGAttributes } from 'vue'

type PropColor = PropType<
	| string
	| { color: string; percentage: number }[]
	| ((percentage: number) => string)
>

const props = defineProps({
	/** 进度数值 */
	percentage: {
		type: Number,
		default: 0
	},
	strokeWidth: {
		type: Number,
		default: 20
	},
	/** 进度条的类型 */
	type: {
		type: String as PropType<'circle' | 'line'>,
		default: 'line'
	},
	width: {
		type: Number,
		default: 120
	},
	color: {
		type: [String, Function, Array] as PropColor,
		default: ''
	},
	/** 是否展示进度条文字在进度条内部 */
	textInside: {
		type: Boolean,
		default: false
	},
	/** svg的path两端的形状 */
	strokeLinecap: {
		type: String as PropType<'butt' | 'round' | 'square'>,
		default: 'round'
	},
	format: {
		type: [Function] as PropType<(...args: any[]) => string | any>,
		default: undefined
	}
})

const progressValue = computed(() => {
	if (props.percentage <= 0) return 0
	if (props.percentage >= 100) return 100
	return props.percentage
})

const progressStyle = computed(() => {
	const cssStyle: CSSProperties = {}
	if (props.type === 'circle') {
		cssStyle.width = `${props.width}px`
		cssStyle.height = `${props.width}px`
	}
	return cssStyle
})

/**
 * 圆环和仪表盘的path属性
 * @param isShell 是否是躯壳
 */
function getPathAttrs(isShell?: boolean): SVGAttributes {
	const strokeWidth = 6
	const centerPoint = {
		xAxis: props.width / 2,
		yAxis: props.width / 2
	} as const
	const offsetAbs = centerPoint.xAxis - strokeWidth / 2
	const pathAttributes: SVGAttributes = {
		'stroke-width': strokeWidth,
		'stroke-linecap': props.strokeLinecap,
		fill: 'none',
		d: `
			M ${centerPoint.xAxis} ${centerPoint.yAxis}
			m 0 -${offsetAbs}
			a ${offsetAbs} ${offsetAbs} 0 1 1 0 ${offsetAbs * 2}
			a ${offsetAbs} ${offsetAbs} 0 1 1 0 -${offsetAbs * 2}
		`
	}
	if (!isShell) {
		const perimeter = 2 * offsetAbs * Math.PI
		pathAttributes.stroke = getColor()
		pathAttributes['stroke-dasharray'] = `${
			(perimeter * progressValue.value) / 100
		} ${perimeter}`
	}
	return pathAttributes
}

/** 获取进度条的颜色 */
function getColor() {
	if (!props.color) {
		return 'green'
	}
	if (typeUtils.isString(props.color)) {
		return props.color
	} else if (typeUtils.isFunction(props.color)) {
		return props.color(progressValue.value)
	} else if (typeUtils.isArray(props.color)) {
		return props.color.find((item) => item.percentage >= progressValue.value)
			?.color
	}
}
</script>
