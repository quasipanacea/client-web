<template>
	<div style="display: flex; align-items: center; gap: 3px">
		<h1>Areas</h1>
		<FormKit type="button" @click="loadAreas">Refresh</FormKit>
	</div>
	<ul v-for="area in areas" :key="area">
		<div
			style="display: flex; justify-content: space-between; max-width: 150px"
		>
			<li @click="areaClick(area)">
				{{ area }}
			</li>
			<FormKit type="submit" @click="removeArea(area)">Delete</FormKit>
		</div>
	</ul>
	<div style="display: flex">
		<FormKit type="text" v-model="newAreaName" /><FormKit
			type="button"
			@click="addArea"
			>New</FormKit
		>
	</div>

	<h1>Topics of {{ currentArea }}</h1>
	<ul v-for="topic in topics" :key="topic">
		<div
			style="display: flex; justify-content: space-between; max-width: 150px"
		>
			<li @click="topicClick(topic)">{{ topic }}</li>
			<FormKit type="submit" @click="removeTopic(topic)">Delete</FormKit>
		</div>
	</ul>
	<div style="display: flex">
		<FormKit type="text" v-model="newTopicName" /><FormKit
			type="button"
			@click="addTopic"
			>New</FormKit
		>
	</div>

	<h1>Notes of {{ currentTopic }}</h1>
	<ul v-for="note in notes" :key="note">
		<div
			style="display: flex; justify-content: space-between; max-width: 150px"
		>
			<li>
				<router-link
					:to="`/note?area=${currentArea}&topic=${currentTopic}&note=${note}`"
					>{{ note }}</router-link
				>
			</li>
			<FormKit type="submit" @click="removeNote(note)">Delete</FormKit>
		</div>
	</ul>
	<div style="display: flex">
		<FormKit type="text" v-model="newNoteName" /><FormKit
			type="button"
			@click="addNote"
			>New</FormKit
		>
	</div>
</template>

<script lang="ts">
import { FormKit } from '@formkit/vue'
import { defineComponent, ref } from 'vue'
import * as api from '@/util/clientApiV2'

export default defineComponent({
	components: {
		FormKit,
	},
	setup() {
		const currentArea = ref('')
		const areas = ref<string[]>([])
		const newAreaName = ref('')

		async function loadAreas() {
			const result = await api.areaList({})
			if (!result) return

			areas.value = result.areas
		}
		async function addArea() {
			const result = await api.areaAdd({
				name: newAreaName.value,
			})
			if (!result) return

			await loadAreas()
			newAreaName.value = ''
		}
		async function areaClick(newArea: string) {
			currentArea.value = newArea
			if (currentArea.value) {
				await loadTopics(currentArea.value)
			}
		}
		async function removeArea(areaName: string) {
			const result = await api.areaRemove({
				name: areaName,
			})
			if (!result) return

			await loadAreas()
			currentArea.value = areas.value[0]
			if (currentArea.value) {
				await loadTopics(currentArea.value)
			}

			currentTopic.value = topics.value[0]
			if (currentArea.value && currentTopic.value) {
				await loadNotes(currentArea.value, currentTopic.value)
			}
		}

		// topics
		const currentTopic = ref('')
		const topics = ref<string[]>([])
		const newTopicName = ref('')
		async function loadTopics(areaName: string) {
			const result = await api.topicList({
				area: areaName,
			})
			if (!result) return

			topics.value = result.topics
		}
		async function topicClick(newTopic: string) {
			currentTopic.value = newTopic
			if (currentArea.value && currentTopic.value) {
				await loadNotes(currentArea.value, currentTopic.value)
			}
		}
		async function addTopic() {
			const result = await api.topicAdd({
				area: currentArea.value,
				name: newTopicName.value,
			})
			if (!result) return

			await loadTopics(currentArea.value)
			newTopicName.value = ''
		}
		async function removeTopic(topicName: string) {
			const result = await api.topicRemove({
				area: currentArea.value,
				name: topicName,
			})
			if (!result) return

			await loadTopics(currentArea.value)
			currentTopic.value = topics.value[0]
			if (currentArea.value && currentTopic.value) {
				await loadNotes(currentArea.value, currentTopic.value)
			}
		}

		// notes
		const notes = ref<string[]>([])
		const newNoteName = ref('')
		async function loadNotes(areaName: string, topicName: string) {
			const result = await api.noteList({
				area: areaName,
				topic: topicName,
			})
			if (!result) return

			notes.value = result.notes
		}
		async function addNote() {
			const result = await api.noteAdd({
				area: currentArea.value,
				topic: currentTopic.value,
				name: newNoteName.value,
			})
			if (!result) return

			if (currentArea.value && currentTopic.value) {
				await loadNotes(currentArea.value, currentTopic.value)
			}
			newNoteName.value = ''
		}
		async function removeNote(noteName: string) {
			const result = await api.noteRemove({
				area: currentArea.value,
				topic: currentTopic.value,
				name: noteName,
			})
			if (!result) return

			if (currentArea.value && currentTopic.value) {
				await loadNotes(currentArea.value, currentTopic.value)
			}
		}

		;(async () => {
			await loadAreas()

			currentArea.value = areas.value[0]
			if (currentArea.value) {
				await loadTopics(currentArea.value)
			}

			currentTopic.value = topics.value[0]
			if (currentArea.value && currentTopic.value) {
				await loadNotes(currentArea.value, currentTopic.value)
			}
		})()

		return {
			currentArea,
			areas,
			newAreaName,
			loadAreas,
			addArea,
			removeArea,
			areaClick,

			currentTopic,
			topicClick,
			topics,
			newTopicName,
			loadTopics,
			addTopic,
			removeTopic,

			notes,
			newNoteName,
			addNote,
			removeNote,
		}
	},
})
</script>
