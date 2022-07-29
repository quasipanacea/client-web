import {
	findChildNode,
	findParentNode,
	findSiblingLeftNode,
	findSiblingRightNode,
	type NodeResult,
} from './nodeFinder'

export class LavakeyManager {
	currentMode: 'navigation' | 'insert' = 'navigation'
	currentOrientation: 'vertical' | 'horizontal'
	currentPosition: Element
	historyStack: Element[] = []

	constructor() {
		const app = document.querySelector('#app')
		if (!app) throw new Error('no app')

		this.currentOrientation = 'vertical'
		this.currentPosition = app
	}

	dealWithModeSwitching(ev: KeyboardEvent) {
		if (ev.code == 'Escape') {
			if (this.currentMode === 'navigation') {
				this.currentMode = 'insert'
			} else if (this.currentMode === 'insert') {
				this.currentMode = 'navigation'
			}

			const bar = document.getElementById('lavaPosition')
			if (bar) {
				bar.innerText = this.currentMode
			}
		}
	}

	changeHighlight(newNode: NodeResult) {
		if (!newNode.node) return
		console.log(newNode)

		// Remove highlight of old node
		if (this.currentPosition) {
			this.currentPosition.removeAttribute('data-lava-active')
			this.currentPosition.classList.remove('lava-active')
		}

		// Add highlight of new node
		newNode.node.setAttribute('data-lava-active', '')
		newNode.node.classList.add('lava-active')
		this.currentPosition = newNode.node
	}

	changeOrientation(newNode: NodeResult) {
		if (!newNode.node) return

		const attr = newNode.node.getAttribute('data-lava-orientation')
		if (attr) {
			if (attr !== 'vertical' && attr !== 'horizontal') {
				console.log('av', attr)
				throw new Error('invalid value of orientation')
			}
			this.currentOrientation = attr
		}
	}

	// 0
	historyPush(node: Element): void {
		this.historyStack.push(this.currentPosition)
		this.historyStack.push(node)
	}

	historyPop(): void {
		this.changeHighlight({
			node: this.historyStack.at(-1),
			orientation: 'vertical', // TODO: remove object interface thing to changeHighlight
		})
		this.historyPop()
	}

	// 1
	navigateAbove(): void {
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
		console.log(a)
		if (!a) throw new Error('four')
		const node = f(a)
		let x = node?.getAttribute('data-lava-orientation')
		if (!x) x = 'vertical'
		if (x !== 'vertical' && x !== 'horizontal') {
			console.log('v', node)
			throw new Error('invalid value of orientation')
		}
		if (node) {
			this.changeOrientation({
				node,
				orientation: x,
			})
		} else {
			this.currentOrientation = x
		}
		const n = findParentNode(this.currentPosition)
		this.changeHighlight(n)
	}

	navigateBelow(): void {
		const node = findChildNode(this.currentPosition)
		this.changeOrientation({
			node: this.currentPosition,
			orientation: this.currentOrientation,
		})
		this.changeHighlight(node)
	}

	// 2
	navigateLeft(): void {
		const node = findSiblingLeftNode(this.currentPosition)
		console.log(node)
		this.changeHighlight(node)
	}

	navigateDown() {
		this.navigateBelow()
	}

	navigateUp(): void {
		const node = findSiblingLeftNode(this.currentPosition)
		this.changeHighlight(node)
	}

	navigateRight(): void {
		const node = findSiblingRightNode(this.currentPosition)
		this.changeHighlight(node)
	}

	getHandlerKeyDown() {
		return (ev: KeyboardEvent): void => {
			this.dealWithModeSwitching(ev)

			if (this.currentMode === 'navigation') {
				ev.preventDefault()

				// 1
				if (ev.code === 'KeyU') {
					this.navigateAbove()
				} else if (ev.code === 'KeyM') {
					this.navigateBelow()
				}

				// 2
				if (this.currentOrientation === 'vertical') {
					if (ev.code === 'KeyJ') {
						this.navigateRight()
					} else if (ev.code === 'KeyK') {
						this.navigateLeft()
					}
				} else if (this.currentOrientation === 'horizontal') {
					if (ev.code === 'KeyH') {
						this.navigateLeft()
					} else if (ev.code === 'KeyL') {
						this.navigateRight()
					}
				}
			}
		}
	}

	getHandlerKeypress() {
		return (ev: KeyboardEvent) => {}
	}

	getHandlerKeyup() {
		return (ev: KeyboardEvent) => {}
	}
}
export const lavaKey = new LavakeyManager()
