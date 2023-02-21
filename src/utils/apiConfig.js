// const { default: axios } = require('axios');
import axios from 'axios';

const baseConfig = {
    baseUrl: process.env.REACT_APP_BASE_URL || '',
    timeout: 10000,
    withCredentials: true,
};

class RequestAxios {
    constructor(config) {
        this.instance = axios.create(config);

        this.instance.interceptors.request.use((requestConfig) => {
            // const token = Storage.get('LOGGED_TOKEN_STORAGE_KEY') || '';
            const token = JSON.parse(localStorage.getItem('token_user_login'));
            requestConfig.headers = {
                Authorization: token,
            };
            return requestConfig;
        });

        this.instance.interceptors.response.use((res) => {
            const { status, data } = res.data;

            if (status === 204) {
                // no content
                return true;
            }

            console.log('->>', data);

            return data;
        });
    }

    request(config) {
        return this.instance.request(config);
    }

    get(url, config) {
        return this.instance.get(url, config);
    }

    post(url, data, config) {
        return this.instance.post(url, data, config);
    }

    put(url, data, config) {
        return this.instance.put(url, data, config);
    }

    delete(url, data, config) {
        return this.instance.delete(url, {
            data,
            ...config,
        });
    }
}

export default new RequestAxios(baseConfig);
