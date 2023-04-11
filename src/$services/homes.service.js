import API from './$api'

export default {
    createHome,
    getHomes,
    getHome,
    getHomeUser,
    updateHome,
    deleteHome,
}

function createHome(data) {
    return API({
        method: 'post',
        route: '/homes',
        data
    })
}

function getHomes(query) {
    return API({
        method: 'get',
        route: '/homes',
        query
    })
}

function getHome(homeId) {
    return API({
        method: 'get',
        route: `/homes/${ homeId }`,
    })
}

function getHomeUser(userId) {
    return API({
        method: 'get',
        route: `/homes/${ userId }/user`,
    })
}

function updateHome(homeId, data) {
    return API({
        method: 'put',
        route: `/homes/${ homeId }`,
        data
    })
}

function deleteHome(homeId) {
    return API({
        method: 'delete',
        route: `/homes/${ homeId }`,
    })
}