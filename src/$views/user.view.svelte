<script>

    import { UserStore } from '../stores'

    import Menu from '../$layouts/menu.svelte'
    import Modal from '../$components/modal.svelte'
    import Dropdown from '../$components/dropdown.svelte'

    import Users from '../users/users.svelte'
    import UserRead from '../users/user.read.svelte'
    import UserCreate from '../users/user.create.svelte'
    import UserUpdatePassword from '../users/user.update.password.svelte'
    import UserUpdate from '../users/user.update.svelte'
    import UserDelete from '../users/user.delete.svelte'


    export let currentRoute = null

</script>

<Menu path={ currentRoute.path }>
    <Users />
</Menu>

<Modal id="UserRead" title="Información" >
    <div class="dropread">
        <Dropdown icon="cog" color="white" isRight options={[
            {value: 'edit', text: 'Editar', click: () => UserStore.modalUpdate()},
            {value: 'delete', text: 'Borrar', click: () => UserStore.modalDelete()},
            "divider",
            {value: 'editPassword', text: 'Editar Contaseña', click: () => UserStore.modalOpen('UpdatePassword')}
        ]} />
    </div>
    <UserRead>
        <div slot="home">

        </div>
    </UserRead>
</Modal>


<Modal id="UserUpdate" title="Editar" >
    <UserUpdate on:updated={() => UserStore.modalRead()} on:canceled={() => UserStore.modalRead()} />
</Modal>

<Modal id="UserUpdatePassword" title="Editar Contraseña" >
    <UserUpdatePassword on:updated={() => UserStore.modalRead()} on:canceled={() => UserStore.modalRead()} />
</Modal>
