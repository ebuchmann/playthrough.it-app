import axios from 'axios';

export const pub = axios.create({
    baseURL: 'http://localhost:3033/',
});
export const pri = axios.create({
    baseURL: 'http://localhost:3033/',
    withCredentials: true,
});

pub.interceptors.request.use(config => {
    debug('success');
    return config;
}, error => {
    debug(error);
});

pri.interceptors.response.use(config => {
    debug('success');
    return config;
}, error => {
    debug('error');
    return error;
});
