<template>
	<transition
		enter-from-class="st-zoom-in-center-enter-from"
		enter-active-class="st-zoom-in-center-enter-active"
		appear
	>
		<span class="st-tag" @click="clickHandler">
			<span class="st-tag__content">
				<slot />
			</span>
			<i
				v-if="closable"
				class="st-icon_close st-tag__close"
				@click="closeHandler"
			></i>
		</span>
	</transition>
</template>

<script lang="ts">
export default {
	name: 'StTag'
}
</script>
<script setup lang="ts">
const props = defineProps({
	closable: {
		type: Boolean,
		default: false
	}
})

const emits = defineEmits(['click', 'close'])

/** 点击关闭按钮 */
function closeHandler() {
	emits('close')
}

function clickHandler(ev: Event) {
	emits('click', ev)
}
</script>
