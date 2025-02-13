import { getTokens, saveTokens } from "./funcKeychain";
import { HOST_LIST } from "./constants/systemVar";
import { showNotification } from "../services/notification";
import { navigate } from "../navigations/NavigationService";

const headerDefautl = {
    'user-agent': 'Mozilla/4.0 MDN Example',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
}

const fetchWithTimeout = (url, options, timeout = 15000) => {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Network request timed out')), timeout)
        )
    ]);
};

export const _fetchAPILogin = async (hostName, apiPath, data = {}, _header = headerDefautl, method = 'POST') => {
    try {
        let requestData = {
            cache: 'no-cache',
            credentials: 'same-origin',
            withCredentials: true,
            headers: _header,
            method: method,
            mode: 'cors',
            redirect: 'follow',
            referrer: 'no-referrer',
        }

        if (method == 'POST') {
            requestData = {
                ...requestData,
                body: typeof data === 'object' ? JSON.stringify(data) : JSON.stringify({ data })
            }
        }

        const response = await fetchWithTimeout(`${HOST_LIST[hostName].hostBaseURL}${apiPath}`, requestData);
        if (!response.ok) {
            showNotification("Thông báo!", 'HTTP error! Status: ${response.status}');
        }
        return await response.json();
    } catch (error) {
        return {
            iserror: true,
            message: error.message,
            messagedetail: error.stack,
            resultObject: null
        }
    }
};

export const _fetchAPI = async (hostName, apiPath, data = {}, _header = headerDefautl, method = 'POST') => {
    try {
        let tokens = await getTokens();
        let token = tokens ? tokens.accessToken : null;
        if (!token) {
            showNotification("Thông báo", 'Vui lòng đăng nhập lại!');
            navigate('Login');
            return
        }

        let requestData = {
            cache: 'no-cache',
            credentials: 'same-origin',
            withCredentials: true,
            headers: {
                ..._header,
                Authorization: `Bearer ${token}`
            },
            method: method,
            mode: 'cors',
            redirect: 'follow',
            referrer: 'no-referrer',
        }

        if (method == 'POST') {
            requestData = {
                ...requestData,
                body: typeof data === 'object' ? JSON.stringify(data) : JSON.stringify({ data })
            }
        }

        const response = await fetchWithTimeout(`${HOST_LIST[hostName].hostBaseURL}${apiPath}`, requestData);
        if ([401, 403].includes(response.status)) {
            const refresh = await refreshToken(hostName, 'api/authen/refeshToken');
            if (refresh.iserror) {
                showNotification("Thông báo", refresh.message);
                navigate('Login');
                return refresh
            }
            const newAccessToken = refresh.resultObject.accessToken;
            requestData.headers.Authorization = `Bearer ${newAccessToken}`
            const retryResponse = await fetch(`${HOST_LIST[hostName].hostBaseURL}${apiPath}`, requestData);
            return await retryResponse.json();
        }
        return await response.json();
    } catch (error) {
        return {
            iserror: true,
            message: error.message,
            messagedetail: error.stack,
            resultObject: null
        }
    }
};

const refreshToken = async (hostName, apiPath, data = {}, _header = headerDefautl, method = 'POST') => {
    try {
        const tokens = await getTokens();

        if (!tokens || !tokens.refreshToken) {
            return {
                iserror: true,
                message: "Lỗi làm mới token, Vui lòng đăng nhập lại!",
                messagedetail: "Lỗi làm mới token, Vui lòng đăng nhập lại!",
                resultObject: null
            }
        }

        let requestData = {
            cache: 'no-cache',
            credentials: 'same-origin',
            withCredentials: true,
            headers: {
                ..._header,
                Authorization: `Bearer ${tokens.refreshToken}`
            },
            method: method,
            mode: 'cors',
            redirect: 'follow',
            referrer: 'no-referrer',
        }

        if (method == 'POST') {
            requestData = {
                ...requestData,
                body: typeof data === 'object' ? JSON.stringify(data) : JSON.stringify({ data })
            }
        }

        const response = await fetch(`${HOST_LIST[hostName].hostBaseURL}${apiPath}`, requestData);

        if (!response.ok) {
            return {
                iserror: true,
                message: "Lỗi làm mới token, Vui lòng đăng nhập lại!",
                messagedetail: "Lỗi làm mới token, Vui lòng đăng nhập lại!",
                resultObject: null
            }
        }

        const result = await response.json();
        const { accessToken, refreshToken } = result.resultObject;
        await saveTokens(accessToken, refreshToken);
        return result;
    } catch (error) {
        return {
            iserror: true,
            message: "Lỗi làm mới token, Vui lòng đăng nhập lại!",
            messagedetail: error.stack,
            resultObject: null
        }
    }
}