import * as SecureStore from 'expo-secure-store';

const saveTokens = async (accessToken, refreshToken) => {
    try {
        await SecureStore.setItemAsync('accessToken', accessToken);
        await SecureStore.setItemAsync('refreshToken', refreshToken);
    } catch (error) {
        console.log('Error saving tokens:', error);
    }
};

const getTokens = async () => {
    try {
        const accessToken = await SecureStore.getItemAsync('accessToken');
        const refreshToken = await SecureStore.getItemAsync('refreshToken');
        if (accessToken && refreshToken) {
            return { accessToken, refreshToken };
        }
        return null;
    } catch (error) {
        console.log('Error retrieving tokens:', error);
        return null;
    }
};

const deleteTokens = async () => {
    try {
        await SecureStore.deleteItemAsync('accessToken');
        await SecureStore.deleteItemAsync('refreshToken');
    } catch (error) {
        console.log('Error deleting tokens:', error);
    }
};

export { saveTokens, getTokens, deleteTokens };
