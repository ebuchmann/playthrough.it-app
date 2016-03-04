import axios from 'axios';

export const pub = axios.create({});
export const pri = axios.create({
    baseURL: 'https://api.github.com/',
    // withCredentials: true
});
