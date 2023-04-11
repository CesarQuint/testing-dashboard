<script>

    import { createEventDispatcher } from 'svelte'
    import { PaymentStore, PaymentsStore, ToastStore } from '../stores'

    import PaymentsService from '../$services/payments.service'

    import Form from '../$components/form.svelte'

    const dispatch = createEventDispatcher()

    let loading = false

    async function deletePayment() {

        loading = true
        const response = await PaymentsService.deletePayment($PaymentStore._id)
        loading = false

        if(response.error)
            return ToastStore.error(response.error)

        PaymentsStore.remove($PaymentStore._id)

        ToastStore.success('¡Pago borrado!')
        dispatch('deleted')
    }

</script>

<Form on:submit={ deletePayment } on:canceled { loading } >
    <div class="columns">
        <div class="column">
            <div class="title">¿Seguro que quieres borrar el registro?</div>
        </div>
    </div>
</Form>