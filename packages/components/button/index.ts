import type { App } from 'vue'
import stButton from './src/button.vue'
import './style/index.ts'

export default {
	install(app: App) {
		app.component('st-button', stButton)
	}
}
