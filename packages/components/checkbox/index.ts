import type { App } from 'vue'
import stCheckbox from './src/checkbox.vue'
import StCheckboxGroup from './src/checkbox-group.vue'
import './style/index.ts'

export default {
	install(app: App) {
		app.component('st-checkbox', stCheckbox)
		app.component('st-checkbox-group', StCheckboxGroup)
	}
}
