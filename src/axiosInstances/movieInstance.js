import axios from 'axios';

var config = {
    baseURL: process.env.REACT_APP_API_BASE_URL + 'movie/',
    params: {
        api_key: process.env.REACT_APP_API_KEY
    },
    headers: {
        'Content-Type': 'application/json',
    }
};

const instance = axios.create(config);

export default instance;