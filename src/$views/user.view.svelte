<script>

    import { SessionStore,HomeStore,UserStore } from '../stores'

    import UsersService from '../$services/users.service'
    import HomesService from '../$services/homes.service'

    import Menu from '../$layouts/menu.svelte'
    import Modal from '../$components/modal.svelte'
    import Dropdown from '../$components/dropdown.svelte'
    import Card from '../$components/card.svelte'

    import UserRead from '../users/user.read.svelte'
    import UserUpdatePassword from '../users/user.update.password.svelte'
    import UserUpdate from '../users/user.update.svelte'

    import HomeRead from '../homes/home.read.svelte'

    export let currentRoute = null


    async function getInformation(){
        let user = await UsersService.getUser($SessionStore.userId)
        let home = await HomesService.getHomeUser($SessionStore.userId)
        UserStore.set(user.data)
        HomeStore.set(home.data)
    }

</script>

<style>
    
</style>

<Menu path={ currentRoute.path }>
    <div on:change={getInformation} class="columns">
        <section class="column is-two-fifths">
                {#if $UserStore}  
                <Card icon="user-circle fa-lg">
                    <div class="dropread">
                        <Dropdown icon="cog" color="white" isRight options={[
                            {value: 'edit', text: 'Editar', click: () => UserStore.modalUpdate()},
                            "divider",
                            {value: 'editPassword', text: 'Editar Contaseña', click: () => UserStore.modalOpen('UpdatePassword')}
                        ]} />
                    </div>
                    <UserRead/>
                </Card>
                {/if}
        </section>
        <section class="column is-three-fifths">    
            {#if $HomeStore}  
            <Card icon="home fa-lg">
                <HomeRead/>
            </Card>
            {/if}
        </section>
    </div>    
  
</Menu>


<Modal id="UserUpdate" title="Editar" >
    <UserUpdate on:updated={() => UserStore.modalRead()} on:canceled={() => UserStore.modalRead()} />
</Modal>

<Modal id="UserUpdatePassword" title="Editar Contraseña" >
    <UserUpdatePassword on:updated={() => UserStore.modalRead()} on:canceled={() => UserStore.modalRead()} />
</Modal>
