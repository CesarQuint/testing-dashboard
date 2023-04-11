<script>

    import { HomeStore } from '../stores'

    import Menu from '../$layouts/menu.svelte'
    import Modal from '../$components/modal.svelte'
    import Dropdown from '../$components/dropdown.svelte'

    import Homes from '../homes/homes.svelte'
    import HomeRead from '../homes/home.read.svelte'
    import HomeCreate from '../homes/home.create.svelte'
    import HomeUpdateUser from '../homes/home.update.user.svelte'
    import HomeUpdate from '../homes/home.update.svelte'
    import HomeDelete from '../homes/home.delete.svelte'

    export let currentRoute = null

</script>

<Menu path={ currentRoute.path }>
    <Homes />
</Menu>

<Modal id="HomeRead" title="Información" >
    <div class="dropread">
        <Dropdown icon="bars" color="white" isRight options={[
            {value: 'edit', text: 'Editar', click: () => HomeStore.modalUpdate()},
            {value: 'delete', text: 'Borrar', click: () => HomeStore.modalDelete()},
            "divider",
            {value: 'editUser', text: 'Editar Usuario', click: () => HomeStore.modalOpen('UpdateUser')}
        ]} />
    </div>
    <HomeRead />
</Modal>

<Modal id="HomeCreate" title="Crear" >
    <HomeCreate on:created={() => HomeStore.modalClose()} on:canceled={() => HomeStore.modalClose()} />
</Modal>

<Modal id="HomeUpdate" title="Editar" >
    <HomeUpdate on:updated={() => HomeStore.modalRead()} on:canceled={() => HomeStore.modalRead()} />
</Modal>

<Modal id="HomeUpdateUser" title="Editar Usuario" >
    <HomeUpdateUser on:updated={() => HomeStore.modalRead()} on:canceled={() => HomeStore.modalRead()} />
</Modal>


<Modal id="HomeDelete" title="Borrar" >
    <HomeDelete on:deleted={() => HomeStore.modalClose()} on:canceled={() => HomeStore.modalRead()} />
</Modal>