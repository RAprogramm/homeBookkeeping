export default function currencyFilter(value, currency = 'KRW') {
	return new Intl.NumberFormat('ru-RU', {
		style: 'currency',
		currency,
		minimumFractionDigits: 2
	}).format(value)
}
