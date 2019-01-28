import axios from 'axios';
import config from './config';

const configuration = config(process.env.REACT_APP_API_BASE_URL, 'tv/', process.env.REACT_APP_API_KEY);

const instance = axios.create(configuration);

export default instance;