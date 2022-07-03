<template>
	<st-progress v-model="value"></st-progress>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(20)

setTimeout(() => {
	value.value = 40
}, 3000)
</script>
<style lang="scss"></style>
