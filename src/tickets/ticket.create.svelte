<script>

    import { createEventDispatcher } from 'svelte'
    import { TicketsStore, ToastStore } from '../stores'

    import TicketService from '../$services/tickets.service'
    import HomesService from '../$services/homes.service'

    import Input from '../$components/input.svelte'
    import Form from '../$components/form.svelte'

    const dispatch = createEventDispatcher()

    let loading = false
    let data = {}

    async function createTicket() {


        loading = true
        const response = await TicketService.createTicket(data)
        loading = false

        if(response.error)
            return ToastStore.error(response.error)

        TicketsStore.append(response.data)

        ToastStore.success('Creado')
        dispatch('created')
    }

</script>

<Form on:submit={ createTicket } on:canceled { loading } >
    <div class="columns">
        <Input bind:value={ data.concept } label="Concepto" icon="tag" placeholder="Ingrese el concepto" />
    </div>
    <div class="columns">
        <Input bind:value={ data.type } label="Tipo" icon="tag" placeholder="Ingrese el tipo" />
    </div>
    <div class="columns">
        <Input bind:value={ data.amount } label="Monto" icon="dollar-sign" placeholder="Ingrese monto" type="number"/>
    </div>
    <div class="columns">
       <Input type="date" bind:value={data.limited}/>
    </div>
</Form>