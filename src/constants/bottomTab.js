import Home from '../views/Home'
import Account from '../views/Account';
import Chats from '../views/Chats';
import Order from '../views/Order';
import Header from '../components/Header';

export const bottomTabs = [
    {
        name: 'Home',
        image: require('../../assets/216242_home_icon.png'),
        title: 'Trang chủ',
        headerShown: true,
        component: Home,
        // isHeaderDefault : true,
        isHeaderCustom: true,
        headerCustom: Header
    },
    // {
    //     name: 'Order',
    //     image: require('../../assets/history.png'),
    //     title: 'Đơn hàng',
    //     headerShown: true,
    //     component: Order
    // },
    // {
    //     name: 'Payment',
    //     image: require('../../assets/payment.png'),
    //     title: 'Thanh toán',
    //     headerShown: true
    // },
    {
        name: 'Chats',
        image: require('../../assets/message.png'),
        title: 'Tin nhắn',
        headerShown: true,
        component: Chats
    },
    {
        name: 'Account',
        image: require('../../assets/account.png'),
        title: 'Tài khoản',
        headerShown: false,
        component : Account
    },
]