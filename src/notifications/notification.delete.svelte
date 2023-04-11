<script>

    import { createEventDispatcher } from 'svelte'
    import { NotificationStore, NotificationsStore, ToastStore } from '../stores'

    import NotificationsService from '../$services/notifications.service'

    import Form from '../$components/form.svelte'

    const dispatch = createEventDispatcher()

    let loading = false

    async function deleteNotification() {

        loading = true
        const response = await NotificationsService.deleteNotification($NotificationStore._id)
        loading = false

        if(response.error)
            return ToastStore.error(response.error)

        NotificationsStore.remove($NotificationStore._id)

        ToastStore.success('Borrado')
        dispatch('deleted')
    }

</script>

<Form on:submit={ deleteNotification } on:canceled { loading } >
    <div class="columns">
        <div class="column">
            <div class="title">¿Seguro que quieres borrar el registro?</div>
        </div>
    </div>
</Form>