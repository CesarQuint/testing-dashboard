<script>

    import { createEventDispatcher ,tick} from 'svelte'

    export let value = null
    export let text = null
    export let label = null
    export let placeholder = null
    
    export let items = []
    export let prop = ''

    export let show = false
    export let column = true

    const dispatch = createEventDispatcher()

    function onSelect(item) {

        show = false
        text = item[prop]

        dispatch('select', item)
    }

    async function  onBlur() {
        await tick(()=>{
        show = false
        })
    }

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->

<div class:column={ column }>
    <div class="dropdown is-active" style="width: 100%;">
        <div class="dropdown-trigger" style="width: 100%;">
            <div class="field">
                <label for="" class="label">{ label }</label>
                <div class="control has-icons-left">
                    <span class="icon"><i class="fas fa-search"></i></span>
                    <input on:keyup|preventDefault on:blur={ onBlur } bind:value={ text } type="text" class="input" { placeholder } >
                </div>
            </div>
        </div>
        {#if show && !value}
            <div class="dropdown-menu" id="dropdown-menu" role="menu" style="width: 100%;">
                <div class="dropdown-content">
                    {#each items as item}
                        <div class="dropdown-item pointer" on:click={() => onSelect(item)} >{ item[prop] }</div>
                    {/each}
                </div>
            </div>
        {/if}
    </div>
</div>