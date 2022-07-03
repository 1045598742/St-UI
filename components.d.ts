import vue from 'vue'

declare module 'vue' {
	export interface GlobalComponents {
		StButton: typeof import('@st-ui/components/button/index').StButton
		StButtonGroup: typeof import('@st-ui/components/button/index').StButtonGroup
		StInput: typeof import('@st-ui/components/input/index').StInput
		StCheckbox: typeof import('@st-ui/components/checkbox/index').StCheckbox
		StCheckboxGroup: typeof import('@st-ui/components/checkbox/index').StCheckboxGroup
		StAside: typeof import('@st-ui/components/container/index').StAside
		StMain: typeof import('@st-ui/components/container/index').StMain
		StHeader: typeof import('@st-ui/components/container/index').StHeader
		StFooter: typeof import('@st-ui/components/container/index').StFooter
		StRadio: typeof import('@st-ui/components/radio/index').StRadio
		StRadioGroup: typeof import('@st-ui/components/radio/index').StRadioGroup
		StSwitch: typeof import('@st-ui/components/switch/index').StSwitch
		StSlider: typeof import('@st-ui/components/slider/index').StSlider
		StProgress: typeof import('@st-ui/components/progress/index').StProgress
	}
}
