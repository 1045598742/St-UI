<template>
	<div>
		<st-input
			ref="inputRef"
			:maxlength="6"
			:minlength="3"
			type="textarea"
			resize="none"
			:rows="3"
			:cols="2"
			name="name"
			suffix-icon="st-icon_loading"
			prefix-icon="st-icon_loading"
			v-model="inputValue"
			@blur="blur"
			@focus="focus"
		>
			<template #prepend><div>2344545</div></template>
			<template #append><div>234</div></template>
		</st-input>
	</div>
</template>

<script lang="ts" setup>
import { ref, shallowRef } from 'vue'

const inputRef = shallowRef()

const inputValue = ref('')

function blur(ev: FocusEvent) {
	console.log(ev, 'blur')
}

function focus(ev: FocusEvent) {
	console.log(ev, 'focus')
}
</script>
