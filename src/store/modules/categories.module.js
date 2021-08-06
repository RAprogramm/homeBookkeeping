import { db } from '@/firebase'
import { getAuth } from 'firebase/auth'
import {
	doc,
	getDoc,
	collection,
	setDoc,
	updateDoc,
	getDocs
} from 'firebase/firestore'

export default {
	namespaced: true,
	actions: {
		async createCat({ commit }, { title, limit }) {
			try {
				const user = await getAuth().currentUser
				const userData = await doc(collection(db, 'users'), user.uid)
				const newCat = await doc(collection(userData, 'categories'))
				await setDoc(
					newCat,
					{
						title,
						limit
					},
					{ merge: true }
				)
				commit(
					'setMessage',
					{
						value: `createCat`,
						type: 'success'
					},
					{ root: true }
				)
				return { title, limit, id: newCat.id }
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
		async editCat({ commit }, { title, limit, category }) {
			try {
				const user = await getAuth().currentUser
				const userData = await doc(collection(db, 'users'), user.uid)
				const updateCat = await doc(
					collection(userData, 'categories'),
					category
				)
				await updateDoc(
					updateCat,
					{
						title,
						limit
					},
					{ merge: true }
				)
				commit(
					'setMessage',
					{
						value: 'updateCat',
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
		},
		async getCategories({ commit }) {
			try {
				const user = await getAuth().currentUser
				const userData = await doc(collection(db, 'users'), user.uid)
				const userCatList = await getDocs(collection(userData, 'categories'))
				return userCatList.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
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
		async getCategoryById({ commit }, categoryId) {
			try {
				const user = await getAuth().currentUser
				const userData = await doc(collection(db, 'users'), user.uid)
				const userCatList = await doc(
					collection(userData, 'categories'),
					categoryId
				)
				const categoryData = await getDoc(userCatList)
				return categoryData.data()
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
	}
}
