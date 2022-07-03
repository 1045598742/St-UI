<template>
	<div class="st-progress">
		<div v-if="type === 'line'" class="st-progress__line">
			<div
				class="st-progress__value"
				:style="{ width: `${modelValue}%` }"
			></div>
		</div>
	</div>
</template>

<script lang="ts">
export default {
	name: 'StProgress'
}
</script>
<script lang="ts" setup>
import { PropType } from 'vue'

const props = defineProps({
	modelValue: {
		type: Number,
		default: 0
	},
	type: {
		type: String as PropType<'circle' | 'line'>,
		default: 'line'
	}
})
</script>
