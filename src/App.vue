<template>
	<div>
		<router-link
			v-for="item in routes"
			:key="item.path"
			:to="item.path"
			replace
			class="router-link"
		>
			{{ item.path }}
		</router-link>
		<div class="view-box">
			<router-view />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { routes } from '@/router'
export default defineComponent({
	setup() {
		return {
			routes
		}
	}
})
</script>
<style lang="scss">
* {
	margin: 0;
	padding: 0;
}
html,
body,
#app {
	height: 100%;
	background-color: white;
	.router-link {
		color: black;
		margin-right: 20px;
	}
	.view-box {
		margin-top: 50px;
	}
}
</style>
