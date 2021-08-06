<template>
	<Panel :toggleable="false" :collapsed="true">
		<template #header>
			<Button
				icon="pi pi-arrow-right"
				@click.prevent="$emit('showSidebar')"
				v-tooltip="$t('Sidebar.tooltip')"
			/>
			<strong>{{ currencyFilter($store.getters['user/info'].bill) }}</strong>
		</template>

		<template #icons>
			<strong class="userName">{{ name }}</strong>
			<Button
				class="p-panel-header-icon p-link p-mr-2"
				style="marginLeft: 1rem"
				@click.prevent="openMenu"
				v-tooltip.bottom="$t('Menu.tooltip')"
			>
				<span class="pi pi-cog" style="fontSize: 1.5rem" />
			</Button>

			<NavbarMenu ref="showMenu" />
		</template>
	</Panel>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import NavbarMenu from '@/components/navbar/NavbarMenu'
import Panel from 'primevue/panel'
import currencyFilter from '@/utils/currency'
import Page from '@/components/ui/Page'

export default {
	components: { NavbarMenu, Panel, Page },
	setup() {
		const store = useStore()
		const showMenu = ref(null)
		const name = computed(() => store.getters['user/info'].name)

		const openMenu = (event) => {
			showMenu.value.toggle(event)
		}

		return {
			currencyFilter,
			showMenu,
			openMenu,
			name
		}
	}
}
</script>
