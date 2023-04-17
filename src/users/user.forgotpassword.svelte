<script>

    import { navigateTo } from 'svelte-router-spa'
    import { ToastStore } from '../stores'

    import UsersService from '../$services/users.service'

    import Input from '../$components/input.svelte'
    import Button from '../$components/button.svelte'
    import Form from '../$components/form.svelte'

    let loading = false
    let data = {}

    async function sendEmail() {


        loading = true
        const response = await UsersService.sendEmail(data)
        loading = false

        if(response.error)
            return ToastStore.error(response.error)

        navigateTo('/')
    }
    

</script>


<Form on:submit={ sendEmail } { loading }>
    <div class="columns">
        <Input bind:value={ data.email } label="Correo" icon="envelope" placeholder="Correo electronico" />
    </div>
    <div slot="buttons">
        <Button type="submit" icon="save" text="Mandar Correo" color="primary" fullwidth />
    </div>
</Form>