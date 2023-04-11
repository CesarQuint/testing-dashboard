import API from './$api'

export default{
    getTickets,
    createTicket,
    updateTicket,
    deleteTicket
}

async function getTickets(query){
    return API({
        method:'get',
        route:'/tickets',
        query
    })
}

async function createTicket(data){
    return API({
        method:'post',
        route:'/tickets',
        data
    })
}

async function updateTicket (ticketId,data){
    return API({
        method:'put',
        route:`/tickets/${ticketId}`,
        data
    })
}

async function deleteTicket (ticketId){
    return API({
        method:'delete',
        route:`/tickets/${ticketId}`,
    })
}