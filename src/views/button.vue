<template>
	<st-button type="default" disabled @click="aaaa">Default</st-button>
	<st-button type="default" icon="loading" @click="aaaa">Default</st-button>
	<st-button type="success" round size="small" @click="aaaa">点击</st-button>
	<st-button type="warning" plain @click="aaaa">点击</st-button>
	<st-button type="danger" @click="aaaa">点击</st-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
	setup() {
		return {
			/**
			 * 566
			 */
			aaaa(ev: MouseEvent) {
				console.log(ev)
			}
		}
	}
})
</script>
<style lang="scss"></style>
