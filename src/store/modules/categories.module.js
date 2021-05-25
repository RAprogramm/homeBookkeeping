import {db} from '@/firebase'
import { getAuth } from "firebase/auth"
import {doc, collection, setDoc, updateDoc, getDocs, query, onSnapshot} from 'firebase/firestore'

export default {
	namespaced: true,
	actions: {
		async createCat({dispatch}, {title, limit}) {
			try {
				const user = await getAuth().currentUser
				const userData = await doc(collection(db, 'users'), user.uid)
				const newCat = await doc(collection(userData, 'categories'))
				await setDoc(newCat, {
					title,
					limit
				}, {merge: true})
				dispatch('setMessage', {
					value: `Category "${title}" with limit ${limit} was created!`,
					type: 'primary'
				}, {root: true})
				return {title, limit, id: newCat.id}
			} catch (error) {
				dispatch('setMessage', {
					value: error.message,
					type: 'danger'
				}, {root: true})
			}
		},
		async editCat({dispatch}, {title, limit, category}) {
			try {
				const user = await getAuth().currentUser
				const userData = await doc(collection(db, 'users'), user.uid)
				const updateCat = await doc(collection(userData, 'categories'), category)
				await updateDoc(updateCat, {
					title,
					limit
				}, {merge: true})
				dispatch('setMessage', {
					value: `Category was updated! New title is "${title}"`,
					type: 'primary'
				}, {root: true})
			} catch (error) {
				dispatch('setMessage', {
					value: error.message,
					type: 'danger'
				}, {root: true})
			}
		},
		async getCategories({dispatch}) {
			try {
				const user = await getAuth().currentUser
				const userData = await doc(collection(db, 'users'), user.uid)
				const userCatList = await getDocs(collection(userData, 'categories'))
				return userCatList.docs.map(doc => ({id: doc.id, ...doc.data()}))
			} catch (error) {
				dispatch('setMessage', {
					value: error.message,
					type: 'danger'
				}, {root: true})
			}
		}
	}
}
