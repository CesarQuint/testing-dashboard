<script>

    import { HomeStore } from '../stores'

    import Utils from '../utils'

</script>

<div class="table-container">
    <table class="table is-fullwidth">
        <tbody>
            <tr>
                {#if $HomeStore.user }
                    <th>Usuario</th>
                    <td>{ $HomeStore.user.name }</td>
                {/if}
                
            </tr>
            <tr>
                <th>Calle</th>
                <td>{ $HomeStore.street }</td>
            </tr>
            <tr>
                <th>Numero Exterior</th>
                <td>{ $HomeStore.extnumber }</td>
            </tr>
            <tr>
                <th>Numero Interior</th>
                <td>{ $HomeStore.intnumber }</td>
            </tr>
            <tr>
                <th>Colonia</th>
                <td>{ $HomeStore.colony }</td>
            </tr>
            <tr>
                <th>Seccion</th>
                <td>{ $HomeStore.section }</td>
            </tr>
        </tbody>
    </table>
</div>