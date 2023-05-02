<script>
    import { TicketStore, SessionStore ,UserStore, ToastStore } from '../stores'

    import PaymentsService from '../$services/payments.service'

    import Button from '../$components/button.svelte'
    import Form from '../$components/form.svelte'

    import HomesService from '../$services/homes.service'

    import Config from '../config'


    let loading = false
    let data = { 
        userId:$UserStore._id,
        url:Config.hostApp
    }

    async function createPaymentCard() {

        let home= await HomesService.getHomeUser($SessionStore.userId)

        data.homeId = home.data._id
        data.ticketId = $TicketStore._id
    
        loading = true
        const response = await PaymentsService.createPaymentCard(data)
        loading = false

        if(response.error)
            return ToastStore.error(response.error)
       

        window.Stripe(Config.stripeKey).redirectToCheckout({ sessionId: response.data })
    }

</script>

<Form on:submit={createPaymentCard} {loading}>
    <div slot="buttons">
        <Button type="submit" text="Continuar con el pago" icon="arrow-right" fullwidth />
    </div>
</Form>