// Fungsi untuk format jam/waktu
export function formattedTime(date) {
	const timePattern = /^\d{2}:\d{2}$/;
	if (typeof date === 'string' && timePattern.test(date)) {
		return date;
	}

	if (date instanceof Date) {
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');
		return `${hours}:${minutes}`;
	}
}

// Fungsi untuk format tanggal
export function formattedDate(date) {
	const datePattern = /^\d{2}-\d{2}-\d{4}$/;
	if (typeof date === 'string' && datePattern.test(date)) {
		return date;
	}

	if (date instanceof Date) {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	}
}
export function justMonth(date) {
	const datePattern = /^\d{2}$/;
	if (typeof date === 'string' && datePattern.test(date)) {
		return date;
	}

	if (date instanceof Date) {
		const month = String(date.getMonth() + 1).padStart(2, '0');
		return `${month}`;
	}
}
export function justYear(date) {
	const datePattern = /^\d{2}$/;

	if (typeof date === 'string' && datePattern.test(date)) {
		return date;
	}

	if (date instanceof Date) {
		const year = date.getFullYear();
		return `${year}`;
	}
}
