import * as Notifications from 'expo-notifications';
import { navigate } from '../navigations/NavigationService';
// Cấp quyền cho thông báo
export const requestNotificationPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
        alert('Quyền thông báo không được cấp!');
    }
};

// Hiển thị thông báo cục bộ
export const showNotification = async (title, body, callback) => {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: title,
            body: body,
        },
        trigger: null, // Gửi ngay lập tức
    });

    if (callback && typeof callback === "function") {
        callback(); // Gọi callback sau khi thông báo được gửi
    }
};


// Cấu hình cách hiển thị thông báo
export const configureNotificationHandler = () => {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: true,
        }),
    });
};
