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
export function formatTimee(time) {
    // Cek jika sudah dalam format waktu
    const timePattern = /^\d{2}:\d{2}:\d{2}$/; // Pola untuk format "HH:mm:ss"
    if (timePattern.test(time)) {
    return time; // Jika sudah dalam format waktu, langsung dikembalikan
    }

    // Jika bukan format waktu, coba parsing sebagai Date
    const parsedDate = new Date(time);
    if (!isNaN(parsedDate)) {
        // Jika valid, kembalikan hanya bagian waktu
        return parsedDate.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
    }

    // Jika tidak valid, kembalikan placeholder
    return "-";
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

export function parseDate(dateString) {
    // Check if the date is already in ISO format (e.g., "2024-09-25")
    if (!isNaN(Date.parse(dateString))) {
        return new Date(dateString);
    }

    // Handle format like "18 Oktober 1972"
    const monthsMap = {
        Januari: "01",
        Februari: "02",
        Maret: "03",
        April: "04",
        Mei: "05",
        Juni: "06",
        Juli: "07",
        Agustus: "08",
        September: "09",
        Oktober: "10",
        November: "11",
        Desember: "12",
    };

    // Split the date into parts
    const [day, monthName, year] = dateString.split(" ");
    const month = monthsMap[monthName];
    if (!month) {
        console.error(`Invalid month in date: ${monthName}`);
        return null; // Return null if parsing fails
    }

    // Construct the ISO date string
    return new Date(`${year}-${month}-${day.padStart(2, "0")}`);
}

