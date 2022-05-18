<template>
	<div class="st-footer" :style="{ '--st-footer-width': height }">
		<slot />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'StFooter',
	inheritAttrs: false,
	props: {
		height: {
			type: String,
			default: '60px'
		}
	}
})
</script>
