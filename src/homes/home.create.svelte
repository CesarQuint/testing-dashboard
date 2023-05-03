<script>

    import { createEventDispatcher } from 'svelte'
    import { HomesStore, ToastStore } from '../stores'

    import HomeService from '../$services/homes.service'

    import Input from '../$components/input.svelte'
    import Form from '../$components/form.svelte'
    import Button from '../$components/button.svelte'
    import UserSelect from '../users/user.select.svelte'

    const dispatch = createEventDispatcher()

    let show = false
    let loading = false
    let data = {}

    async function createHome() {

        loading = true
        const response = await HomeService.createHome(data)
        loading = false

        if(response.error)
            return ToastStore.error(response.error)

        HomesStore.append(response.data)

        ToastStore.success('Creado')
        dispatch('created')
    }

</script>

<Form on:submit={ createHome } on:canceled { loading } >

    <div class="columns">
            <UserSelect bind:userId={data.userId}/>
    </div>
    <div class="columns">
        <Input bind:value={ data.alias } label="Alias" icon="tag" placeholder="Ingrese el alias de la casa"/>
    </div>
    <div class="columns">
        <Input bind:value={ data.street } label="Calle" icon="tag" placeholder="Ingrese la calle"/>
    </div>
    <div class="columns">
        <Input bind:value={ data.extnumber } label="Numero Exterior" icon="hashtag" placeholder="Numero Exterior" />
    </div>
    <div class="columns">
        <Input bind:value={ data.intnumber } label="Numero Interior" icon="hashtag" placeholder="Numero Interior" />
    </div>
    <div class="columns">
        <Input bind:value={ data.colony } label="Colonia" icon="tag" placeholder="Colonia" />
    </div>
    <div class="columns">
        <Input bind:value={ data.section } label="Seccion" icon="tag" placeholder="Seccion" />
    </div>
</Form>