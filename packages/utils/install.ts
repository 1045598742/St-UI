import type { App, Plugin, Component } from 'vue'

type ComponentPlugin<T> = T & Plugin

export const installUtil = <T extends Component>(
	component: T,
	options?: any
) => {
	Object.assign(component, {
		install: (app: App) => {
			app.component(component.name as string, component)
		}
	})
	return component as ComponentPlugin<T>
}
