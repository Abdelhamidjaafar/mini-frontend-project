import axios from 'axios';

const API_KEY = 'API_KEY her';
const BASE_URL = 'endpoint URL here ';
const board_keys = ['put board-key here ']
export const fetchJobs = async () => {
    try {
        const response = await axios.get(BASE_URL, {
            headers: {
                'accept': 'application/json',
                'X-API-KEY': API_KEY,  
            },
            params: {
                'board_keys': board_keys,
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching jobs:", error.response?.data || error.message);
        throw error;
    }
};
