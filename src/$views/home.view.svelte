<script>
    import {SessionStore} from '../stores'

    import TicketService from '../$services/tickets.service'
    import homesService from '../$services/homes.service';

    import Menu from '../$layouts/menu.svelte'
    import Tickets from '../tickets/tickets.svelte'

    import { onMount } from 'svelte';
   
    export let currentRoute = null

    onMount(getTickets)

    async function getTickets(){
        let tickets = await TicketService.getTickets()
        console.log(tickets);
    }
</script>

<Menu path={ currentRoute.path }>
    <div class="columns is-1">

        <div class="column is-two-fifths">
            <h1 class="title is-4">Notifications</h1>
        </div>
        <div class="column is-three-fifths">
            <h1 class="title is-4">tickets</h1>
            <Tickets/>
        </div>

    </div>
</Menu>
