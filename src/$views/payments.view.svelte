<script>
    import {PaymentStore} from '../stores'

    import Menu from '../$layouts/menu.svelte';
    import Modal from '../$components/modal.svelte'
    import Dropdown from '../$components/dropdown.svelte'

    import Payments from '../payments/payments.svelte'
    import PaymentRead from '../payments/payment.read.svelte'
    import PaymentCreate from '../payments/payment.create.svelte'
    import PaymentUpdate from '../payments/payment.update.svelte'
    import PaymentDelete from '../payments/payment.delete.svelte'

    export let currentRoute = null
</script>

<Menu path={currentRoute.path}>
    <Payments/>
</Menu>

<Modal id="PaymentRead" title="Información" >
    <div class="dropread">
        <Dropdown icon="cog" color="white" isRight options={[
            {value: 'edit', text: 'Editar', click: () => PaymentStore.modalUpdate()},
            {value: 'delete', text: 'Borrar', click: () => PaymentStore.modalDelete()},
        ]} />
    </div>
    <PaymentRead />
</Modal>

<Modal id="PaymentCreate" title="Crear" >
    <PaymentCreate on:created={() => PaymentStore.modalClose()} on:canceled={() => PaymentStore.modalClose()} />
</Modal>

<Modal id="PaymentUpdate" title="Editar" >
    <PaymentUpdate on:updated={() => PaymentStore.modalRead()} on:canceled={() => PaymentStore.modalRead()} />
</Modal>

<Modal id="PaymentDelete" title="Borrar" >
    <PaymentDelete on:deleted={() => PaymentStore.modalClose() } on:canceled={() => PaymentStore.modalRead()} />
</Modal>