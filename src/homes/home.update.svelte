<script>

    import { createEventDispatcher } from 'svelte'
    import { HomeStore, HomesStore, ToastStore } from '../stores'
    import UserService from '../$services/users.service'

    import HomesService from '../$services/homes.service'
    import SelectUser from '../users/user.select.svelte'

    import Input from '../$components/input.svelte'
    import Form from '../$components/form.svelte'
    import Tag from '../$components/tag.svelte' 

    const dispatch = createEventDispatcher()

    let loading = false
    let data = {
        street: $HomeStore.street,
        extnumber: $HomeStore.extnumber,
        intnumber: $HomeStore.intnumber,
        colony: $HomeStore.colony,
        section: $HomeStore.section,
    }
    

    async function updateHome() {

        loading = false
        const response = await HomesService.updateHome($HomeStore._id, data)
        loading = true

        if(response.error){
            loading = false
            return ToastStore.error(response.error)
        }
        
        HomeStore.set(response.data)
        HomesStore.replace(response.data)

        ToastStore.success('Actualizado')
        dispatch('updated')
    }


</script>

<Form on:submit={ updateHome } on:canceled { loading } >

    <div class="columns">
        <Input bind:value={ data.street } label="Calle" icon="tag" placeholder="Ingrese nombre" />
    </div>
    <div class="columns">
        <Input bind:value={ data.extnumber } label="Numero Exterior" icon="tag" placeholder="Ingrese descripción" />
    </div>
    <div class="columns">
        <Input bind:value={ data.intnumber } label="Numero Interior" icon="tag" placeholder="Ingrese nombre" />
    </div>
    <div class="columns">
        <Input bind:value={ data.colony } label="Colonia" icon="tag" placeholder="Ingrese descripción" />
    </div>
    <div class="columns">
        <Input bind:value={ data.section } label="Seccion" icon="tag" placeholder="Ingrese descripción" />
    </div>
</Form>