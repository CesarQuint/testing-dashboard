<script>

    import { createEventDispatcher, onMount } from 'svelte'
    import { PaymentStore, PaymentsStore, ToastStore } from '../stores'

    import PaymentsService from '../$services/payments.service'

    import Form from '../$components/form.svelte'
    import Input from '../$components/input.svelte'
    import Dropdown from '../$components/dropdown.svelte'

    const dispatch = createEventDispatcher()

    onMount(()=>{
       if($PaymentStore.status != 'Pendiente...'){
           dispatch('canceled') 
           return ToastStore.error({message:"No se puede editar el pago en este estado"})
       }
            
    })

    let loading = false
    let data = {
        reference: $PaymentStore.reference,
        paymentphoto: $PaymentStore.paymentphoto
    }

    async function updatePayment() {

        loading = false
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
        <Input bind:value={ data.reference } label="Referencia" icon="tag" placeholder="Ingrese la referencia" />
    </div>
    <div class="columns">
        <Input bind:value={ data.paymentphoto } label="Foto de Pago" icon="tag" placeholder="Ingrese la foto" />
    </div>
</Form>