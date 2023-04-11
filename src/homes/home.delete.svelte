<script>

    import { createEventDispatcher } from 'svelte'
    import { HomeStore, HomesStore, ToastStore } from '../stores'

    import HomesService from '../$services/homes.service'

    import Form from '../$components/form.svelte'

    const dispatch = createEventDispatcher()

    let loading = false

    async function deleteHome() {

        loading = true
        const response = await HomesService.deleteHome($HomeStore._id)
        loading = false

        if(response.error)
            return ToastStore.error(response.error)

        HomesStore.remove($HomeStore._id)

        ToastStore.success('Borrado')
        dispatch('deleted')
    }

</script>

<Form on:submit={ deleteHome } on:canceled { loading } >
    <div class="columns">
        <div class="column">
            <div class="title">¿Seguro que quieres borrar el registro?</div>
        </div>
    </div>
</Form>