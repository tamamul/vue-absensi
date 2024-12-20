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

export function getTanggalDanHari(tahun, bulan) {
    const hasil = [];
    // Bulan di JavaScript adalah 0-index, jadi 3 = April. Maka kurangi 1 untuk Maret.
    const bulanIndex = bulan - 1;

    // Dapatkan jumlah hari dalam bulan dan tahun tersebut
    const jumlahHari = new Date(tahun, bulan, 0).getDate();

    // Loop dari tanggal 1 sampai jumlah hari
    for (let tanggal = 1; tanggal <= jumlahHari; tanggal++) {
        const tanggalObjek = new Date(tahun, bulanIndex, tanggal);
        const hari = tanggalObjek.toLocaleString('id-ID', { weekday: 'long' });
        hasil.push({ tanggal, hari });
    }

    return hasil;
}
