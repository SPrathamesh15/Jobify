import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5454',
    withCredentials: true, 
});

export default instance;
