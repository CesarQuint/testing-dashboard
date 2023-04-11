<script>

    import { createEventDispatcher } from 'svelte'
    import { UserStore, UsersStore, ToastStore } from '../stores'

    import UsersService from '../$services/users.service'

    import Form from '../$components/form.svelte'
    import Input from '../$components/input.svelte'

    const dispatch = createEventDispatcher()

    let loading = false
    let data = {
        password: $UserStore.password,
        newPassword: $UserStore.newPassword,
    }

    async function updateUserPassword() {

        loading = false
        const response = await UsersService.updateUserPassword($UserStore._id, data)
        loading = true

        if(response.error)
            return ToastStore.error(response.error)

        UsersStore.replace(response.data)

        ToastStore.success('¡Usuario actualizado!')
        dispatch('updated')
    }

</script>

<Form on:submit={ updateUserPassword } on:canceled { loading } >
    <div class="columns">
        <Input bind:value={ data.password } type="password" label="Vieja Contraseña" icon="tag" placeholder="Ingrese su contraseña anterior" />
    </div>
    <div class="columns">
        <Input bind:value={ data.newPassword } type="password" label="Nueva Contraseña" icon="tag" placeholder="Ingrese nueva Contraseña" />
    </div>
</Form>