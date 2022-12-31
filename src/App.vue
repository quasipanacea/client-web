<template>
	<nav class="root-nav-hack">
		<span @click="showSettings = true">
			<FeatherSettings />
		</span>
	</nav>
	<div class="root-view">
		<RouterView />
	</div>
	<!-- <nav class="root-nav">
		<a :class="{ 'hide-navbar': !showNavbar }" @click="showSettings = true">
			<FeatherSettings />
		</a>
		<a :class="{ 'hide-navbar': !showNavbar }" @click="showHelp = true"
			><FeatherHelp
		/></a>
	</nav> -->
	<dialog :open="showSettings" class="root-settings">
		<h1>Settings</h1>
		<select v-model="pluginsStore.currentPlugin">
			<option
				v-for="plugin in pluginsStore.plugins"
				:key="plugin"
				:value="plugin"
			>
				{{ plugin }}
			</option>
		</select>
		<button @click="showSettings = false">Close</button>
	</dialog>
	<dialog :open="showHelp" class="root-help">
		<button @click="showHelp = false">Close</button>
		<h1>Help</h1>
	</dialog>
	<ActionPopup />
	<LavakeyIndicator />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { usePluginsStore } from '@/stores/plugins'
import FeatherHelp from '@/components/icons/IconFeatherHelp.vue'
import FeatherSettings from '@/components/icons/IconFeatherSettings.vue'
import ActionPopup from '@/subprojects/actionpopup/ActionPopup.vue'
import LavakeyIndicator from '@/subprojects/lavakey/LavakeyIndicator.vue'

export default defineComponent({
	setup() {
		const pluginsStore = usePluginsStore()

		const showNavbar = ref(true)
		const showSettings = ref(false)
		const showHelp = ref(false)

		return {
			showNavbar,
			showSettings,
			showHelp,
			pluginsStore,
		}
	},
	components: {
		FeatherHelp,
		FeatherSettings,
		ActionPopup,
		LavakeyIndicator,
	},
})
</script>

<style>
@import './subprojects/lavakey/style.css';
</style>

<style lang="postcss">
@import './assets/base.css';
/* @import 'bulma/css/bulma.css'; */

:root {
	--oc-white: #ffffff;
	--oc-black: #000000;

	--oc-gray-0: #f8f9fa;
	--oc-gray-1: #f1f3f5;
	--oc-gray-2: #e9ecef;
	--oc-gray-3: #dee2e6;
	--oc-gray-8: #343a40;
	--oc-gray-9: #212529;

	--nav-border: 5px;
	--settings-border: 10px;
}

html,
body {
	height: 100%;
	overflow: hidden;
}

#app {
	height: 100%;
}

.root-nav-hack {
	display: flex;
	background-color: var(--oc-gray-1);
	box-shadow: 2px 2px 3px var(--oc-gray-2);

	& > span {
		margin: 2px;
		cursor: pointer;
	}

	& > span > svg {
		display: block;
	}
}

.root-view {
	position: absolute;
	width: 100%;
	height: 100%;
	overflow: auto;
}

/* It would be a lot cleaner to use Flexbox and 'justify-content: space-between',
   but that hinders the selectability of elements behind the header. This felt cleaner
   than setting a bunch of z-indexes.
*/
.root-nav {
	& > a {
		background-color: var(--oc-gray-9);
		color: var(--oc-gray-1);
		padding: 3px;
		transition: 100ms ease-in-out transform;
	}

	& > a.hide-navbar {
		transform: translateY(-30px);
	}

	& > a > svg {
		display: block;
	}

	& > *:first-child {
		position: absolute;
		top: 0;
		left: 0;
		border-bottom-right-radius: var(--nav-border);
	}

	/* & > *:nth-child(2) {
		position: absolute;
		top: 0;
		left: 50%;
		transform: translate(-50%, 0);
		padding-inline: var(--nav-border);
		border-bottom-right-radius: var(--nav-border);
		border-bottom-left-radius: var(--nav-border);
	} */

	& > *:last-child {
		position: absolute;
		top: 0;
		right: 0;
		border-bottom-left-radius: var(--nav-border);
	}
}

.root-settings,
.root-help {
	margin-top: 20%;
	width: 400px;
	min-height: 200px;
	background-color: var(--oc-gray-9);
	color: var(--oc-gray-1);
	border-radius: var(--settings-border);
	border: 0 none;
}
</style>
