import {firebaseApp} from '@/firebase'
import {getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth'

const auth = getAuth()

export default {
	namespaced: true,
	actions: {
		async login({commit, dispatch}, {email, password}) {
			await signInWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					commit('clearMessage', null, {root: true})
				})
				.catch((error) => {
					const errorMessage = error.message
					dispatch('setMessage', {
						value: errorMessage,
						type: 'danger'
					}, {root: true})
					throw new Error()
				})
		},
		async logout({commit}) {
			await signOut(auth)
				.then(() => {
				console.log('logout success')
			})
				.catch((error) => {
				const errorMessage = error.message
				dispatch('setMessage', {
					value: errorMessage,
					type: 'danger'
				}, {root: true})
			})
		}
	}
}
