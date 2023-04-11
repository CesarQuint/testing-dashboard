<script>

    import { onMount } from 'svelte'
    import { TicketsStore, TicketStore, ToastStore } from '../stores'

    import TicketsService from '../$services/tickets.service.js'
    import Utils from '../utils'

    import Table from '../$components/table.svelte'
    import Search from '../$components/search.svelte'
    import Button from '../$components/button.svelte'
  import Ticket from './ticket.create.svelte';

    let loading = false
    let query = { all: true}
    let metadata = {}

    onMount(getTickets)

    async function getTickets() {

        loading = true
        const response = await TicketsService.getTickets(query)
        loading = false

        if(response.error)
            return ToastStore.error(response.error)

        TicketsStore.set(response.data.tickets)
        metadata = response.data.metadata

    }

</script>

<Search on:enter={ getTickets } bind:value={ query.find } >
    <Button on:click={() => TicketStore.modalCreate()} text="Agregar" icon="plus" color="primary" />
</Search>

<Table bind:query items={ $TicketsStore.length } on:change={ getTickets } { metadata } { loading }>
    <thead>
        <th>#</th>
        <th>Concepto</th>
        <th>Tipo</th>
        <th>Cantidad</th>
        <th>Fecha de Creacion</th>
        <th>Fecha Limite</th>
    </thead>
    <tbody>
        {#each $TicketsStore as Ticket, index}
            <tr on:click={() => TicketStore.modalRead(Ticket)}>
                <td>{ (index+1) + ( metadata.page * metadata.limit ) }</td>
                <td>{Ticket.concept}</td>
                <td>{Ticket.type}</td>
                <td>{Utils.cash(Ticket.amount)}</td>
                <td>{ Utils.dateTimeLarge(Ticket.created) }</td>
                <td>{Utils.dateLarge(Ticket.limited)}</td>
            </tr>
        {/each}
    </tbody>
</Table>