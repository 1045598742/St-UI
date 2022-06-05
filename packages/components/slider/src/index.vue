<template>
	<div ref="sliderBox" class="st-slider">
		<div ref="btn" class="st-slider__btn" :style="{ left }"></div>
		<div class="line"></div>
	</div>
</template>

<script lang="ts">
import { onMounted, shallowRef, ref } from 'vue'
export default {
	name: 'StSlider',
	inheritAttrs: false
}
</script>
<script lang="ts" setup>
const btn = shallowRef<HTMLDivElement>()
const sliderBox = shallowRef<HTMLDivElement>()

const left = ref('0%')

onMounted(() => {
	const btnEl = btn.value as HTMLDivElement
	const sliderBoxEl = sliderBox.value as HTMLDivElement
	btnEl.addEventListener('mousedown', (ev) => {
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
			left.value = `${(leftValue * 100).toFixed(2)}%`
			console.log(left.value)
		}
		window.addEventListener('mousemove', mousemoveCallback)
		window.addEventListener('mouseup', () => {
			window.removeEventListener('mousemove', mousemoveCallback)
		})
	})
})
</script>

<style lang="scss">
.st-slider {
	position: relative;
	width: 80%;
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
