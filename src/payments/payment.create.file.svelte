<script>

    import { createEventDispatcher } from 'svelte'
    import { SessionStore,PaymentsStore, ToastStore, TicketStore } from '../stores'

    import PaymentsService from '../$services/payments.service'

    import Input from '../$components/input.svelte'
    import Form from '../$components/form.svelte'
    import Button from '../$components/button.svelte'

    import HomesService from '../$services/homes.service'

    const dispatch = createEventDispatcher()

    let loading = false
    let data = {
        amount: $TicketStore.amount,
        concept: $TicketStore.concept,
    }

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
    <div slot="buttons">
        <Button text="Continuar con el pago" icon="arrow-left" fullwidth />
    </div>
    <!-- 
    
    {#if data.paymentType === 'voucher'}
       
       
    {/if}
    {#if data.paymentType === 'card'}
    
    {/if} -->
</Form>