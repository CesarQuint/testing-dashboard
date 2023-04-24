<script>
    import {PaymentStore} from '../stores'
    
    import PaymentCreate from '../payments/payment.create.svelte'
    import Notifications from '../notifications/notifications.svelte'

    import Menu from '../$layouts/menu.svelte'
    import Tickets from '../tickets/tickets.svelte'
    import Modal from '../$components/modal.svelte';

    export let currentRoute = null

</script>

<style>
    div.column{
        overflow-y: auto;
        max-height: 45rem;
        overflow-x: auto
    }
</style>

<Menu path={ currentRoute.path }>
    <div class="columns is-1">

        <div class="column is-three-quarters">
            <h1 class="title is-4">Pagos Pendientes</h1>
            <Tickets/>
        </div>

        <div class="column is-one-quarter">
            <h1 class="title is-4">Notificaciones</h1>
            <Notifications/>
        </div>

    </div>
</Menu>

<Modal id="PaymentCreate" title="Crear" >
    <PaymentCreate on:created={() => PaymentStore.modalClose()} on:canceled={() => PaymentStore.modalClose()} />
</Modal>
