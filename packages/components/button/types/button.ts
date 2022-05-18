// import type { PropType } from 'vue'

// type Size = 'large' | 'small' | 'mini'

export const buttonTypes = [
	'default',
	'primary',
	'success',
	'warning',
	'danger'
] as const

export const buttonProps = {
	type: {
		type: String,
		values: buttonTypes,
		default: 'default'
	},

	icon: {
		type: String,
		default: ''
	},

	disabled: {
		type: Boolean,
		default: false
	},

	circle: {
		type: Boolean,
		default: false
	},

	round: {
		type: Boolean,
		default: false
	},

	size: {
		type: String,
		default: ''
	},

	plain: {
		type: Boolean,
		default: false
	},
	text: {
		type: Boolean,
		default: false
	}
}
