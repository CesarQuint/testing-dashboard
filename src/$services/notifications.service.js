import API from './$api'

export default {
    createNotification,
    getNotifications,
    getNotification,
    updateNotification,
    deleteNotification,
}

function createNotification(data) {
    return API({
        method: 'post',
        route: '/notifications',
        data
    })
}

function getNotifications(query) {
    return API({
        method: 'get',
        route: '/notifications',
        query
    })
}

function getNotification(notificationId) {
    return API({
        method: 'get',
        route: `/notifications/${ notificationId }`,
    })
}

function updateNotification(notificationId, data) {
    return API({
        method: 'put',
        route: `/notifications/${ notificationId }`,
        data
    })
}

function deleteNotification(notificationId) {
    return API({
        method: 'delete',
        route: `/notifications/${ notificationId }`,
    })
}