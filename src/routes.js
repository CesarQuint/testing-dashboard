import Moment from 'moment'
import Storage from './storage'
import { SessionStore } from './stores'

import _404View from './$views/404.view.svelte'
import LoginView from './$views/login.view.svelte'
import HomeView from './$views/home.view.svelte'
import IndexView from './$views/index.view.svelte'
import UserView from './$views/user.view.svelte'
import PaymentsView from './$views/payments.view.svelte'
import HomesView from './$views/homes.view.svelte'
import NotificationsView from './$views/notifications.view.svelte'
import TicketsView from './$views/tickets.view.svelte'

const routes = [
    {
        name: '/',
        component: IndexView,
        onlyIf: {guard: () => !isLogin(), redirect: 'home'}
    },
    {
        name: 'home',
        component: HomeView,
        onlyIf: {guard: isLogin, redirect: '/'}
    },
    {
        name: 'my-information',
        component: UserView,
        onlyIf: {guard: isLogin, redirect: '/'}
    },
    {
        name:'payments',
        component :PaymentsView,
        onlyIf:{guard:isLogin,redirect:'/'}
    },
    {
        name:'homes',
        component :HomesView,
        onlyIf:{guard:isLogin,redirect:'/'}
    },
    {
        name:'notifications',
        component :NotificationsView,
        onlyIf:{guard:isLogin,redirect:'/'}
    },
    {
        name:'tickets',
        component :TicketsView,
        onlyIf:{guard:isLogin,redirect:'/'}
    },
    {
        name: '404',
        component: _404View
    }
]

function isLogin() {

    const session = Storage.getItem('session')

    if(!session)
        return false

    if(Moment(session.expired).isBefore(Moment())) {
        Storage.deleteItem('session')
        return false
    }

    SessionStore.set(session)
    return true
}

export { routes }