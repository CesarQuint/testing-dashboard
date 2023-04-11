<script>

    import { createEventDispatcher } from 'svelte'
    import { UsersStore, ToastStore } from '../stores'

    import UserService from '../$services/users.service'

    import Input from '../$components/input.svelte'
    import Form from '../$components/form.svelte'
    import Button from '../$components/button.svelte'

    const dispatch = createEventDispatcher()

    let loading = false
    let show = false
    let data = {}

    async function createUser() {

        loading = true
        const response = await UserService.createUser(data)
        loading = false

        if(response.error)
            return ToastStore.error(response.error)

        UsersStore.append(response.data)

        ToastStore.success('¡Usuario creado!')
        dispatch('created')
    }

</script>

<Form on:submit={ createUser } on:canceled { loading } >
    <div class="columns">
        <Input bind:value={ data.name } label="Nombre" icon="tag" placeholder="Ingrese el nombre" />
    </div>
    <div class="columns">
        <Input bind:value={ data.phone } label="Telefono" icon="phone" placeholder="Ingrese el numero de telefono" />
    </div>
    <div class="columns">
        <Input bind:value={ data.email } label="Correo" icon="envelope" placeholder="Ingrese el correo" />
    </div>
    <div class="columns">
        <Input bind:value={ data.password } label="Contraseña" icon="lock" placeholder="Ingrese la contraseña" />
    </div>
</Form>