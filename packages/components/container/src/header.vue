<template>
	<header class="st-header" :style="{ '--st-header-width': height }">
		<slot />
	</header>
</template>

<script lang="ts">
import { ref, defineProps } from 'vue'

export default {
	name: 'StHeader',
	inheritAttrs: false
}
</script>

<script setup lang="ts">
defineProps({
	height: {
		type: String,
		default: '60px'
	}
})
</script>
