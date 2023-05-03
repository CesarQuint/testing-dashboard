<script>
    
    import { onMount } from 'svelte'
    import { PaymentStore,UserStore,TicketsStore, TicketStore, ToastStore,HomeStore,SessionStore } from '../stores'

    import TicketsService from '../$services/tickets.service.js'
    import HomesService from '../$services/homes.service'
    import Utils from '../utils'

    import Table from '../$components/table.svelte'
    import TicketNote from '../$components/notification.svelte'

    let loading = false
    let query = {}
    let metadata = {}

    onMount(getTickets)

    async function getTickets() {

        loading = true
        let home= await HomesService.getHomeUser($SessionStore.userId)
        query.homeId = home.data._id
        const response = await TicketsService.getTickets(query)
        loading = false

        if(response.error)
            return ToastStore.error(response.error)

        TicketsStore.set(response.data.tickets)
        metadata = response.data.metadata
    }

</script>

<style>
    .strong{
        font-weight: 900;
    }
    h1.title{
        margin: 0.2rem 0 !important;
    }
</style>

<Table bind:query items={ $TicketsStore.length } on:change={ getTickets } { metadata } { loading }>
    <thead>
        <th>#</th>
        <th>Pago</th>
    </thead>
    <tbody>
        {#each $TicketsStore as Ticket, index}
            <tr on:click={() => {
                PaymentStore.modalCreate()
                TicketStore.set(Ticket)
                }}>
                <td>{ (index+1) + ( metadata.page * metadata.limit ) }</td>
                <td>
                    <!--TODO: trabajar en una funcion que me muestre la relevanca de los tickets-->
                    <TicketNote isLight color={Utils.relevance(Ticket.limited) > 12 ? 'success' :Utils.relevance(Ticket.limited) > 8 ? 'warning' :'danger' }>
                        {#if $UserStore}
                            <h1 class="title is-5">{$UserStore.name}</h1>
                        {/if }
                        <p>Concepto: <span>{Ticket.concept}</span></p>
                        <p>Tipo: <span>{Ticket.type}</span></p>
                        <p>Cantidad: <span  class="strong">{Utils.cash(Ticket.amount)}</span></p>
                        <p>Fecha limite de Pago: <span class="strong">{Utils.dateLarge(Ticket.limited)}</span></p>
                    </TicketNote>
                </td>
            </tr>
        {/each}
    </tbody>
</Table>