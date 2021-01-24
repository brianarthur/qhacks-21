import axios from 'axios';

export const spotifyAxios = axios.create();
spotifyAxios.interceptors.request.use(config => {
    if (!config.params) {
        config.params = { limit: 10 }
    } else if (!config.params.limit) {
        config.params.limit = 10;
    }
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

export const backendAxios = axios.create();
backendAxios.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json';
    return config;
});