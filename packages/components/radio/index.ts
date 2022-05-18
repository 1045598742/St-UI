import type { App } from 'vue'
import Radio from './src/radio.vue'
import RadioGroup from './src/radio-group.vue'
// import './style/index.ts'

Radio.install = function (app: App) {
	app.component('st-radio', Radio)
}

RadioGroup.install = function (app: App) {
	app.component('st-radio-group', RadioGroup)
}

export { Radio, RadioGroup }
