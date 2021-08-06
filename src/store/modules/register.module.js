import { db } from '@/firebase'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, collection, setDoc } from 'firebase/firestore'

export default {
	namespaced: true,
	actions: {
		async createUser(
			{ commit },
			{ email, password, name, bill, language, currency }
		) {
			const auth = getAuth()
			await createUserWithEmailAndPassword(auth, email, password)
				.then(async (userCredential) => {
					const uid = userCredential.user.uid
					const authUserData = await doc(collection(db, 'users'), uid)
					const authUserInfo = await doc(
						collection(authUserData, 'info'),
						'about'
					)
					await setDoc(authUserInfo, {
						name,
						email,
						bill,
						language,
						currency
					})
					commit(
						'setMessage',
						{
							value: `createUser`,
							type: 'success'
						},
						{ root: true }
					)
				})
				.catch((e) => {
					const error = e.message
					commit(
						'setMessage',
						{
							value: error,
							type: 'error'
						},
						{ root: true }
					)
					throw new Error()
				})
		}
	}
}
