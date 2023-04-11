<script>

    import { createEventDispatcher } from 'svelte'
    import { NotificationStore, NotificationsStore, ToastStore } from '../stores'

    import NotificationsService from '../$services/notifications.service'
    import SelectUser from '../users/user.select.svelte'

    import Input from '../$components/input.svelte'
    import Form from '../$components/form.svelte'
    import Dropdown from '../$components/dropdown.svelte'
    const dispatch = createEventDispatcher()

    let loading = false
    let data = {
        title: $NotificationStore.title,
        description: $NotificationStore.description,
        relevance: $NotificationStore.relevance,
    }
    

    async function updateNotification() {

        loading = false
        const response = await NotificationsService.updateNotification($NotificationStore._id, data)
        loading = true

        if(response.error){
            loading = false
            return ToastStore.error(response.error)
        }
        
        NotificationStore.set(response.data)
        NotificationsStore.replace(response.data)

        ToastStore.success('Actualizado')
        dispatch('updated')
    }


</script>

<style>

    .column{
            display: flex;
            flex-flow: column wrap;
            gap: 1rem;
        }

    @media(min-width: 768px){
        .column{
            display: flex;
            flex-flow: row wrap;
            gap: 1rem;
        }   
    }
</style>

<Form on:submit={ updateNotification } on:canceled { loading } >
    <div class="columns">
        <Input bind:value={ data.title } label="Titulo" icon="tag" placeholder="Ingrese titulo" />
    </div>
    <div class="columns">
        <Input bind:value={ data.description } label="Descripcion" icon="tag" placeholder="Ingrese la descripcion" />
    </div>

    <div class="columns">
        <div class="column">
            <Dropdown bind:value={data.relevance} text="Relevancia" options={[{value: "high", text: "Alta"},{value: "medium", text: "Media"},{value: "low", text: "Baja"}]}/>
        </div>
    </div>

</Form>