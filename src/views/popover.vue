<template>
	<button>66666</button>
	<st-popover trigger="click" width-type="extendReference">
		<template #reference>
			<st-button>popover</st-button>
		</template>
		<template #popover-content>main</template>
	</st-popover>
	<hr />
	<!-- <el-popover
		placement="top-start"
		title="Title"
		:width="200"
		trigger="hover"
		content="this is content, this is content, this is content"
	>
		<template #reference>
			<div v-if="flag">66</div>
			<el-button v-else>Hover to activate</el-button>
		</template>
	</el-popover> -->
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const flag = ref(true)

setTimeout(() => {
	flag.value = false
	setTimeout(() => {
		flag.value = true
	}, 5000)
}, 5000)
</script>
