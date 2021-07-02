import {db} from '@/firebase'
import { getAuth } from "firebase/auth"
import {orderBy, where, doc, collection, collectionGroup, setDoc, updateDoc, getDocs,getDoc, query, onSnapshot} from 'firebase/firestore'

export default {
	namespaced: true,
	actions: {
		async createRecord({commit}, {category, type, amount, description}) {
			try {
				const user = await getAuth().currentUser
				const userData = await doc(collection(db, 'users'), user.uid)
				const userCat = await doc(collection(userData, 'categories'), category)
				const catData = await getDoc(userCat)
				const newRecord = await doc(collection(userCat, 'records'))
				await setDoc(newRecord, {
					categoryId: category,
					type,
					amount,
					description,
					date: new Date().toJSON()
				})
				commit('setMessage', {
					value: `Запись была создана!`,
					type: 'success'
				}, {root: true})
			} catch (error) {
				commit('setMessage', {
					value: error.message,
					type: 'error'
				}, {root: true})
			}
		},
		async getRecords({commit}) {
			try {
				const user = await getAuth().currentUser
				const userData = await doc(collection(db, 'users'), user.uid)
				const userCatList = await getDocs(collection(userData, 'categories'))
				const test = userCatList.docs.map(doc => doc.id)

				const records = await Promise.all(test.map(async(id) => {
					const userRecordsTest = await doc(collection(userData, 'categories'), id)
					const test2 = await getDocs(collection(userRecordsTest, 'records'))
					return test2.docs.map(doc => ({id: doc.id, ...doc.data()}))
				}))
				return records.flat()
			} catch (error) {
				commit('setMessage', {
					value: error.message,
					type: 'error'
				}, {root: true})
			}
		},
		async getRecordById({commit}, recordId) {
			try {
				const user = await getAuth().currentUser
				const userData = await doc(collection(db, 'users'), user.uid)
				const userCatList = await getDocs(collection(userData, 'categories'))
				const test = userCatList.docs.map(doc => doc.id)

				const records = await Promise.all(test.map(async(catsIds) => {
					const userRecordsTest = await doc(collection(userData, 'categories'), catsIds)
					const test2 = await doc(collection(userRecordsTest, 'records'), recordId)
					const test3 = await getDoc(test2)
					return {
						...test3.data(),
					}
				}))
				const isEmpty = x => !Object.keys(x).length
				const test4 = records.filter(i => isEmpty(i) === false)
				return test4[0]
			} catch (error) {
				commit('setMessage', {
					value: error.message,
					type: 'error'
				}, {root: true})
			}
		}
	}
}
