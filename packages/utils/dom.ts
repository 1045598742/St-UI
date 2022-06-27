export const domEvent = {
	on(
		target: Window | HTMLElement,
		eventName: typeof target extends Window
			? // eslint-disable-next-line no-undef
			  keyof WindowEventMap
			: // eslint-disable-next-line no-undef
			  keyof WindowEventMap,
		// eslint-disable-next-line no-undef
		listener: EventListenerOrEventListenerObject,
		// eslint-disable-next-line no-undef
		options?: boolean | AddEventListenerOptions | undefined
	) {
		target.addEventListener(eventName, listener, options)
	},
	off(
		target: Window | HTMLElement,
		eventName: typeof target extends Window
			? // eslint-disable-next-line no-undef
			  keyof WindowEventMap
			: // eslint-disable-next-line no-undef
			  keyof WindowEventMap,
		// eslint-disable-next-line no-undef
		listener: EventListenerOrEventListenerObject,
		// eslint-disable-next-line no-undef
		options?: boolean | AddEventListenerOptions | undefined
	) {
		target.removeEventListener(eventName, listener, options)
	}
}

interface DomEvent {
	on: (target: Window | HTMLElement) => void
}
