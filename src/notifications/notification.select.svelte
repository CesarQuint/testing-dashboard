<script>

    import { HomesStore, ToastStore } from '../stores'
    import { createEventDispatcher } from 'svelte'

    import HomesService from '../$services/homes.service'

    import DropdownSelect from '../$components/dropdown.select.svelte'

    const dispatch = createEventDispatcher()

    export let homeId = null
    export let column = true

    let loading = false
    let query = {
        all : true
    }
    let show = false

    async function getHomes() {
        
        loading = true
        const response = await HomesService.getHomes(query)
        loading = false

        if(response.error) 
            return ToastStore.error(response.error)

        HomesStore.set(response.data.homes)
        console.log($HomesStore);
        show = !!response.data.homes.length
    }

    function onKeyup() {

        HomesStore.set([])
        homeId = null
        show = false

        if(query.find.length > 1)
            getHomes()
    }

    function onSelect(event) {

        const home = event.detail

        homeId = home._id
        query.find = home.address

        dispatch('select', home)
    }

</script>

<DropdownSelect 
    on:select={ onSelect }
    on:keyup={ onKeyup }
    bind:value={ homeId }
    bind:text={ query.find }
    bind:show
    label="Casa"
    placeholder="Buscar casa"
    items={ $HomesStore }
    prop="address"
    { column }
/>