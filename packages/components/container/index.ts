import type { App } from 'vue'
import container from './src/container.vue'
import aside from './src/aside.vue'
import main from './src/main.vue'
import header from './src/header.vue'
import footer from './src/footer.vue'
import './style/index.ts'

export default {
	install(app: App) {
		app.component('st-container', container)
		app.component('st-aside', aside)
		app.component('st-main', main)
		app.component('st-header', header)
		app.component('st-footer', footer)
	}
}
