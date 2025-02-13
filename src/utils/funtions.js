import AsyncStorage from "@react-native-async-storage/async-storage";

const setDataStore = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error storing data:', error);
    }
}

const getDataStore = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    } catch (error) {
        console.error('Error retrieving data:', error);
        return null;
    }
};

const getNameInitials = (name) => {
    if (!name) return ''; // Kiểm tra chuỗi rỗng hoặc undefined
    const words = name.split(' '); // Tách chuỗi thành mảng từ
    const initials = words.map(word => word.charAt(0).toUpperCase()); // Lấy ký tự đầu tiên và chuyển thành chữ hoa
    return initials.join(''); // Ghép các ký tự đầu tiên lại
};

const formatTime = (time) => {
    const hours = Math.floor(time / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${hours} giờ, ${minutes} phút, ${seconds} giây`;
};

const calculateTimeLeft = (h = 0, m = 0, s = 0) => {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m, s);
    const nowInSeconds = Math.floor(now.getTime() / 1000);
    const startOfDayInSeconds = Math.floor(startOfDay.getTime() / 1000);
    const secondsElapsed = nowInSeconds - startOfDayInSeconds;
    const maxWorkDuration = 8 * 60 * 60;
    const remainingSeconds = Math.max(maxWorkDuration - secondsElapsed, 0);
    return remainingSeconds;
};

export {
    setDataStore,
    getDataStore,
    getNameInitials,
    formatTime,
    calculateTimeLeft
}