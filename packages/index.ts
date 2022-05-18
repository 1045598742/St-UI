import type { App } from 'vue'
import button from './components/button'
import input from './components/input'
import checkbox from './components/checkbox'
import container from './components/container'
import { Radio, RadioGroup } from './components/radio'
import Switch from './components/switch'
import './style/index.scss'
export default {
	install(app: App) {
		app.use(button)
		app.use(input)
		app.use(checkbox)
		app.use(container)
		app.use(Radio as any)
		app.use(RadioGroup as any)
		app.use(Switch as any)
	}
}
