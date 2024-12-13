import axios from "axios"

export async function fetchAllData(api, fetchWhat, storeData) {
	await axios.get(api).then((res) => {
		storeData = res.data.data;
		console.log(res.data.data);
		return storeData
	})
} fetchAllData(url) 