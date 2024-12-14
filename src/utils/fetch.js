// src/utils/apiUtils.js
import axios from 'axios';

export async function getData(apiUrl) {
    try {
        const response = await axios.get(apiUrl);
        // console.log(response.data.data);
        return response.data.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
