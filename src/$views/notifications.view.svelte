<script>
    import {NotificationStore} from '../stores'

    import Menu from '../$layouts/menu.svelte'
    import Modal from '../$components/modal.svelte';
    import Dropdown from '../$components/dropdown.svelte';

    import Notifications from '../notifications/notifications.svelte';
    import NotificationRead from '../notifications/notification.read.svelte'
    import NotificationCreate from '../notifications/notification.create.svelte'
    import NotificationUpdate from '../notifications/notification.update.svelte'
    import NotificationDelete from '../notifications/notification.delete.svelte'

    export let currentRoute = null

</script>

<Menu path={ currentRoute.path }>
    <Notifications/>
</Menu>

<Modal id="NotificationRead" title="Información" >
    <div class="dropread">
        <Dropdown icon="cog" color="white" isRight options={[
            {value: 'edit', text: 'Editar', click: () => NotificationStore.modalUpdate()},
            {value: 'delete', text: 'Borrar', click: () => NotificationStore.modalDelete()},
        ]} />
    </div>
    <NotificationRead/>
</Modal>

<Modal id="NotificationCreate" title="Crear" >
    <NotificationCreate on:created={() => NotificationStore.modalClose()} on:canceled={() => NotificationStore.modalClose()} />
</Modal>

<Modal id="NotificationUpdate" title="Editar" >
    <NotificationUpdate on:updated={() => NotificationStore.modalRead()} on:canceled={() => NotificationStore.modalRead()} />
</Modal>

<Modal id="NotificationDelete" title="Borrar" >
    <NotificationDelete on:deleted={() => NotificationStore.modalClose() } on:canceled={() => NotificationStore.modalRead()} />
</Modal>