import {ref, computed} from 'vue'


export function usePagination() {
	const page = ref(1)
	const pageSize = ref(5)
	const pageCount = ref(0)
	const allItems = ref([])
	const items = ref([])

	const chunk = (input, size) => {
		return input.reduce((arr, item, idx) => {
			return idx % size === 0
				? [...arr, [item]]
				: [...arr.slice(0, -1), [...arr.slice(-1)[0], item]]
		}, [])
	}

	const setupPagination = payload => {
		allItems.value = chunk(payload, pageSize.value)
		console.log(allItems.value)
		// pageCount.value = Object.keys(allItems.value).length
		// console.log(pageCount.value)
		// items.value = allItems.value[page.value - 1] || allItems.value[0]
		// console.log(items.value)
	}
		const pageChangeHandler = page => {
			console.log('paginator', page)
			items.value = allItems.value[page.page - 1] || allItems.value[0]
		}

	// const firstPage = () => {
	// 	page.value = 1
	// 	items.value = allItems.value[page.value - 1] || allItems.value[0]
	// }
	// const prevPage = () => {
	// 	page.value -= 1
	// 	items.value = allItems.value[page.value - 1] || allItems.value[0]
	// }
	// const numberPage = target => {
	// 	page.value = target
	// 	items.value = allItems.value[page.value - 1] || allItems.value[0]
	// }
	// const nextPage = () => {
	// 	page.value += 1
	// 	items.value = allItems.value[page.value - 1] || allItems.value[0]
	// }
	// const lastPage = () => {
	// 	page.value = pageCount.value
	// 	items.value = allItems.value[page.value - 1] || allItems.value[0]
	// }

	return {
		pageChangeHandler,
		page,
		pageSize,
		pageCount,
		allItems,
		items,
		setupPagination
	}
}
