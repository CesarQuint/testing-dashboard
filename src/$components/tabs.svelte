<script>

    export let items = []
    export let selected = ''
    export let size = ''
    export let isCentered = false

    function setItem(item) {
        selected = item.value
    }

</script>

<!-- svelte-ignore a11y-missing-attribute -->
<!-- svelte-ignore a11y-click-events-have-key-events -->

<div class="tabs is-{ size }" class:is-centered={ isCentered }>
    <ul>
        {#each items as item}
            <li on:click={() => setItem(item)} class:is-active={ selected === item.value }>
                <a>
                    <span class="icon"><i class="fas fa-{ item.icon }" aria-hidden="true"></i></span>
                    <span>{ item.text }</span>
                </a>
            </li>
        {/each}
    </ul>
</div>