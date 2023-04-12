<script>

    import { navigateTo } from 'svelte-router-spa'
    import { ToastStore } from '../stores'

    import UsersService from '../$services/users.service'
    import Storage from '../storage'

    import Input from '../$components/input.svelte'
    import Button from '../$components/button.svelte'
    import Form from '../$components/form.svelte'

    let loading = false
    let data = {
        email: ''
    }

    async function userLogin() {

        loading = true
        const response = await UsersService.userLogin(data)
        loading = false

        if(response.error)
            return ToastStore.error(response.error)

        Storage.setItem('session', response.data)

        navigateTo('home')
    }

</script>


<Form on:submit={ userLogin } { loading }>
    <div class="columns">
        <Input bind:value={ data.email } label="Correo" icon="envelope" placeholder="Correo electronico" />
    </div>
    <div slot="buttons">
        <Button type="submit" icon="save" text="Mandar Correo" color="primary" fullwidth />
    </div>
</Form>