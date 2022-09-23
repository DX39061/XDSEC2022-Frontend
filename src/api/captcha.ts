import {AxiosResponse} from 'axios';
import {api, CommonResponse} from '@/api/axios';
export interface VerifyCaptchaRequest {
    token: string
}
export function verifyCaptcha(request: VerifyCaptchaRequest) {
    return api.post(`/api/captcha`, request).then((response: AxiosResponse<CommonResponse>) => {
        if (response.data.code != 0) {
            throw new Error('验证码验证失败，请重试')
        } else {
            return Promise.resolve(response.data.data)
        }
    })
}