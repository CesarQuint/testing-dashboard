<script>

    import { onMount } from 'svelte'
    import { navigateTo } from 'svelte-router-spa'
    import { UserStore,HomeStore,SessionStore, ToastStore } from '../stores'

    import SessionsService from '../$services/sessions.service'
    import UsersService from '../$services/users.service'
    import HomesService from '../$services/homes.service'
    import Storage from '../storage'

    export let path = null

    let loading = false

    onMount(verifySession)

    async function verifySession() {

        loading = true
        const response = await SessionsService.verifySession($SessionStore.token)
        const user = await UsersService.getUser($SessionStore.userId)
        const home = await HomesService.getHomeUser($SessionStore.userId)
        loading = false

        if(response.success){
            UserStore.set(user.data)
            HomeStore.set(home.data)
            return SessionStore.set(response.data)
        }

        ToastStore.error(response.error)
        Storage.deleteItem('session')
        navigateTo('login')
    }

    function logout() {
        localStorage.removeItem('session')
        navigateTo('/')
    }

</script>

<style>
    div.container.nav{
        display: flex !important;
        justify-content: space-between;
    }
    i{
        margin: 0rem 0.4rem;
    }
    li.is-active a{
        color:  #A38970 !important;
    }
</style>

<!-- svelte-ignore a11y-missing-attribute -->
<!-- svelte-ignore a11y-click-events-have-key-events -->

{#if $SessionStore}
    <section class="hero is-primary">
        <div class="hero-head">
            <nav class="navbar">
                <div class="container nav">
                    <span class="navbar-brand">
                        <a class="navbar-item"
                        on:click={()=>navigateTo("/home")}
                        >
                            Mis Pagos
                        </a>
                    </span>
                    <span class="navbar-menu is-active">
                        <div class="navbar-end">
                            <a on:click={ logout } class="navbar-item">Salir</a>
                        </div>
                    </span>
                </div>
            </nav>
        </div>
    </section>
    <div class="mt-4 container">
        <div class="tabs">
            <ul>
                <li on:click={() => navigateTo('home')} class:is-active={path === '/home'}><a><i class="fas fa-home fa-xs"></i> Inicio</a></li>
                <li on:click={() => navigateTo('payments')} class:is-active={path === '/payments'}><a><i class="fas fa-money-bill fa-xs"></i> Pagos</a></li>
                <li on:click={() => navigateTo('my-information')} class:is-active={path === '/my-information'}><a><i class="fas fa-user fa-xs"></i> Mi informacion</a></li>
        </div>
        <div class="container is-fluid">
            <slot></slot>
        </div>
    </div>
{/if}