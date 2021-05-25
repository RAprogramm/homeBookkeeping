import {getAuth} from 'firebase/auth' 
import {doc, getDoc, collection} from 'firebase/firestore'
import {db} from '@/firebase'

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
		async getAuthUser({dispatch, commit}) {
			try {
				const user = await getAuth().currentUser
				const userData = await doc(collection(db, 'users'), user.uid)
				const userInfo = await doc(collection(userData, 'info'), 'about')


				const userInfoAbout = await getDoc(userInfo)
				if (userInfoAbout.exists()) {
					const info = userInfoAbout.data()
					commit('setInfo', info)
				} 
				// -------------------------------------------
				// "unsubscribe" from listener is required 
				//
				// onSnapshot(userInfo, (doc) => {
				// 	const info = doc.data()
				// 	commit('setInfo', info)
				// })

			} catch (error) {
				console.log(error.message)
				dispatch('setMessage', {
					value: error.message,
					type: 'danger'
				}, {root: true})
			}
		}
	},
	getters: {
		info(state) {
			return state.info
		}
	}
}
