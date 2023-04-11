<script>

    import { createEventDispatcher } from 'svelte'
    import { TicketStore, TicketsStore, ToastStore } from '../stores'

    import TicketsService from '../$services/tickets.service'

    import Form from '../$components/form.svelte'

    const dispatch = createEventDispatcher()

    let loading = false

    async function deleteTicket() {

        loading = true
        const response = await TicketsService.deleteTicket($TicketStore._id)
        loading = false

        if(response.error)
            return ToastStore.error(response.error)

        TicketsStore.remove($TicketStore._id)

        ToastStore.success('Borrado')
        dispatch('deleted')
    }

</script>

<Form on:submit={ deleteTicket } on:canceled { loading } >
    <div class="columns">
        <div class="column">
            <div class="title">¿Seguro que quieres borrar el registro?</div>
        </div>
    </div>
</Form>