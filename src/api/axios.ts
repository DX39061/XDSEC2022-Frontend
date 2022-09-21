import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {App} from 'vue';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $axios: AxiosInstance;
        $api: AxiosInstance;
    }
}

export function clearAuthVars() {
    localStorage.removeItem('admin');
    localStorage.removeItem('nick-name');
    localStorage.removeItem('user-id');
    localStorage.removeItem('login');
    localStorage.removeItem('token');
}

const isoDateFormat = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d+([+-][0-2]\d:[0-5]\d|Z))/;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isIsoDateString(value: any): boolean {
    // console.log('entered: ', value);
    if (value && typeof value === 'string' && isoDateFormat.test(value)) {
        // console.log('true');
    } else {
        // console.log('false', typeof value, isoDateFormat.test(value));
    }
    return value && typeof value === 'string' && isoDateFormat.test(value);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function handleDates(body: any) {
    if (body === null || body === undefined || typeof body !== 'object') {
        return body;
    }
    for (const key of Object.keys(body)) {
        const value = body[key];
        if (isIsoDateString(value)) {
            body[key] = new Date(Date.parse(value));
        } else if (typeof value === 'object') handleDates(value);
    }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside the
// "export default () => {}" function below (which runs individually
// for each client)


const api = axios.create();

export interface CommonResponse {
    code: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    message: string;
}

interface ExtractNewTokenHeaders {
    'new-token': string;

    [key: string]: string;
}

export function installAxios(app: App<Element>) {
    //请求拦截器
    api.interceptors.request.use(
        (config: AxiosRequestConfig): AxiosRequestConfig => {
            const token = localStorage.getItem('token')?.toString();
            if (token) {
                if (config.headers) {
                    config.headers['Authorization'] = token ? 'Bearer ' + token : '';
                } else {
                    config.headers = {Authorization: token ? 'Bearer ' + token : ''};
                }
            }
            return config;
        },
        (error: unknown) => {
            return Promise.reject(error);
        },
    );

    //响应拦截器
    api.interceptors.response.use(
        (
            response: AxiosResponse<CommonResponse>,
        ): AxiosResponse<CommonResponse> => {
            if (response.data.code === 0xF0) {
                clearAuthVars();
                location.reload();
            }
            const headers: ExtractNewTokenHeaders =
                response.headers as ExtractNewTokenHeaders;
            if (headers['new-token']) {
                localStorage.setItem('token', headers['new-token']);
            }
            handleDates(response.data.data);
            // console.log(response.data.data);
            return response;
        },
        (error: unknown) => {
            return Promise.reject(error);
        },
    );
    // for use inside Vue files (Options API) through this.$axios and this.$api

    app.config.globalProperties.$axios = axios;
    // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
    //       so you won't necessarily have to import axios in each vue file

    app.config.globalProperties.$api = api;
    // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
    //       so you can easily perform requests against your app's API
}

export {api};
