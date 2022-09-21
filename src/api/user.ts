import {AxiosResponse} from 'axios';
import {api, CommonResponse} from '@/api/axios';

export interface UserShortResponse {
    id: number;
    'nick-name': string;
    name: string;
    sex: string;
    major: string;
}

export function getUserList(limit = 10, skip = 0, keyword?: string) {
    let queryStr = `/api/users`;
    if (typeof keyword === 'string') {
        queryStr += keyword ? `/search?keyword=${keyword}&limit=${limit}&skip=${skip}` : `?limit=${limit}&skip=${skip}`
    }
    return api.get(queryStr).then((response: AxiosResponse<CommonResponse>) => {
        if (response.data.code != 0) {
            throw new Error(response.data.message);
        } else if (response.data.data == null) {
            throw new Error("未找到记录")
        } else{
            return Promise.resolve(response.data.data as UserShortResponse[]);
        }
    });
}

export interface UserDetailResponse {
    id: number;
    admin: boolean;
    'nick-name': string;
    name: string;
    sex: string;
    major: string;
    "student-id": string;
    telephone: string;
    email: string;
    department: string;
    direction: string;
    "learned-technique": string;
    "learning-experience": string;
    "hobby-and-advantage": string;
}

export function getUserDetail(id: number) {
    return api.get(`/api/users/${id}`).then((response: AxiosResponse<CommonResponse>) => {
        if (response.data.code != 0) {
            throw new Error(response.data.message)
        } else {
            return Promise.resolve(response.data.data)
        }
    })
}

export interface UpdateUserProfileRequest {
    admin: boolean;
    'nick-name': string;
    name: string;
    sex: string;
    major: string;
    "student-id": string;
    telephone: string;
    email: string;
    department: string;
    direction: string;
    "learned-technique": string;
    "learning-experience": string;
    "hobby-and-advantage": string;
}

export function updateUserProfile(id: number, request: UpdateUserProfileRequest) {
    return api.patch(`/api/users/${id}`, request).then((response: AxiosResponse<CommonResponse>) => {
        if (response.data.code != 0) {
            throw new Error(response.data.message)
        } else {
            return Promise.resolve(response.data.message)
        }
    })
}

export interface ResetUserPasswordRequest {
    "new-password": string
}

export function resetUserPassword(id: number, request: ResetUserPasswordRequest) {
    return api.patch(`/api/users/${id}/reset-password`, request).then((response: AxiosResponse<CommonResponse>) => {
        if (response.data.code != 0) {
            throw new Error(response.data.message)
        } else {
            return Promise.resolve(response.data.message)
        }
    })
}

export interface UserCountResponse {
    total: number;
    admin: number;
    male: number;
    female: number;
    web: number;
    reverse: number;
    pwn: number;
    crypto: number;
    misc: number;
    dev: number;
    secretariat: number;
    technique: number;
    devops: number;
    publicity: number;
}

export function getUserCount() {
    return api.get(`/api/users/count`).then((response: AxiosResponse<CommonResponse>) => {
        if (response.data.code != 0) {
            throw new Error(response.data.message)
        } else {
            return Promise.resolve(response.data.data)
        }
    })
}

export function searchUser(keyword: string) {
    return api.get(`/api/users/search?keyword=${keyword}`).then((response: AxiosResponse<CommonResponse>) => {
        if (response.data.code != 0) {
            throw new Error(response.data.message)
        } else {
            return Promise.resolve(response.data.data)
        }
    })
}

export interface UserGameResponse {
    id: number;
    score: number;
}

export function getUserGameInfo(id: number) {
    return api.get(`/api/users/${id}/bind-game`).then((response: AxiosResponse<CommonResponse>) => {
        if (response.data.code != 0) {
            throw new Error(response.data.message)
        } else {
            return Promise.resolve(response.data.data)
        }
    })
}

export function deleteUser(id: number) {
    return api.delete(`/api/users/${id}`).then((response: AxiosResponse<CommonResponse>) => {
        if (response.data.code != 0) {
            throw new Error(response.data.message)
        } else {
            return Promise.resolve(response.data.message)
        }
    })
}