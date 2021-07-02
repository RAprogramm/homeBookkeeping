import {firebaseApp} from '@/firebase'
import {getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth'

const auth = getAuth()

export default {
	namespaced: true,
	actions: {
		async login({commit}, {email, password}) {
			await signInWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					commit('setMessage', {
						value: 'Вы вошли в систему',
						type: 'success'
					}, {root: true})
				})
				.catch((error) => {
					const errorMessage = error.message
					commit('setMessage', {
						value: errorMessage,
						type: 'error'
					}, {root: true})
					throw new Error()
				})
		},
		async logout({commit}) {
			await signOut(auth)
				.then(() => {})
				.catch((error) => {
				const errorMessage = error.message
				commit('setMessage', {
					value: errorMessage,
					type: 'error'
				}, {root: true})
			})
		}
	}
}
