<script>

    import { createEventDispatcher } from 'svelte'
    import { NotificationsStore, ToastStore } from '../stores'

    import NotificationService from '../$services/notifications.service'

    import Input from '../$components/input.svelte'
    import Form from '../$components/form.svelte'
    import Dropdown from '../$components/dropdown.svelte'

    import UserSelect from '../users/user.select.svelte'

    const dispatch = createEventDispatcher()

    let loading = false
    let data = {}

    async function createNotification() {

        loading = true
        const response = await NotificationService.createNotification(data)
        loading = false

        if(response.error)
            return ToastStore.error(response.error)

        NotificationsStore.append(response.data)

        ToastStore.success('Creado')
        dispatch('created')
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

<Form on:submit={ createNotification } on:canceled { loading } >
    <div class="columns">
        <Input bind:value={ data.title } label="Titulo" icon="tag" placeholder="Titulo de la notificacion" />
    </div>
    <div class="columns">
        <Input bind:value={ data.description } label="Descripcion" icon="tag" placeholder="Descripcion de la notificacion" />
    </div>
    <div class="columns">
        <div class="column">
            <Dropdown bind:value={data.relevance} text="Relevancia" options={[{value: "high", text: "Alta"},{value: "medium", text: "Media"},{value: "low", text: "Baja"}]}/>
        </div>
    </div>
</Form>