import API from './$api'

export default {
    userLogin,
    getUser,
    updateUser,
    updateUserPassword
}

async function userLogin(data) {
    return API({
        method: 'post',
        route: '/users/login',
        data
    })
}

async function getUser(userId) {
    return API({
        method: 'get',
        route: `/users/${ userId }`,
    })
}

async function updateUser(userId, data) {
    return API({
        method: 'put',
        route: `/users/${ userId }`,
        data
    })
}

async function updateUserPassword(userId, data) {
    return API({
        method: 'put',
        route: `/users/${ userId }/password`,
        data
    })
}
