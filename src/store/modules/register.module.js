import {db} from '@/firebase'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import {doc, collection, setDoc} from 'firebase/firestore'

export default {
	namespaced: true,
	actions: {
		async createUser({commit, dispatch}, {email, password, name}) {
			const auth = getAuth()
			await createUserWithEmailAndPassword(auth, email, password)
				.then(async(userCredential) => {
					const uid = userCredential.user.uid
					const authUserData = await doc(collection(db, 'users'), uid)
					const authUserInfo = await doc(collection(authUserData, 'info'), 'about')
					await setDoc(authUserInfo, {
						name,
						email,
						bill: 10000
					})
					dispatch('setMessage', {
						value: `User ${name} was created! Now login system`,
						type: 'primary'
					}, {root: true})
				})
				.catch((e) => {
					const error = e.message
					dispatch('setMessage', {
						value: error,
						type: 'danger'
					}, {root: true})
					throw new Error()
				})
		}
	}
}
