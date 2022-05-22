import type { PropType } from 'vue'

export const buttonProps = {
	/**
	 * 主题类型
	 */
	type: {
		type: String as PropType<
			'default' | 'primary' | 'success' | 'warning' | 'danger'
		>,
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
