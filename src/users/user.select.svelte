<script>

    import { UsersStore, ToastStore } from '../stores'
    import { createEventDispatcher } from 'svelte'

    import UsersService from '../$services/users.service'

    import DropdownSelect from '../$components/dropdown.select.svelte'

    const dispatch = createEventDispatcher()

    export let userId = null
    export let column = true

    let loading = false
    let query = {}
    let show = false

    async function getUsers() {
        
        loading = true
        const response = await UsersService.getUsers(query)
        loading = false

        if(response.error) 
            return ToastStore.error(response.error)

        UsersStore.set(response.data.users)
        show = !!response.data.users.length
    }

    function onKeyup() {

        UsersStore.set([])
        userId = null
        show = false

        if(query.find.length > 1)
            getUsers()
    }

    function onSelect(event) {

        const user = event.detail

        userId = user._id
        query.find = user.name

        dispatch('select', user)
    }

</script>

<DropdownSelect 
    on:select={ onSelect }
    on:keyup={ onKeyup }
    bind:value={ userId }
    bind:text={ query.find }
    bind:show
    label="Usuario"
    placeholder="Buscar usuario"
    items={ $UsersStore }
    prop="name"
    { column }
/>