<script>

    import { onMount } from 'svelte'
    import { UserStore,TicketsStore, TicketStore, ToastStore } from '../stores'

    import TicketsService from '../$services/tickets.service.js'
    import Utils from '../utils'

    import Table from '../$components/table.svelte'
    import Search from '../$components/search.svelte'
    import Button from '../$components/button.svelte'
    import TicketNote from '../$components/notification.svelte'

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
</Search>

<Table bind:query items={ $TicketsStore.length } on:change={ getTickets } { metadata } { loading }>
    <thead>
        <th>#</th>
        <th>Ticket</th>
    </thead>
    <tbody>
        {#each $TicketsStore as Ticket, index}
            <tr on:click={() => TicketStore.modalRead(Ticket)}>
                <td>{ (index+1) + ( metadata.page * metadata.limit ) }</td>
                <td>
                    <!--TODO: trabajar en una funcion que me muestre la relevanca de los tickets-->
                    <TicketNote isLight >
                        <h1 class="title is-5">{$UserStore}</h1>
                        <p>Concepto: <span>{Ticket.concept}</span></p>
                        <p>Tipo: <span>{Ticket.type}</span></p>
                        <p>Cantidad: <span>{Ticket.amount}</span></p>
                        <p>Fecha de creacion: <span>{ Utils.dateTimeLarge(Ticket.created) }</span></p>
                        <p>Fecha de corte: <span>{Utils.dateLarge(Ticket.limited)}</span></p>
                    </TicketNote>
                </td>
            </tr>
        {/each}
    </tbody>
</Table>