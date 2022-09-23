import {AxiosResponse} from 'axios';
import {api, clearAuthVars, CommonResponse} from '@/api/axios';

export interface JoinRequest {
    'nick-name': string;
    name: string;
    sex: string;
    major: string;
    'student-id': string;
    qq: string;
    telephone: string;
    email: string;
    password: string;
    department: string;         // 意向部门
    direction: string;          // 学习方向
    'learned-technique': string;   // 技术基础
    'learning-experience': string; // 学习经历
    'hobby-and-advantage': string;  // 爱好特长
}

export function join(request: JoinRequest) {
    return api.post(`/api/account/join`, request).then((response: AxiosResponse<CommonResponse>) => {
        if (response.data.code != 0) {
            throw new Error(response.data.message)
        } else {
            return Promise.resolve(response.data.message)
        }
    })
}

export interface LoginRequest {
    account: string;
    password: string;
}

export function login(request: LoginRequest) {
    return api.post(`/api/account/login`, request).then((response: AxiosResponse<CommonResponse>) => {
        if (response.data.code != 0) {
            clearAuthVars();
            throw new Error(response.data.message)
        } else {
            return Promise.resolve(response.data.message)
        }
    })
}

export interface UpdateProfileRequest {
    'nick-name': string;
    name: string;
    sex: string;
    major: string;               // 学院/专业
    'student-id': string;
    telephone: string;
    qq: string;
    email: string;
    department: string;          // 意向部门
    direction: string;           // 学习方向
    'learned-technique': string;   // 技术基础
    'learning-experience': string; // 学习经历
    'hobby-and-advantage': string;  // 爱好特长
}

export function updateProfile(request: UpdateProfileRequest) {
    return api.patch(`/api/account/profile`, request).then((response: AxiosResponse<CommonResponse>) => {
        if (response.data.code != 0) {
            throw new Error(response.data.message)
        } else {
            return Promise.resolve(response.data.message)
        }
    })
}

export function logout() {
    return api.delete(`/api/account/logout`).then((response: AxiosResponse<CommonResponse>) => {
        clearAuthVars()
        location.reload()
        if (response.data.code != 0) {
            throw new Error(response.data.message)
        } else {
            return Promise.resolve(response.data.message)
        }

    })
}

export interface SelfProfileResponse {
    id: number;
    admin: boolean;
    'nick-name': string;
    name: string;
    sex: string;
    major: string;               // 学院/专业
    'student-id': string;
    qq: string;
    telephone: string;
    email: string;
    department: string;          // 意向部门
    direction: string;           // 学习方向
    'learned-technique': string;   // 技术基础
    'learning-experience': string; // 学习经历
    'hobby-and-advantage': string;  // 爱好特长
}

export function getSelfProfile() {
    return api.get(`/api/account/profile`).then((response: AxiosResponse<CommonResponse>) => {
        if (response.data.code != 0) {
            throw new Error(response.data.message)
        } else {
            return Promise.resolve(response.data.data)
        }
    })
}

