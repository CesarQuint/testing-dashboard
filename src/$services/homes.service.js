import API from './$api'

export default {
    createHome,
    getHomes,
    getHome,
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