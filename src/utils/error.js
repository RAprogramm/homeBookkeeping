const ERROR_CODES = {
	auth: 'Пожалуйста, введите E-mail и пароль',
	logout: 'Вы покинули систему',
}
export function error(code) {
	 return ERROR_CODES[code] ? ERROR_CODES[code] : 'Неизвестная ошибка'
}
