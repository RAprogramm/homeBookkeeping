<template>
	<nav class="navbar orange lighten-1 testnav">
		<div class="nav-wrapper testwrapper">
			<button class="toggleSideBtn" @click.prevent="$emit('toggleSide')">≡</button>
			<div class="navbar-left testnavleft">
				<span class="black-text date"><strong>{{date}}</strong></span>
			</div>
			
				<NavDropdown>
					<template v-slot:toggler />
					<NavDropdownContent>
						<NavDropdownItem to="/profile">Профиль</NavDropdownItem>
						<NavDropdownItem @click.prevent="logout">Выйти</NavDropdownItem>
					</NavDropdownContent>
				</NavDropdown>

		</div>
	</nav>
</template>

<script>
import {onMounted, onUnmounted, ref, computed} from 'vue'
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
import NavDropdown from '@/components/dropdown/NavDropdown.vue'
import NavDropdownItem from '@/components/dropdown/NavDropdownItem.vue'
import NavDropdownContent from '@/components/dropdown/NavDropdownContent.vue'

export default {
	components: {NavDropdown, NavDropdownItem, NavDropdownContent},
	setup() {
		const date = ref(new Date())
		const store = useStore()
		const router = useRouter()
		const interval = ref(null)



		onMounted(() => {
			const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',hour: "2-digit", minute: "2-digit", second: "2-digit" }
			const dateTimeFormat = new Intl.DateTimeFormat('ru-RU', options);
			const interval = setInterval(() => {
				date.value = dateTimeFormat.format(new Date())
			}, 1000)
		})

		onUnmounted(() => {
			clearInterval(interval)
		})


		return {
			date: computed(() => date.value),
			logout: async () => {
				await store.dispatch('auth/logout')
				store.commit('user/clearInfo')
				router.push('/login?message=logout')
			}
		}
	}
}
</script>

<style>

</style>
