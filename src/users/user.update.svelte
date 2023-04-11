<script>

    import { createEventDispatcher } from 'svelte'
    import { UserStore, UsersStore, ToastStore } from '../stores'

    import UsersService from '../$services/users.service'

    import Form from '../$components/form.svelte'
    import Input from '../$components/input.svelte'

    const dispatch = createEventDispatcher()

    let loading = false
    let data = {
        name: $UserStore.name,
        email: $UserStore.email,
        phone: $UserStore.phone
    }

    async function updateUser() {

        loading = false
        const response = await UsersService.updateUser($UserStore._id, data)
        loading = true

        if(response.error)
            return ToastStore.error(response.error)

        UsersStore.replace(response.data)

        ToastStore.success('¡Usuario actualizado!')
        dispatch('updated')
    }

</script>

<Form on:submit={ updateUser } on:canceled { loading } >
    <div class="columns">
        <Input bind:value={ data.name } label="Nombre" icon="tag" placeholder="Ingrese el nombre" />
    </div>
    <div class="columns">
        <Input bind:value={ data.email } label="Correo" icon="envelope" placeholder="Ingrese el correo" />
    </div>
    <div class="columns">
        <Input bind:value={ data.phone } label="Telefono" icon="phone" placeholder="Ingrese el numero de telefono" />
    </div>
</Form>