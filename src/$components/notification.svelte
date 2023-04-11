<script>
   
   export let color = 'success'
   export let isLight = false

</script>

<div class="notification is-{ color }" class:is-light={isLight}>
  <slot>

  </slot>
</div>