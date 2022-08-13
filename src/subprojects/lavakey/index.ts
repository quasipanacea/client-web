import {
	findChildNode,
	findParentNode,
	findSiblingLeftNode,
	findSiblingRightNode,
	findFirstEnterableNode,
} from './nodeFinder'

type Orientation = 'vertical' | 'horizontal'

export class Lavakey {
	currentMode: 'navigation' | 'insert' = 'navigation'
	currentOrientation: Orientation
	currentPosition: Element
	historyStack: Element[] = []

	constructor() {
		const app = document.querySelector('#app')
		if (!app) throw new Error('no app')

		this.currentOrientation = 'vertical'
		this.currentPosition = app
	}

	private maybeSwitchMode(ev: KeyboardEvent) {
		if (ev.code == 'Escape') {
			if (this.currentMode === 'navigation') {
				this.currentMode = 'insert'
			} else if (this.currentMode === 'insert') {
				this.currentMode = 'navigation'
			}

			const bar = document.getElementById('lava-position')
			if (bar) {
				bar.innerText = this.currentMode
			}
		}
	}

	private changeHighlight(node: Element | null) {
		if (!node) return

		// Remove highlight of old node
		if (this.currentPosition) {
			this.currentPosition.removeAttribute('data-lava-active')
		}

		// Add highlight of new node
		node.setAttribute('data-lava-active', '')
		this.currentPosition = node
	}

	private changeOrientation(node: Element) {
		if (!node) return

		const orientationRaw = node.getAttribute('data-lava-orientation')
		let orientation: Orientation
		switch (orientationRaw) {
			case 'vertical':
			case 'horizontal':
				orientation = orientationRaw
				break
			default:
				orientation = 'vertical'
				break
		}

		this.currentOrientation = orientation
	}

	// 0
	private historyPush(node: Element): void {
		this.historyStack.push(this.currentPosition)
		this.historyStack.push(node)
	}

	private historyPop(): void {
		this.changeHighlight({
			node: this.historyStack.at(-1),
			orientation: 'vertical', // TODO: remove object interface thing to changeHighlight
		})
		this.historyPop()
	}

	// Above, Below
	private navigateAbove(): void {
		// TODO cleanup
		const f = (currentNode: Element): Element | null => {
			if (currentNode.hasAttribute('data-lava-orientation')) {
				return currentNode
			}

			if (currentNode.parentElement) {
				const result = f(currentNode.parentElement)
				if (result) {
					return result
				}
			}

			return null
		}
		const a = this.currentPosition.parentElement?.parentElement
		if (!a) throw new Error('four')
		const node = f(a)
		let x = node?.getAttribute('data-lava-orientation')
		if (!x) x = 'vertical'
		if (x !== 'vertical' && x !== 'horizontal') {
			throw new Error('invalid value of orientation')
		}
		if (node) {
			this.changeOrientation(node)
		} else {
			this.currentOrientation = x
		}
		const n = findParentNode(this.currentPosition)
		this.changeHighlight(n)
	}

	private navigateBelow(): void {
		const node = findChildNode(this.currentPosition)
		this.changeOrientation(this.currentPosition)
		this.changeHighlight(node)
	}

	// Left, Down, Up, Right
	private navigateLeft(): void {
		const node = findSiblingLeftNode(this.currentPosition)
		this.changeHighlight(node)
	}

	private navigateDown() {
		this.navigateBelow()
	}

	private navigateUp(): void {
		const node = findSiblingLeftNode(this.currentPosition)
		this.changeHighlight(node)
	}

	private navigateRight(): void {
		const node = findSiblingRightNode(this.currentPosition)
		this.changeHighlight(node)
	}

	private actionEnter(): void {
		const node = findFirstEnterableNode(this.currentPosition)
		// if (node) node.
	}

	public getHandlerKeyDown() {
		return (ev: KeyboardEvent): void => {
			this.maybeSwitchMode(ev)

			if (this.currentMode === 'navigation') {
				if (ev.code === 'KeyR' && ev.ctrlKey) return // TODO: remove

				ev.preventDefault()

				if (ev.code === 'KeyU') {
					this.navigateAbove()
				} else if (ev.code === 'KeyM') {
					this.navigateBelow()
				} else if (ev.code === 'KeyJ') {
					if (this.currentOrientation === 'vertical') {
						this.navigateRight()
					}
				} else if (ev.code === 'KeyK') {
					if (this.currentOrientation === 'vertical') {
						this.navigateLeft()
					}
				} else if (ev.code === 'KeyH') {
					if (this.currentOrientation === 'horizontal') {
						this.navigateLeft()
					}
				} else if (ev.code === 'KeyL') {
					if (this.currentOrientation === 'horizontal') {
						this.navigateRight()
					}
				} else if (ev.code === 'Enter') {
					this.actionEnter()
				} else {
					console.info(ev.code)
				}
			}
		}
	}

	public getHandlerKeypress() {
		// eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
		return (ev: KeyboardEvent) => {}
	}

	public getHandlerKeyup() {
		// eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
		return (ev: KeyboardEvent) => {}
	}
}
export const lavaKey = new Lavakey()
