export const formatDate = (isoString) => {
	const date = new Date(isoString);

	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const year = date.getFullYear();

	const hours = String(date.getHours()).padStart(2, '0');
	const min = String(date.getMinutes()).padStart(2, '0');
	const sec = String(date.getSeconds()).padStart(2, '0');

	return `${day}.${month}.${year}, ${hours}:${min}:${sec}`;
};
