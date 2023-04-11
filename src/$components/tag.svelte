<script>

    export let color = ''
    export let text = ''
    export let size = 'normal'
    export let isLight = false 
    export let isRounded = false 
    export let isDelete = false
   
</script>

<style>
    .tag{margin: 0 0.5rem;}
</style>

<span
    class="tag is-{color} is-{size}"
    class:is-light={isLight}
    class:is-rounded={isRounded}
    >
    {text}
    {#if isDelete}
        <button on:click|preventDefault on:keyup|preventDefault class="delete"></button>
    {/if}
</span>