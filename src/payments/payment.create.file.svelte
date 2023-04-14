<script>

    import { createEventDispatcher } from 'svelte'
    import { SessionStore,PaymentsStore, ToastStore, TicketStore } from '../stores'

    import PaymentsService from '../$services/payments.service'

    import Input from '../$components/input.svelte'
    import Form from '../$components/form.svelte'

    import HomesService from '../$services/homes.service'
    import TicketsService from '../$services/tickets.service'

    const dispatch = createEventDispatcher()

    let loading = false
    let data = {
        amount: $TicketStore.amount,
        concept: $TicketStore.concept,
    }

    async function createPayment() {

        console.log(data);

        let home= await HomesService.getHomeUser($SessionStore.userId)

        data.homeId = home.data._id
    
        loading = true
        const response = await PaymentsService.createPayment(data)
        await TicketsService.updateTicket($TicketStore._id,{homes:[home.data._id]})
        loading = false

        if(response.error)
            return ToastStore.error(response.error)

        PaymentsStore.append(response.data)

        ToastStore.success('¡Pago Creado!')
        dispatch('created')
    }

</script>

<Form on:submit={ createPayment } on:canceled { loading } >
    <div class="columns">
        <Input bind:value={ data.concept } label="Concepto de Pago" icon="tag" placeholder="Concepto..." readonly />
    </div>
    <div class="columns">
        <Input bind:value={ data.amount } label="Cantidad" icon="dollar-sign" placeholder="Ingrese la cantidad" type="number" readonly />
    </div>
    <div class="columns">
        <Input bind:value={ data.reference } label="Referencia de pago" icon="tag" placeholder="Pago" />
    </div>
    <div class="columns">
        <Input bind:value={ data.voucher } type="file" label="Comprobante" icon="tag" placeholder="Ingrese comprobante"/>
    </div>
</Form>