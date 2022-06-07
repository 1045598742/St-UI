<template>
	<div>
		<st-slider v-model="value" />
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value = ref(80)
</script>

<style lang="scss"></style>
