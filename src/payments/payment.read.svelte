<script>
  import Home from '../homes/home.create.svelte';


    import { PaymentStore } from '../stores'

    import Utils from '../utils'

</script>


<div class="table-container">
    <table class="table is-fullwidth">
        <tbody>
            <tr>
                <th>Casa</th>
                <td>{$PaymentStore.home.address}</td>  
            </tr>
            <tr>
                <th>Estatus</th>
                <td>{$PaymentStore.status}</td>
            </tr>
            <tr>
                <th>Cantidad</th>
                <td>{Utils.cash($PaymentStore.amount)}</td>
            </tr>
            <tr>
                <th>Concepto</th>
                <td>{$PaymentStore.concept}</td>
            </tr>
            <tr>
                <th>Referencia</th>
                <td>{$PaymentStore.reference}</td>
            </tr>
            <tr>
                <th>Foto de pago</th>
                <td>{$PaymentStore.paymentphoto}</td>
            </tr>
        </tbody>
    </table>
</div>