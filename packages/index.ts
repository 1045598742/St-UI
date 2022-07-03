import type { Plugin } from 'vue'
import { StButton, StButtonGroup } from './components/button'
import { StInput } from './components/input'
import { StCheckbox, StCheckboxGroup } from './components/checkbox'
import { StAside, StMain, StHeader, StFooter } from './components/container'
import { StRadio, StRadioGroup } from './components/radio'
import { StSwitch } from './components/switch'
import { StSlider } from './components/slider'
import { StProgress } from './components/progress'
import './style/index.scss'

const install: Plugin = {
	install(app) {
		app.use(StButton)
		app.use(StButtonGroup)
		app.use(StInput)
		app.use(StCheckbox)
		app.use(StCheckboxGroup)
		app.use(StAside)
		app.use(StMain)
		app.use(StHeader)
		app.use(StFooter)
		app.use(StRadio)
		app.use(StRadioGroup)
		app.use(StSwitch)
		app.use(StSlider)
		app.use(StProgress)
	}
}

export * from './components/button'
export * from './components/input'
export * from './components/checkbox'
export * from './components/container'
export * from './components/radio'
export * from './components/switch'
export * from './components/slider'
export * from './components/progress'

export default install
