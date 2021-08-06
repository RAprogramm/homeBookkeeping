<template>
	<Sidebar v-model:visible="visibleLeft" :baseZIndex="1000">
		<h2 style="marginBottom: 3rem">{{ $t('Page.mainTitle') }}</h2>
		<ul class="sideNav">
			<transition-group name="list" appear mode="out-in">
				<router-link
					class="sideItem"
					v-for="l in links"
					:key="l.url"
					@click="visibleLeft = false"
					tag="li"
					:to="l.url"
				>
					<i :class="l.icon" class="sideItemIcon" style="fontSize: 1.3rem" />
					<span style="marginLeft: 3rem">{{ $t(l.label) }}</span>
				</router-link>
			</transition-group>
		</ul>
	</Sidebar>
</template>

<script>
import { ref } from 'vue'
import Sidebar from 'primevue/sidebar'

export default {
	components: { Sidebar },
	setup() {
		const visibleLeft = ref(false)
		const links = ref([
			{
				label: 'Sidebar.account',
				url: { name: 'Account' },
				icon: 'pi pi-wallet'
			},
			{
				label: 'Sidebar.hist',
				url: { name: 'History' },
				icon: 'pi pi-chart-line'
			},
			{
				label: 'Sidebar.plan',
				url: { name: 'Planning' },
				icon: 'pi pi-percentage'
			},
			{
				label: 'Sidebar.rec',
				url: { name: 'Record' },
				icon: 'pi pi-plus-circle'
			},
			{ label: 'Sidebar.cat', url: { name: 'Categories' }, icon: 'pi pi-book' }
		])

		return {
			visibleLeft,
			links
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
