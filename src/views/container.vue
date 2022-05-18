<template>
	<div>
		<st-container>
			<st-header></st-header>
			<st-container>
				<st-aside width="200px"></st-aside>
				<st-main></st-main>
			</st-container>
			<st-footer></st-footer>
		</st-container>
	</div>
</template>

<script lang="ts" setup></script>

<style lang="scss">
.st-header {
	background-color: green;
}
.st-aside {
	height: 400px;
	background-color: red;
}
.st-main {
	height: 400px;
	background-color: blue;
}
.st-footer {
	background-color: black;
}
</style>
