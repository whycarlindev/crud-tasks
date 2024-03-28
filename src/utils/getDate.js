export function getActualDate() {
	const currentDate = new Date();

	const year = currentDate.getFullYear();
	const month = String(currentDate.getMonth() + 1).padStart(2, '0');
	const day = String(currentDate.getDate()).padStart(2, '0');
	const hour = String(currentDate.getHours())
	const minute = String(currentDate.getMinutes())
	const seconds = String(currentDate.getUTCSeconds())

	return `${year}-${month}-${day} ${hour}:${minute}:${seconds}`;
}