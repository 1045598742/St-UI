<template>
	<div>
		<st-slider v-model="value" showStops range />
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value = ref<[number, number]>([80, 90])
</script>

<style lang="scss"></style>
