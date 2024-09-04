import axios from 'axios';

const API_KEY = 'askr_dbfb6f33e7d3c6b6e334b2d420f81465';
const BASE_URL = 'https://api.hrflow.ai/v1/jobs/searching';
const board_keys = ['887595b735d68f0bc0b0b0535f7d8f7d158a3f4e']
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
