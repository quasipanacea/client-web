export function findParentNode(node: Element): Element | null {
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

	return findNode(startNode)
}

export function findChildNode(node: Element): Element | null {
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
	return findNode(startNode)
}

export function findSiblingLeftNode(node: Element): Element | null {
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
	if (!startNode) return null

	return findNode(startNode)
}

export function findSiblingRightNode(node: Element): Element | null {
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
	if (!startNode) return null

	return findNode(startNode)
}

export function findFirstEnterableNode(node: Element): Element | null {
	
}
