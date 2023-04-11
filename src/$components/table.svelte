<script>

    import Pagination from '../$components/pagination.svelte'
    import Loading from './loading.svelte'
    
    export let items = null
    export let query = null
    export let metadata = null

    export let loading = false

</script>

<Loading { loading } />

{#if !items && !loading}
    <div class="message">
        <div class="message-body">Sin resultados</div>
    </div>
{/if}

{#if !loading && items}
    <div class="table-container">
        <table class="table is-hoverable is-fullwidth">
            <slot></slot>
        </table>
    </div>
    <div class="items space">
        <button class="button is-white" readonly>{ metadata.total } resultados</button>
        <Pagination on:change bind:query { metadata } />
    </div>
{/if}