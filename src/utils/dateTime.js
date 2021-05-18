export default function dateTimeFilter(date) {
	return new Intl.DateTimeFormat('ru').format(date)
}
