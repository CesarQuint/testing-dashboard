<script>

    import { createEventDispatcher } from 'svelte'
    import { PaymentStore, PaymentsStore, ToastStore } from '../stores'

    import PaymentsService from '../$services/payments.service'

    import Form from '../$components/form.svelte'
    import Input from '../$components/input.svelte'
    import Dropdown from '../$components/dropdown.svelte'

    const dispatch = createEventDispatcher()

    let loading = false
    let data = {
        homeId: $PaymentStore.homeId,
        concept: $PaymentStore.concept,
        reference: $PaymentStore.reference,
        paymentphoto: $PaymentStore.paymentphoto,
        amount: $PaymentStore.amount,
        status:$PaymentStore.status
    }

    async function updatePayment() {

        loading = false
        console.log(data);
        const response = await PaymentsService.updatePayment($PaymentStore._id, data)
        loading = true

        if(response.error)
            return ToastStore.error(response.error)

        PaymentsStore.replace(response.data)
        PaymentStore.set(response.data)

        ToastStore.success('¡Pago actualizado!')
        dispatch('updated')
    }

</script>

<Form on:submit={ updatePayment } on:canceled { loading } >
    <div class="columns">
        <Input bind:value={ data.concept } label="Concepto" icon="tag" placeholder="Ingrese el concepto" />
    </div>
    <div class="columns">
        <Input bind:value={ data.reference } label="Referencia" icon="tag" placeholder="Ingrese la referencia" />
    </div>
    <div class="columns">
        <Input bind:value={ data.paymentphoto } label="Foto de Pago" icon="tag" placeholder="Ingrese la foto" />
    </div>
    <div class="columns">
        <Input bind:value={ data.amount } label="Cantidad" icon="dollar-sign" placeholder="Ingrese la referencia" type="number" />
    </div>
    <div class="columns">
        <Dropdown bind:value={data.status} column text="Estatus de pago" options={[{text:"Pendiente",value:"Pendiente..."},
                                                                                   {text:"Completado",value:"Completado"},
                                                                                   {text:"Fallido",value:"Fallido"}]}/>
    </div>
</Form>