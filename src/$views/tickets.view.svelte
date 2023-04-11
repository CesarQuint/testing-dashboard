<script>

    import { TicketStore } from '../stores'

    import Menu from '../$layouts/menu.svelte'
    import Modal from '../$components/modal.svelte'
    import Dropdown from '../$components/dropdown.svelte'

    import Tickets from '../tickets/tickets.svelte'
    import TicketRead from '../tickets/ticket.read.svelte'
    import TicketCreate from '../tickets/ticket.create.svelte'
    import TicketUpdate from '../tickets/ticket.update.svelte'
    import TicketDelete from '../tickets/ticket.delete.svelte'

    export let currentRoute = null

</script>

<Menu path={ currentRoute.path }>
    <Tickets/>
</Menu>

<Modal id="TicketRead" title="Información" >
    <div class="dropread">
        <Dropdown icon="bars" color="white" isRight options={[
            {value: 'edit', text: 'Editar', click: () => TicketStore.modalUpdate()},
            {value: 'delete', text: 'Borrar', click: () => TicketStore.modalDelete()},
        ]} />
    </div>
    <TicketRead />
</Modal>

<Modal id="TicketCreate" title="Crear" >
    <TicketCreate on:created={() => TicketStore.modalClose()} on:canceled={() => TicketStore.modalClose()} />
</Modal>

<Modal id="TicketUpdate" title="Editar" >
    <TicketUpdate on:updated={() => TicketStore.modalRead()} on:canceled={() => TicketStore.modalRead()} />
</Modal>

<Modal id="TicketDelete" title="Borrar" >
    <TicketDelete on:deleted={() => TicketStore.modalClose()} on:canceled={() => TicketStore.modalRead()} />
</Modal>