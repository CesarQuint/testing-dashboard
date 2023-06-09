import API from './$api'

export default{
    getPayments,
    createPayment,
    createPaymentCard,
    updatePayment,
    deletePayment
}

async function getPayments(query){
    return API({
        method:'get',
        route:'/payments',
        query
    })
}

async function createPayment(data){
    return API({
        method:'post',
        route:'/payments',
        data,
        isForm: true
    })
}

async function createPaymentCard(data){
    return API({
        method:'post',
        route:'/payments/card',
        data
    })
}

async function updatePayment (paymentId,data){
    return API({
        method:'put',
        route:`/payments/${paymentId}`,
        data
    })
}

async function deletePayment (paymentId){
    return API({
        method:'delete',
        route:`/payments/${paymentId}`,
    })
}