<script>

    import { onMount } from 'svelte'
    import { UsersStore, UserStore, ToastStore } from '../stores'

    import UsersService from '../$services/users.service'
    import Utils from '../utils'

    import Table from '../$components/table.svelte'
    import Search from '../$components/search.svelte'
    import Button from '../$components/button.svelte'

    let loading = false
    let query = {}
    let metadata = {}


</script>

<h1>Hola</h1>