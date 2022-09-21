import {AxiosResponse} from 'axios';
import {api, CommonResponse} from '@/api/axios';

export interface InterviewShortResponse {
    id: number;
    "updated-at": Date;
    round: number;
    pass: boolean;
    interviewer: string;
    interviewee: string;
    "interviewee-id": number;
}

export function getInterviewList(limit = 10, skip = 0, keyword?: string) {
    let queryStr = `/api/interviews`;
    if (typeof keyword === 'string') {
        queryStr += keyword ? `/search?keyword=${keyword}&limit=${limit}&skip=${skip}` : `?limit=${limit}&skip=${skip}`
    }
    return api.get(queryStr).then((response: AxiosResponse<CommonResponse>) => {
        if (response.data.code != 0) {
            throw new Error(response.data.message);
        } else if (response.data.data == null) {
            throw new Error("未找到记录")
        } else{
            return Promise.resolve(response.data.data as InterviewShortResponse[]);
        }
    });
}

export function getInterviewCount() {
    return api.get(`/api/interviews/count`).then((response: AxiosResponse<CommonResponse>) => {
        if (response.data.code != 0) {
            throw new Error(response.data.message)
        } else {
            return Promise.resolve(response.data.data)
        }
    })
}

export interface CreateInterviewRequest {
    round: number;
    pass: boolean;
    record: string;
    'interviewer-id': number;
    'interviewee-id': number;
}

export function createInterview(request: CreateInterviewRequest) {
    return api.post(`/api/interviews`, request).then((response: AxiosResponse<CommonResponse>) => {
        if (response.data.code != 0) {
            throw new Error(response.data.message)
        } else {
            return Promise.resolve(response.data.message)
        }
    })
}

export interface InterviewDetailResponse {
    id: number;
    "updated-at": Date;
    round: number;
    pass: boolean;
    record: string;
    interviewer: string;
    interviewee: string;
}

export function getInterviewDetail(id: number) {
    return api.get(`/api/interviews/${id}`).then((response: AxiosResponse<CommonResponse>) => {
        if (response.data.code != 0) {
            throw new Error(response.data.message)
        } else {
            return Promise.resolve(response.data.data)
        }
    })
}

export function getInterviewDetailOfUser(userID: number) {
    return api.get(`/api/interviews/of-user?user-id=${userID}`).then((response: AxiosResponse<CommonResponse>) => {
        if (response.data.code != 0) {
            throw new Error(response.data.message)
        } else if (response.data.data == null) {
            throw new Error("未找到记录")
        }
        else {
            return Promise.resolve(response.data.data as InterviewDetailResponse[])
        }
    })
}

export interface UpdateInterviewRequest {
    pass: boolean;
    record: string;
}

export function updateInterview(id:number, request: UpdateInterviewRequest) {
    return api.patch(`/api/interviews/${id}`, request).then((response: AxiosResponse<CommonResponse>) => {
        if (response.data.code != 0) {
            throw new Error(response.data.message)
        } else {
            return Promise.resolve(response.data.message)
        }
    })
}

export function deleteInterview(id: number) {
    return api.delete(`/api/interviews/${id}`).then((response: AxiosResponse<CommonResponse>) => {
        if (response.data.code != 0) {
            throw new Error(response.data.message)
        } else {
            return Promise.resolve(response.data.message)
        }
    })
}