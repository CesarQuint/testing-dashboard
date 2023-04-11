<script>

    import { onDestroy, onMount } from 'svelte';
    import { HomeStore, ToastStore, UserStore } from '../stores'

    import HomeService from '../$services/homes.service'

    import HomeRead from '../homes/home.read.svelte'

    onMount(getHomeUser)

    let loading = false

    async function getHomeUser() {

        loading = true
        const response = await HomeService.getHomeUser($UserStore._id)
        loading = false

        if(response.error)
            return ToastStore.error(response.error)

        console.log(response)
        HomeStore.set(response.data)
        console.log($HomeStore);
    }

    onDestroy(()=>{
        HomeStore.set(null)
    })

</script>

<style>
    h1{
        text-align: center;
        color: #8950f0;
    }

    i{
        margin: 0 0.5rem;
    }
</style>

{#if $HomeStore}
    <div class="container is-fluid">
        <div class="card">
            <div class="card-content">
            <div class="content">
                <h1 class="title is-4"><i class="fas fa-home fa"></i>Informacion de Casa</h1>
                <div class="information">
                    <HomeRead/>
                </div>
                    
            </div>
            </div>
        </div>
    </div>
{/if}


    