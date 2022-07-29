import { lavaKey } from '../singletons'
import mitt from 'mitt'

export const popupPrompt = (() => {
	const emitter = mitt()

	return {
		show(choices: string[], fn: (choice: string) => void): void {
			emitter.emit('popup-prompt-req', choices)
			emitter.on('popup-prompt-res', (choice) => {
				fn(choice as string)
			})
		},

		close(choice: string): void {
			emitter.emit('popup-prompt-res', choice)
		},

		async onPrompt(fn: (choices: string[]) => void) {
			emitter.on('popup-prompt-req', (choices) => {
				fn(choices as string[])
			})
		},
	}
})()
