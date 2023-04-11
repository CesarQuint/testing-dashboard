<script>

    import { createEventDispatcher } from 'svelte'
    import { SessionStore,PaymentsStore, ToastStore } from '../stores'

    import PaymentsService from '../$services/payments.service'

    import Input from '../$components/input.svelte'
    import Form from '../$components/form.svelte'

    import HomesService from '../$services/homes.service'

    const dispatch = createEventDispatcher()

    let loading = false
    let data = { }

    async function createPayment() {

        let home= await HomesService.getHomeUser($SessionStore.userId)

        data.homeId = home.data._id
    
        loading = true
        const response = await PaymentsService.createPayment(data)
        loading = false

        if(response.error)
            return ToastStore.error(response.error)

        PaymentsStore.append(response.data)

        ToastStore.success('¡Pago Creado!')
        dispatch('created')
    }

</script>

<h1>Esto sera tarjeta</h1>