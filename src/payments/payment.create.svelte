<script>

    import { createEventDispatcher } from 'svelte'
    import { PaymentsStore, ToastStore } from '../stores'

    import PaymentsService from '../$services/payments.service'

    import Input from '../$components/input.svelte'
    import Form from '../$components/form.svelte'

    import HomeSelect from '../homes/home.select.svelte'

    const dispatch = createEventDispatcher()

    let loading = false
    let data = {}

    async function createPayment() {

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
        <HomeSelect bind:homeId={data.homeId}/>
    </div>
    <div class="columns">
        <Input bind:value={ data.concept } label="Concepto de Pago" icon="tag" placeholder="Concepto..." />
    </div>
    <div class="columns">
        <Input bind:value={ data.reference } label="Referencia de pago" icon="tag" placeholder="Pago" />
    </div>
    <div class="columns">
        <Input bind:value={ data.paymentphoto } label="Cargar Fotografia" icon="tag" placeholder="Fotografia de pago" />
    </div>
    <div class="columns">
        <Input bind:value={ data.amount } label="Cantidad" icon="dollar-sign" placeholder="Ingrese la cantidad" type="number" />
    </div>
</Form>