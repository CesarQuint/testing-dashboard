import API from './$api'

export default {
    createMaintenance,
    getMaintenances,
    getMaintenance,
    updateMaintenance,
    deleteMaintenance,
}

function createMaintenance(data) {
    return API({
        method: 'post',
        route: '/maintenances',
        data
    })
}

function getMaintenances(query) {
    return API({
        method: 'get',
        route: '/maintenances',
        query
    })
}

function getMaintenance(maintenanceId) {
    return API({
        method: 'get',
        route: `/maintenances/${ maintenanceId }`,
    })
}

function updateMaintenance(maintenanceId, data) {
    return API({
        method: 'put',
        route: `/maintenances/${ maintenanceId }`,
        data
    })
}

function deleteMaintenance(maintenanceId) {
    return API({
        method: 'delete',
        route: `/maintenances/${ maintenanceId }`,
    })
}