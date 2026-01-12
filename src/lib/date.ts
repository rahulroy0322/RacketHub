const isToday = (date: Date | string): boolean => {
	const toDay = new Date()

	if (!(date instanceof Date)) {
		date = new Date(date)
	}

	if (toDay.getDate() !== date.getDate()) {
		return false
	}
	if (toDay.getMonth() !== date.getMonth()) {
		return false
	}
	if (toDay.getFullYear() !== date.getFullYear()) {
		return false
	}

	return true
}

export { isToday }
