<script>
   import {PaymentStore} from '../stores'

    import Button from '../$components/button.svelte'

</script>

<h2 class="title is-5">Seleccione su metodo de pago</h2>

<div class="columns">
    <div class="column">
        <Button on:click={() => PaymentStore.modalOpen('CreateCard')} text="Pago con Tarjeta" size="medium" color="primary" icon="credit-card"/>
    </div>
</div>

<div class="columns">
    <div class="column">
        <Button on:click={() => PaymentStore.modalOpen('CreateFile')} light text="Pago con Comprobante de pago" size="medium" color="primary" icon="file-invoice-dollar"/>
    </div>
</div>
