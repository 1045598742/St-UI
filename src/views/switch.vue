<template>
	<div>
		<st-switch v-model="value"></st-switch>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(true)
</script>
