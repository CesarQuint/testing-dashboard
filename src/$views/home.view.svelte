<script>

    import Menu from '../$layouts/menu.svelte'
   
    export let currentRoute = null

</script>

<Menu path={ currentRoute.path }>
    <div class="columns is-3">

        <div class="is-two-thirds">
            <h1 class="title is-4">Notifications</h1>
        </div>
        <div class="is-one-third">
            <h1 class="title is-4">tickets</h1>
        </div>

    </div>
</Menu>
