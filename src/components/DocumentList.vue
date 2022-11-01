<template>
	<h2>Groups</h2>
	<div class="new-group">
		<p>New Group:</p>
		<FormKit type="text" v-model="newGroupName" />
		<FormKit type="submit" @click="groupNew()" />
	</div>
	<div v-for="group in groups" :key="group" class="group-block">
		<GroupList :name="group" :refreshFn="refreshGroupList" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { FormKit } from '@formkit/vue'
import GroupList from '@/components/GroupList.vue'
import * as schema from '@/../common/schema'
import * as api from '@/util/clientApi'

export default defineComponent({
	components: {
		GroupList,
		FormKit,
	},
	setup() {
		const newGroupName = ref('')
		const groups = ref<schema.groupListResponseType['groups']>([])

		onMounted(async () => {
			await refreshGroupList()
		})

		function groupNew() {
			api.groupCreate(newGroupName.value)
			refreshGroupList()
		}

		function groupDelete(name: string) {
			if (confirm(`Confirm deletion of: ${name}`)) {
				api.groupDelete(name)
				refreshGroupList()
			}
		}

		async function refreshGroupList() {
			const result = await api.groupList()
			if (!result) return

			groups.value = result.groups
		}

		return {
			newGroupName,
			groups,

			groupNew,
			groupDelete,
			refreshGroupList,
		}
	},
})
</script>

<style scoped>
.new-group {
	display: flex;
	gap: 5px;
}

.group-block {
	margin-block-end: 15px;
	border: 1px solid darkgray;
}

.group-list {
	display: flex;
	gap: 5px;
}
</style>
