<template>
	<ul class="pagination">
		<li class="pagination-item">
			<button
					type="button"
					@click="$emit('onClickFirst')"
					:disabled="isInFirstPage"
					>
					First
			</button>
		</li>

		<li class="pagination-item">
			<button
					type="button"
					@click="$emit('onClickPrev')"
					:disabled="isInFirstPage"
					>
					Previous
			</button>
		</li>

		<li
				v-for="page in pagesRange"
				class="pagination-item"
		>
				<button
						type="button"
						@click="$emit('onClickPage', page.number)"
						:disabled="page.isDisabled"
						:class="{ active: isPageActive(page.number) }"
						>
						{{ page.number }}
				</button>
		</li>

			<li class="pagination-item">
				<button
						@click="$emit('onClickNext')"
						:disabled="isInLastPage"
						>
						Next
				</button>
			</li>

			<li class="pagination-item">
				<button
						@click="$emit('onClickLast')"
						:disabled="isInLastPage"
						>
						Last
				</button>
			</li>
	</ul>
</template>


<script>
import {ref, computed, watch} from 'vue'

export default {
	emits: ['onClickFirst', 'onClickNext', 'onClickPage', 'onClickPrev', 'onClickLast'],
	props: {
		maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3
    },
		pages: {
			// type: Array,
			required: true
		},
		currentPage: {
			type: Number,
			required: true
		}
	},
	setup(props) {
		const startPage = computed(() => {
			if (props.currentPage === 1) {
				return 1
			// }	else if (props.currentPage === props.pages) {
			// 	return props.currentPage - 1
			}
			return props.currentPage - 1
		})

		const pagesRange = computed(() => {
			const range = []
			for (
				let i = startPage.value; 
				i <= Math.min(startPage.value + props.maxVisibleButtons - 1, props.pages); 
				i += 1
			) {
				range.push({
					number: i,
					isDisabled: i === props.currentPage
				})
			}
			return range
		})

		const isInFirstPage = computed(() => {
			return props.currentPage === 1
		})
		const isInLastPage = computed(() => {
			return props.currentPage === props.pages
		})
		const isPageActive = page => {
			return props.currentPage === page
		}

		return {
			isPageActive,
			pagesRange,
			isInFirstPage,
			isInLastPage
		}
	}
}
</script>

<style>
.pagination {
	list-style-type: none;
}

.pagination-item {
	display: inline-block;
}

/* .active { */
/* 	background-color: #4AAE9B; */
/* 	color: #ffffff; */
/* } */
</style>
