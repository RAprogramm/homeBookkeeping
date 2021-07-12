<template>
	<ProgressSpinner v-if="loading" />
	<div class="app-main-layout" v-else>
		<Panel>
			<template #header>
				<Button
					icon="pi pi-arrow-right"
					@click="visibleLeft = true"
					v-tooltip="t('Sidebar.tooltip')"
				/>
				<strong>{{ currencyFilter($store.getters['user/info'].bill) }}</strong>
			</template>

			<template #icons>
				<strong class="userName">{{ name }}</strong>
				<button
					class="p-panel-header-icon p-link p-mr-2"
					style="marginLeft: 1rem"
					@click.prevent="toggle"
					v-tooltip.bottom="t('Menu.tooltip')"
				>
					<span class="pi pi-cog" style="fontSize: 1.5rem"></span>
				</button>
				<Menu id="config_menu" ref="menu" :model="menuItems" :popup="true" />
			</template>

			<div class="app-page">
				<router-view />
			</div>
		</Panel>

		<Sidebar v-model:visible="visibleLeft" :baseZIndex="1000">
			<h2 style="marginBottom: 3rem">{{ t('Page.mainTitle') }}</h2>
			<ul class="sideNav">
				<router-link
					class="sideItem"
					v-for="l in links"
					:key="l.url"
					@click="visibleLeft = false"
					tag="li"
					:to="l.url"
				>
					<i :class="l.icon" class="sideItemIcon" style="fontSize: 1.3rem" />
					<span style="marginLeft: 3rem">{{ l.label }}</span>
				</router-link>
			</ul>
		</Sidebar>
	</div>
</template>

<script>
import { computed, reactive, watch, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import ProgressSpinner from 'primevue/progressspinner'
import Panel from 'primevue/panel'
import Menu from 'primevue/menu'
import Sidebar from 'primevue/sidebar'
import currencyFilter from '@/utils/currency'
import { useI18n } from 'vue-i18n'

export default {
	components: { Panel, Sidebar, ProgressSpinner, Menu },
	setup() {
		const store = useStore()
		const i18n = useI18n()
		const router = useRouter()
		const loading = ref(true)
		const visibleLeft = ref(false)
		const menu = ref(null)
		const collapsed = ref(true)
		const name = computed(() => store.getters['user/info'].name)

		onMounted(async () => {
			if (!Object.keys(store.getters['user/info']).lenght) {
				await store.dispatch('user/getAuthUser')
			}
			i18n.locale.value = store.getters['user/info'].language
			loading.value = false
		})

		const menuItems = reactive([
			{
				label: i18n.t('Menu.set'),
				items: [
					{
						label: i18n.t('Profile.title'),
						icon: 'pi pi-user',
						command: () => {
							router.push('/profile')
						}
					}
				]
			},
			{
				label: i18n.t('Menu.nav'),
				items: [
					{
						label: i18n.t('Menu.exit'),
						icon: 'pi pi-sign-out',
						command: async () => {
							await store.dispatch('auth/logout')
							store.commit('user/clearInfo')
							router.push('/login?message=logout')
						}
					}
				]
			}
		])
		const links = reactive([
			{ label: i18n.t('Sidebar.account'), url: '/', icon: 'pi pi-wallet' },
			{
				label: i18n.t('Sidebar.hist'),
				url: '/history',
				icon: 'pi pi-chart-line'
			},
			{
				label: i18n.t('Sidebar.plan'),
				url: '/planning',
				icon: 'pi pi-percentage'
			},
			{
				label: i18n.t('Sidebar.rec'),
				url: '/record',
				icon: 'pi pi-plus-circle'
			},
			{ label: i18n.t('Sidebar.cat'), url: '/categories', icon: 'pi pi-book' }
		])
		const toggle = (event) => {
			menu.value.toggle(event)
		}

		return {
			...useI18n(),
			currencyFilter,
			menu,
			collapsed,
			toggle,
			links,
			loading,
			visibleLeft,
			name,
			menuItems
		}
	}
}
</script>

<style scoped>
ul:not(.browser-default) {
	padding-left: 0;
	list-style-type: none;
}
</style>
