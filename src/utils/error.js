const ERROR_CODES = {
	EMAIL_NOT_FOUND: 'User with this e-mail was not found',
	INVALID_PASSWORD: 'Wrong password!',
	TOO_MANY_ATTEMPTS_TRY_LATER: 'Too many attempts to login. Try later',
	auth: 'Please, enter your e-mail and password'
}
export function error(code) {
	 return ERROR_CODES[code] ? ERROR_CODES[code] : 'Undefind error'
}
