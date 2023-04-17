<script>

    import { navigateTo } from 'svelte-router-spa'
    import { ToastStore } from '../stores'

    import UsersService from '../$services/users.service'

    import Input from '../$components/input.svelte'
    import Button from '../$components/button.svelte'
    import Form from '../$components/form.svelte'

    export let token 
    let loading = false
    let data = {}

    async function resetPassword() {

        loading = true
        data.token = token
        const response = await UsersService.resetPassword(data)
        loading = false

        if(response.error)
            return ToastStore.error(response.error)

        ToastStore.success('¡Contraseña actualizada !')

        navigateTo('/')

    }
    
</script>


<Form on:submit={ resetPassword } { loading }>
    <div class="columns">
        <Input bind:value={ data.password } label="Nueva Contraseña" icon="envelope" type="password" placeholder="Ingresa tu nueva contraseña" />
    </div>
    <div slot="buttons">
        <Button type="submit" icon="save" text="Guardar Cambios" color="primary" fullwidth />
    </div>
</Form>