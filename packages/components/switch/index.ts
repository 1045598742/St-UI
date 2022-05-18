import type { App } from 'vue'
import Switch from './src/switch.vue'

Object.defineProperty(Switch, 'install', {
	get() {
		return function (app: App) {
			app.component('st-switch', Switch)
		}
	}
})

export default Switch
