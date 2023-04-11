<script>

    import { TicketStore } from '../stores'

    import Utils from '../utils'

</script>

<div class="table-container">
    <table class="table is-fullwidth">
        <tbody>
            <tr>
                <th>Concepto</th>
                <td>{$TicketStore.concept}</td>
            </tr>
            <tr>
                <th>Tipo</th>
                <td>{$TicketStore.type}</td>
            </tr>
            <tr>
                <th>Cantidad</th>
                <td>{$TicketStore.amount}</td>
            </tr>
            <tr>
                <th>Fecha de Creacion</th>
                <td>{Utils.dateLarge($TicketStore.created)}</td>
            </tr>
            <tr>
                <th>Fecha Limite</th>
                <td>{Utils.dateLarge($TicketStore.limited)}</td>     
            </tr>
        </tbody>
    </table>
</div>