<template>
	<div :style="{ position: 'relative' }">
		<div>{{ value }}</div>
		<st-select v-model="value">
			<st-option label="张三" value="zhangSan"></st-option>
			<st-option label="李四" value="liSi"></st-option>
		</st-select>
		<!-- <el-select v-model="value" :teleported="true">
			<el-option label="张三" value="zhangSan"></el-option>
			<el-option label="李四" value="liSi"></el-option>
		</el-select>
		<el-popover
			:teleported="false"
			placement="bottom"
			title="Title"
			:width="200"
			trigger="click"
			content="this is content, this is content, this is content"
		>
			<template #reference>
				<el-button>Click to activate</el-button>
			</template>
		</el-popover> -->
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')
</script>
