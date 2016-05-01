import axios from 'axios';

export const pub = axios.create({
    baseURL: 'http://localhost:3033/',
});
export const pri = axios.create({
    baseURL: 'http://localhost:3033/',
    withCredentials: true,
});
