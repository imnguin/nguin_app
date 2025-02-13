import { getDataStore } from "../utils/funtions"

export const checkAuthen = async () => {
    const loginInfo = await getDataStore('logininfo');
    return !loginInfo ? false : true;
}