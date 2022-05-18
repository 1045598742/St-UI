<template>
	<aside class="st-aside" :style="`--st-aside-width: ${props.width}`">
		<slot />
	</aside>
</template>

<script lang="ts">
export default {
	name: 'StAside',
	inheritAttrs: false
}
</script>

<script setup lang="ts">
const props = defineProps({
	width: {
		type: String,
		default: '300px'
	}
})
</script>
