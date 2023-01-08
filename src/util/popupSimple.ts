import mitt from 'mitt'

export type Events = {
	'generic::open': {
		component: unknown
	}
	'generic::close': {
		result: null | unknown
	}
	'new-pod::open': {
		component: unknown
	}
	'new-pod::close': {
		name: null | string
		type: null | string
	}
}

export const popupEmitter = mitt<Events>()
