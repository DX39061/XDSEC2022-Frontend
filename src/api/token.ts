import {Base64} from "js-base64";

interface TokenObj {
    'user-id': number;
    'nick-name': string;
    admin: boolean;
}

function setupWithToken() {
    const token = localStorage.getItem('token');
    if (!token || token === 'undefined') {
        localStorage.removeItem('token');
    }
    try {
        if (token && token !== 'undefined') {
            const content = token.split('.')[1];
            const contentRaw = Base64.decode(content);

            const userInfoObj: TokenObj = JSON.parse(contentRaw) as TokenObj;
            //console.log(userInfoObj)
            localStorage.setItem('login', 'true');
            localStorage.setItem('user-id', userInfoObj['user-id'].toString());
            localStorage.setItem('admin', userInfoObj.admin ? 'true' : 'false');
            localStorage.setItem('nick-name', userInfoObj["nick-name"]);
        } else {
            localStorage.setItem('login', 'false');
            localStorage.setItem('admin', 'false');
        }
    } catch (e) {
        localStorage.setItem('login', 'false');
        localStorage.setItem('admin', 'false');
    }
}

export default setupWithToken;
