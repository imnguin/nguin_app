import { _fetchAPI, _fetchAPILogin } from "../utils/funcRequest"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDataStore, setDataStore } from "../utils/funtions";
import { saveTokens } from "../utils/funcKeychain";
import { hideLoading, setDataUser, showLoading } from "../redux/reducers";
const _fetchLogin = (hostName, apiPath, data) => async (dispatch, state) => {
    try {
        dispatch(showLoading(true));
        const apiResult = await _fetchAPILogin(hostName, apiPath, data);
        dispatch(hideLoading());
        if (!apiResult.iserror) {
            const { accessToken, refreshToken } = apiResult.resultObject;
            await saveTokens(accessToken, refreshToken);
            delete apiResult.resultObject.accessToken;
            delete apiResult.resultObject.refreshToken;
            await setDataStore('logininfo', apiResult.resultObject);
            dispatch(setDataUser(JSON.stringify(apiResult.resultObject)));
            return {
                ...apiResult,
                messaege: 'Đăng nhập thành công!',
            }
        }
        else {
            return apiResult;
        }
    } catch (error) {
        return {
            iserror: true,
            message: error.messaege,
            messagedetail: error,
            resultObject: null
        }
    }
}

const _fetchData = (hostName, apiPath, data, isShowloading = true, method = 'POST') => async (dispatch, state) => {
    try {
        if(isShowloading)
        {
            dispatch(showLoading(true));
        }
        const _header = {
            'user-agent': 'Mozilla/4.0 MDN Example',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        };
        const apiResult = await _fetchAPI(hostName, apiPath, data, _header);
        if(isShowloading){
            dispatch(hideLoading());
        }
        return apiResult

    } catch (error) {
        return {
            iserror: true,
            message: error.message,
            messagedetail: error,
            resultObject: null
        }
    }
}

export {
    _fetchLogin,
    _fetchData
}