<script>

    import { UsersStore, UserStore, ToastStore } from '../stores'
    import {createEventDispatcher} from 'svelte'

    import UsersService from '../$services/users.service'
    import User from '../users/user.read.svelte';

    const dispatch =createEventDispatcher()

    export let value = null
    export let cargado =false
    export let userId = null
    export let user = null

    function onKeyup(event){
      dispatch('input',value)
    }
    
    function Click(item){
      dispatch('Click',)
      userId = item._id
      user = item
      value = item.name
    }

</script>

<div class="dropdown is-active">
    <div class="dropdown-trigger">
      <input aria-haspopup="true" aria-controls="dropdown-menu"
        bind:value on:keyup={onKeyup}  
      />
    </div>
    {#if cargado}
      <div class='dropdown-menu'id="dropdown-menu" role="menu">
        <div class="dropdown-content">
          {#each $UsersStore as user }
          <a href="#" class="dropdown-item" on:click={()=>Click(user)}>
            {user.name}
          </a>
          {/each}
        </div>
      </div>
    {/if}
    
  </div>