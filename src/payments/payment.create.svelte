<script>
   import {TicketStore} from '../stores'

    import Select from '../$components/select.svelte'
    import PaymentCard from './payment.create.card.svelte'
    import PaymentVoucher from './payment.create.file.svelte'

    let option = ''

</script>

<h2 class="title is-5">Seleccione su metodo de pago</h2>

<div class="columns">
    <div class="column">
       <Select bind:value={option} options={[{value:"card",text:"Tarjeta"},{value:"voucher",text:"Comprobante"}]}/>
    </div>
</div>

{#if option == 'voucher'}
    <PaymentVoucher/>
{/if}

{#if option == 'card'}
    <PaymentCard/>
{/if}
