import type { App } from 'vue'
import stInput from './src/input.vue'
import './style/index.ts'

export default {
	install(app: App) {
		app.component('st-input', stInput)
	}
}
