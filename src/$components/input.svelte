<script>

    export let type = 'text'
    export let value = null
    export let label = null
    export let icon = null
    export let color = null
    export let size = null
    export let placeholder = null

    export let loading = false
    export let disabled = false
    export let readonly = false

    export let column = true

</script>

<div class:column={ column }>
    <div class="field">

        {#if label}
            <label for="" class="label">{ label }</label>
        {/if}

        <p class="control" class:has-icons-left={ icon } class:is-loading={ loading }>

            {#if type === 'text'}
                <input type="text" bind:value on:keyup|preventDefault on:focus class="input is-{ color } is-{ size }" { placeholder } { disabled } { readonly } />
            {/if}
            {#if type === 'number'}
                <input type="number" bind:value on:keyup|preventDefault on:focus class="input is-{ color } is-{ size }" { placeholder } { disabled } { readonly } />
            {/if}
            {#if type === 'password'}
                <input type="password" bind:value on:keyup|preventDefault on:focus class="input is-{ color } is-{ size }" { placeholder } { disabled } { readonly } />
            {/if}

            {#if type === 'date'}
                <input type="date" bind:value on:keyup|preventDefault on:focus class="input is-{ color } is-{ size }" { placeholder } { disabled } { readonly } />
            {/if}

            {#if icon}
                <span class="icon is-left"><i class="fas fa-{ icon }" /></span>
            {/if}
        </p>
    </div>
</div>