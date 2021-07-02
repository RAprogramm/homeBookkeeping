<template>
	<Loader v-if="loading"/>
	<div class="app-main-layout" v-else>
		<Panel>
		<template #header>
			<Button icon="pi pi-arrow-right" @click="visibleLeft = true" v-tooltip="'Панель навигации'"/>
		</template>

		<template #icons>
			<strong class="userName">{{name}}</strong>
			<button 
				class="p-panel-header-icon p-link p-mr-2" 
				style="marginLeft: 1rem" 
				@click.prevent="toggle"
				v-tooltip.bottom="'Меню'"
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
			<h2 style="marginBottom: 3rem">Домашняя бухгалтерия</h2>
			<ul class="sideNav" >
				<router-link
						class="sideItem"
						v-for="l in links" 
						:key="l.url"
						@click="visibleLeft = false"
						tag="li"
						:to="l.url"
				>
				<i :class="l.icon" class="sideItemIcon" style="fontSize: 1.3rem"/>
				<span style="marginLeft: 3rem">{{l.label}}</span>
				</router-link>
			</ul>
		</Sidebar>

	</div>
</template>

<script>
import {computed, reactive, watch, ref, onMounted} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import Loader from '@/components/ui/Loader'
import Panel from 'primevue/panel';
import Menu from 'primevue/menu'
import Sidebar from 'primevue/sidebar';


export default {
	components: {Panel, Sidebar, Loader, Menu},
	setup() {
		const store =useStore()
		const router = useRouter()
		const loading = ref(true)
		const visibleLeft = ref(false)
		const menu = ref(null);
		const collapsed = ref(true);
		const name = computed(() => store.getters['user/info'].name)
		const menuItems = reactive([
			{
				label: 'Настройки',
				items: [{
					label: 'Профиль',
					icon: 'pi pi-user',
					command: () => {
						router.push('/profile')
					}
				}]
			},
			{
				label: 'Навигация',
				items: [{
					label: 'Выйти',
					icon: 'pi pi-sign-out',
					command: async () => {
						await store.dispatch('auth/logout')
						store.commit('user/clearInfo')
						router.push('/login?message=logout')
					}
				}]
			}
		])
		const links = reactive([
			{label: 'Счёт', url: '/', icon: 'pi pi-wallet'},
			{label: 'История', url: '/history', icon:'pi pi-chart-line'},
			{label: 'Планирование', url: '/planning', icon: 'pi pi-percentage'},
			{label: 'Новая запись', url: '/record', icon: 'pi pi-plus-circle'},
			{label: 'Категории', url: '/categories', icon: 'pi pi-book'},
		])
		const toggle = (event) => {
			menu.value.toggle(event);
		}

		onMounted(async() => {
			if (!Object.keys(store.getters['user/info']).lenght) {
				await store.dispatch('user/getAuthUser')
			}
			loading.value = false
		})

		return {
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
