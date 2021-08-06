import { getAuth } from 'firebase/auth'
import { doc, getDoc, collection, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase'

export default {
	namespaced: true,
	state() {
		return {
			info: {}
		}
	},
	mutations: {
		setInfo(state, info) {
			state.info = info
		},
		clearInfo(state) {
			state.info = {}
		}
	},
	actions: {
		async getAuthUser({ commit }) {
			try {
				const user = await getAuth().currentUser
				const userData = await doc(collection(db, 'users'), user.uid)
				const userInfo = await doc(collection(userData, 'info'), 'about')

				const userInfoAbout = await getDoc(userInfo)
				if (userInfoAbout.exists()) {
					const info = userInfoAbout.data()
					commit('setInfo', info)
				}
			} catch (error) {
				commit(
					'setMessage',
					{
						value: error.message,
						type: 'error'
					},
					{ root: true }
				)
			}
		},
		async updateInfo({ commit, getters }, toUpdate) {
			try {
				const user = await getAuth().currentUser
				const userData = await doc(collection(db, 'users'), user.uid)
				const userInfo = await doc(collection(userData, 'info'), 'about')
				const updateData = { ...getters.info, ...toUpdate }
				await updateDoc(userInfo, updateData, { merge: true })
				commit('setInfo', updateData)
				commit(
					'setMessage',
					{
						value: 'updateInfo',
						type: 'success'
					},
					{ root: true }
				)
			} catch (error) {
				commit(
					'setMessage',
					{
						value: error.message,
						type: 'error'
					},
					{ root: true }
				)
			}
		}
	},
	getters: {
		info(state) {
			return state.info
		}
	}
}
