<template>
	<Menu ref="menu" :model="menuItems" :popup="true" />
</template>

<script>
import { watch, ref } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import Menu from 'primevue/menu'

export default {
	components: { Menu },
	setup() {
		const store = useStore()
		const { locale, t } = useI18n()
		const menu = ref(null)
		const menuItems = ref([
			{
				label: t('Menu.set'),
				items: [
					{
						label: t('Profile.title'),
						icon: 'pi pi-user',
						to: { name: 'Profile' }
					}
				]
			},
			{
				label: t('Menu.nav'),
				items: [
					{
						label: t('Menu.exit'),
						icon: 'pi pi-sign-out',
						to: '/login?message=logout',
						command: async () => {
							await store.dispatch('auth/logout')
							store.commit('user/clearInfo')
						}
					}
				]
			}
		])
		const toggle = (event) => {
			menu.value.toggle(event)
		}
		watch(locale, (val) => {
			menuItems.value = [
				{
					label: t('Menu.set'),
					items: [
						{
							label: t('Profile.title'),
							icon: 'pi pi-user',
							to: { name: 'Profile' }
						}
					]
				},
				{
					label: t('Menu.nav'),
					items: [
						{
							label: t('Menu.exit'),
							icon: 'pi pi-sign-out',
							to: '/login?message=logout',
							command: async () => {
								await store.dispatch('auth/logout')
								store.commit('user/clearInfo')
							}
						}
					]
				}
			]
		})
		return {
			menuItems,
			toggle,
			menu
		}
	}
}
</script>

<style></style>
