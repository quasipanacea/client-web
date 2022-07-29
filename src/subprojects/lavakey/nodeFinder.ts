export type NodeResult =
	| {
			node: null
	  }
	| {
			node: Element
			orientation: 'vertical' | 'horizontal'
	  }

function wrapNodeResult(node: Element | null): NodeResult {
	if (node) {
		// vertical is default
		const orientation = node.getAttribute('data-lava-orientation') || 'vertical'
		if (orientation !== 'vertical' && orientation !== 'horizontal') {
			throw new Error('invalid value of orientation')
		}

		return {
			node,
			orientation,
		}
	} else {
		return {
			node: null,
		}
	}
}

export function findParentNode(node: Element): NodeResult {
	const findNode = (currentNode: Element): Element | null => {
		if (currentNode.hasAttribute('data-lava')) {
			return currentNode
		}

		if (currentNode.parentElement) {
			const result = findNode(currentNode.parentElement)
			if (result) {
				return result
			}
		}

		return null
	}

	const startNode = node.parentElement
	if (!startNode) throw new Error('not start')

	return wrapNodeResult(findNode(startNode))
}

export function findChildNode(node: Element): NodeResult {
	const findNode = (startNode: Element): Element | null => {
		for (let i = 0; i < startNode.children.length; ++i) {
			const childNode = startNode.children[i]

			if (childNode.hasAttribute('data-lava')) {
				return childNode
			}

			if (childNode.children) {
				const result = findNode(childNode)
				if (result) {
					return result
				}
			}
		}

		return null
	}

	const startNode = node
	return wrapNodeResult(findNode(startNode))
}

export function findSiblingLeftNode(node: Element): NodeResult {
	const findNode = (startNode: Element): Element | null => {
		if (startNode.hasAttribute('data-lava')) {
			return startNode
		}

		if (startNode.previousElementSibling) {
			const result = findNode(startNode.previousElementSibling)
			if (result) {
				return result
			}
		}

		return null
	}

	const startNode = node.previousElementSibling
	if (!startNode) return { node: null }

	return wrapNodeResult(findNode(startNode))
}

export function findSiblingRightNode(node: Element): NodeResult {
	const findNode = (startNode: Element): Element | null => {
		if (startNode.hasAttribute('data-lava')) {
			return startNode
		}

		if (startNode.nextElementSibling) {
			const result = findNode(startNode.nextElementSibling)
			if (result) {
				return result
			}
		}

		return null
	}

	const startNode = node.nextElementSibling
	if (!startNode) return { node: null }

	return wrapNodeResult(findNode(startNode))
}
