import BottomNavigation from '../navigations/BottomNavigation'
import Login from './Login'
import Chat from './Chats/Chat'
import Timekeeping from './Timekeeping'
import TimekeepingHistory from './Timekeeping/TimekeepingHistory'
import VacationsDate from './VacationsDate'
import Test from './Chats/Test'

export const views = [
    {
        name: 'Login',
        component: Login
    },
    {
        name: 'Main',
        component: BottomNavigation
    },
    {
        name: 'Message',
        component: Chat
    },
    {
        name: 'Timekeeping',
        component: Timekeeping
    },
    {
        name: 'TimekeepingHistory',
        component: TimekeepingHistory
    },
    {
        name: 'VacationsDate',
        component: Test
    },
]