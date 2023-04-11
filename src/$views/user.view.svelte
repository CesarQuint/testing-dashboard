<script>

    import { SessionStore,HomeStore,UserStore } from '../stores'

    import UsersService from '../$services/users.service'
    import HomesService from '../$services/homes.service'

    import Menu from '../$layouts/menu.svelte'
    import Modal from '../$components/modal.svelte'
    import Dropdown from '../$components/dropdown.svelte'

    import UserRead from '../users/user.read.svelte'
    import UserUpdatePassword from '../users/user.update.password.svelte'
    import UserUpdate from '../users/user.update.svelte'

    import HomeRead from '../homes/home.read.svelte'

    import { onMount } from 'svelte';

    export let currentRoute = null

    onMount(getInformation)
    
    async function getInformation(){
        let user = await UsersService.getUser($SessionStore.userId)
        let home = await HomesService.getHomeUser($SessionStore.userId)
        UserStore.set(user.data)
        HomeStore.set(home.data)
    }

</script>

<style>
    .content p{
        font-size: 4rem;
        margin: 0;
        text-align: center;
    }
</style>

<Menu path={ currentRoute.path }>
    <div on:change={getInformation} class="columns">
        <section class="column is-two-fifths">
            <div class="card">
                <div class="card-content">
                    <div class="content">
                        {#if $UserStore}  
                        <p><i class="fas fa-user-circle fa-lg"></i></p> 
                        <div class="dropread">
                            <Dropdown icon="cog" color="white" isRight options={[
                                {value: 'edit', text: 'Editar', click: () => UserStore.modalUpdate()},
                                "divider",
                                {value: 'editPassword', text: 'Editar Contaseña', click: () => UserStore.modalOpen('UpdatePassword')}
                            ]} />
                        </div>
                        <UserRead/>
                        {/if}
                    </div>
                </div>
              </div>
        </section>
        <section class="column is-three-fifths">
            <div class="card">
                <div class="card-content">
                    <div class="content">
                        {#if $HomeStore}  
                        <p><i class="fas fa-home fa-lg"></i></p> 
                        <HomeRead/>
                        {/if}
                    </div>
                </div>
              </div>
        </section>
    </div>    
  
</Menu>


<Modal id="UserUpdate" title="Editar" >
    <UserUpdate on:updated={() => UserStore.modalRead()} on:canceled={() => UserStore.modalRead()} />
</Modal>

<Modal id="UserUpdatePassword" title="Editar Contraseña" >
    <UserUpdatePassword on:updated={() => UserStore.modalRead()} on:canceled={() => UserStore.modalRead()} />
</Modal>
