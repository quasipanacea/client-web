import mitt from 'mitt'

type PopupData = {
	'pod-new': {
		construct: Record<string, never>
		deconstruct: {
			name: string
		}
	}
}

type ValidPopupIds = keyof PopupData

type MittEvents = {
	construct: {
		id: string
		popupSlug: ValidPopupIds
		component: unknown
		constructData: null | unknown
	}
	deconstruct: {
		id: string
		popupSlug: ValidPopupIds
		deconstructData: null | unknown
	}
}

const emitter = mitt<MittEvents>()

type DeconstructData<T extends ValidPopupIds> =
	| null
	| PopupData[T]['deconstruct']

type ConstructData<T extends ValidPopupIds> = null | PopupData[T]['construct']

const table: {
	[key: string]: (deconstructData: DeconstructData<ValidPopupIds>) => void
} = {}

export function popupConstruct(
	popupSlug: ValidPopupIds,
	component: unknown,
	constructData: ConstructData<typeof popupSlug>,
	onDeconstruct: (deconstructData: DeconstructData<typeof popupSlug>) => void,
) {
	const id = crypto.randomUUID()

	table[id] = onDeconstruct
	emitter.emit('construct', {
		id,
		popupSlug,
		component,
		constructData,
	})

	onDeconstructPopup(popupSlug, onDeconstruct)
}

export function popupDeconstruct(
	id: string,
	popupSlug: ValidPopupIds,
	deconstructData: DeconstructData<typeof popupSlug>,
) {
	emitter.emit('deconstruct', { id, popupSlug, deconstructData })
	emitter.off('deconstruct', table[id])
	delete table[id]
}

export function onConstructPopup(
	handler: (id: string, popupSlug: ValidPopupIds, component: unknown) => void,
) {
	emitter.on('*', (type, event) => {
		if (type === 'construct') {
			const ev = event as MittEvents['construct']
			handler(ev.id, ev.popupSlug, ev.component)
		}
	})
}

export function onDeconstructPopup(
	popupSlug: ValidPopupIds,
	handler: (deconstructData: DeconstructData<typeof popupSlug>) => void,
) {
	emitter.on('deconstruct', (event) => {
		const ev = event as MittEvents['deconstruct']
		if (ev.popupSlug == popupSlug) {
			handler(ev.deconstructData)
		}
	})
}

export function onDeconstructAnyPopup(
	handler: (id: string, popupSlug: ValidPopupIds) => void,
) {
	emitter.on('deconstruct', (event) => {
		const ev = event as MittEvents['deconstruct']
		handler(ev.id, ev.popupSlug)
	})
}
