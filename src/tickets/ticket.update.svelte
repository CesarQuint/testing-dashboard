<script>

    import { createEventDispatcher, onMount } from 'svelte'
    import { TicketStore, TicketsStore, ToastStore } from '../stores'

    import TicketsService from '../$services/tickets.service'

    import Input from '../$components/input.svelte'
    import Form from '../$components/form.svelte'

    const dispatch = createEventDispatcher()

    let loading = false
    let data = {
        concept: $TicketStore.concept,
        type: $TicketStore.type,
        amount: $TicketStore.amount,
        limited: $TicketStore.limited
    }

    onMount(()=>{console.log($TicketStore);})

    async function updateTicket() {

        loading = false
        const response = await TicketsService.updateTicket($TicketStore._id, data)
        loading = true

        if(response.error)
            return ToastStore.error(response.error)

        TicketStore.set(response.data)
        TicketsStore.replace(response.data)

        ToastStore.success('Actualizado')
        dispatch('updated')
    }

</script>

<Form on:submit={ updateTicket } on:canceled { loading } >
    <div class="columns">
        <Input bind:value={ data.concept } label="Concepto" icon="tag" placeholder="Ingrese Concepto" />
    </div>
    <div class="columns">
        <Input bind:value={ data.type } label="Tipo" icon="tag" placeholder="Ingrese Tipo" />
    </div>
    <div class="columns">
        <Input bind:value={ data.amount } label="Cantidad" icon="dollar-sign" placeholder="Ingrese monto" />
    </div>
    <div class="columns">
        <Input bind:value={ data.limited } label="Fecha Limite" icon="tag" placeholder="Ingrese fecha limite" type="date"/>
    </div>
</Form>