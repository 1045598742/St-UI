<template>
	<span ref="referenceEl" v-on="listeners" class="popover-reference">
		<slot name="reference" />
	</span>
	<Teleport to="body" :disabled="!appendToBody">
		<transition name="popover">
			<div
				v-show="show"
				:style="popoverStyle.style"
				class="popover-content"
				v-clickOutSide
			>
				<slot name="popover-content" />
			</div>
		</transition>
	</Teleport>
</template>

<script lang="ts">
export default {
	name: 'StPopover'
}
</script>

<script lang="ts" setup>
import {
	computed,
	CSSProperties,
	Directive,
	PropType,
	ref,
	watchEffect,
	watch,
	nextTick
} from 'vue'

const props = defineProps({
	modelValue: {
		type: Boolean,
		default: false
	},
	appendToBody: {
		type: Boolean,
		default: true
	},
	trigger: {
		type: String as PropType<'click' | 'hover'>,
		default: 'hover'
	},
	widthType: {
		type: [String, Function] as PropType<'default' | 'extendReference'>,
		default: 'default'
	},
	minWidth: {
		type: String,
		default: '100px'
	}
})

const emits = defineEmits(['update:modelValue'])

const referenceEl = ref<HTMLElement>()

const show = ref(true)

const popoverStyle = ref<{ style: CSSProperties }>({
	style: {
		top: 0,
		left: 0
	}
})

const vClickOutSide: Directive = {
	mounted(el, binding) {
		el.clickOutSideCallback = (ev: Event) => {
			if (props.trigger === 'click') {
				if (referenceEl.value?.contains(ev.target as HTMLElement)) {
					return
				}
				const canClose = !el.contains(ev.target as HTMLElement)
				if (show.value && canClose) {
					show.value = false
				}
			}
		}
		window.addEventListener('click', el.clickOutSideCallback)
	},
	beforeUnmount(el) {
		window.removeEventListener('click', el.clickOutSideCallback)
	}
}

function computedStyle() {
	const showValue = show.value
	if (referenceEl.value) {
		const el = referenceEl.value as HTMLElement
		const rect = el.getBoundingClientRect()
		if (props.appendToBody) {
			popoverStyle.value.style = {
				top: `${rect.bottom + 10}px`,
				left: `${rect.left}px`,
				zIndex: 1000,
				'--translateX': 0,
				'--translateY': 0,
				minWidth:
					props.widthType === 'extendReference'
						? `${rect.width}px`
						: props.minWidth
			} as any
		} else {
			// todo 如果不是追加到body的情况
			// popoverStyle.value.style = {
			// 	top: 0,
			// 	left: 0,
			// 	zIndex: 1000,
			// 	'--translateX': `${rect.left}px`,
			// 	'--translateY': `${rect.bottom + 10}px`,
			// 	minWidth:
			// 		props.widthType === 'extendReference'
			// 			? `${rect.width}px`
			// 			: props.minWidth
			// } as any
		}
	}
}

watch(
	() => props.modelValue,
	(visible) => {
		show.value = visible
	},
	{ immediate: true }
)

watch(show, computedStyle)

function openPopover(ev: Event) {
	show.value = true
	emits('update:modelValue', show.value)
}

function closePopover(ev: Event) {
	show.value = false
	emits('update:modelValue', show.value)
}

const listeners = computed(() => {
	if (props.trigger === 'click') {
		return {
			click: openPopover
		}
	} else {
		return {
			mouseenter: openPopover,
			mouseleave: closePopover
		}
	}
})
</script>
