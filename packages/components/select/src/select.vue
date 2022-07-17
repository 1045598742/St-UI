<template>
	<st-popover trigger="click" width-type="extendReference">
		<template #reference>
			<st-input />
		</template>
		<template #popover-content>
			<ul>
				<li>
					<span>123</span>
				</li>
			</ul>
		</template>
	</st-popover>
</template>

<script lang="ts">
export default {
	name: 'StSelect'
}
</script>

<script lang="ts" setup>
import StPopover from '@st-ui/components/popover/src/index.vue'
import StInput from '@st-ui/components/input/src/input.vue'

const props = defineProps({
	a: String
})
</script>
