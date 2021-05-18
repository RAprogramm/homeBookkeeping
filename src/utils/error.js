const ERROR_CODES = {
	auth: 'Please, enter your e-mail and password',
	logout: 'System had been left',
}
export function error(code) {
	 return ERROR_CODES[code] ? ERROR_CODES[code] : 'Undefind error'
}
