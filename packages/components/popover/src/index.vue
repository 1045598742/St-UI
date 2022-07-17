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
import { computed, CSSProperties, Directive, PropType, ref } from 'vue'

const props = defineProps({
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

const referenceEl = ref<HTMLElement>()

const show = ref(false)

const popoverStyle = ref<{ style: CSSProperties }>({
	style: {}
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

function openPopover(ev: Event) {
	const el = referenceEl.value as HTMLElement
	const rect = el.getBoundingClientRect()
	popoverStyle.value.style = {
		top: `${rect.bottom + 10}px`,
		left: `${rect.left}px`,
		zIndex: 1000,
		minWidth:
			props.widthType === 'extendReference' ? `${rect.width}px` : props.minWidth
	}
	show.value = true
}

function closePopover(ev: Event) {
	show.value = false
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
