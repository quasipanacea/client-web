<script setup lang="ts">
import { onMounted } from 'vue'
import { Springy } from '@/third_party/springy.js'

if (!import.meta.env.SSR) {
	onMounted(() => {
		var graph = new Springy.Graph()

		// make some nodes
		var node1 = graph.newNode({ label: 'Norway Spruce' })
		var node2 = graph.newNode({ label: 'Sicilian Fir' })
		var node3 = graph.newNode({ label: 'Sumatran Pine' })
		var node4 = graph.newNode({ label: 'Japanese Larch' })
		var node5 = graph.newNode({ label: 'Giant Sequoia' })

		// connect them with an edge
		graph.newEdge(node1, node2)
		graph.newEdge(node2, node3)
		graph.newEdge(node2, node4)
		graph.newEdge(node1, node4)
		graph.newEdge(node1, node5)

		var layout = new Springy.Layout.ForceDirected(
			graph,
			300.0, // Spring stiffness
			400.0, // Node repulsion
			0.5, // Damping
		)

		var canvas = document.getElementById('demo')
		var ctx = canvas.getContext('2d')

		var renderer = new Springy.Renderer(
			layout,
			function clear() {
				ctx.clearRect(0, 0, 650, 350)
			},
			function drawEdge(edge, p1, p2) {
				ctx.save()
				ctx.translate(650 / 2, 350 / 2)

				ctx.strokeStyle = 'rgba(0,0,0,0.15)'
				ctx.lineWidth = 3.0

				ctx.beginPath()
				ctx.moveTo(p1.x * 50, p1.y * 40)
				ctx.lineTo(p2.x * 50, p2.y * 40)
				ctx.stroke()

				ctx.restore()
			},
			function drawNode(node, p) {
				ctx.save()
				ctx.translate(650 / 2, 350 / 2)

				ctx.font = "18px 'IM Fell English', 'Times New Roman', serif"

				var width = ctx.measureText(node.data.label).width
				var x = p.x * 50
				var y = p.y * 40
				ctx.clearRect(x - width / 2.0 - 2, y - 10, width + 4, 20)
				ctx.fillStyle = '#000000'
				ctx.fillText(node.data.label, x - width / 2.0, y + 5)

				ctx.restore()
			},
		)

		renderer.start()
	})
}
</script>

<template>
	<h1>DragAndDropUniversePlugin</h1>
	<canvas id="demo" width="600" height="400" />
</template>
