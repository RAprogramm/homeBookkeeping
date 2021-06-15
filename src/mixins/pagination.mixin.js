import {ref, computed} from 'vue'


export function usePagination() {
	const page = ref(1)
	const pageSize = ref(3)
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
		pageCount.value = Object.keys(allItems.value).length
		items.value = allItems.value[page.value - 1] || allItems.value[0]
	}

	const firstPage = () => {
		page.value = 1
		items.value = allItems.value[page.value - 1] || allItems.value[0]
	}
	const prevPage = () => {
		page.value -= 1
		items.value = allItems.value[page.value - 1] || allItems.value[0]
	}
	const numberPage = target => {
		page.value = target
		items.value = allItems.value[page.value - 1] || allItems.value[0]
	}
	const nextPage = () => {
		page.value += 1
		items.value = allItems.value[page.value - 1] || allItems.value[0]
	}
	const lastPage = () => {
		page.value = pageCount.value
		items.value = allItems.value[page.value - 1] || allItems.value[0]
	}

	return {
		numberPage,
		nextPage,
		prevPage,
		firstPage,
		lastPage,
		page,
		pageSize,
		pageCount,
		allItems,
		items,
		setupPagination
	}
}
