<script>

    import { NotificationStore } from '../stores'

    import Utils from '../utils'

</script>

<div class="table-container">
    <table class="table is-fullwidth">
        <tbody>
            <tr>
                {#if $NotificationStore.user }
                    <th>Usuario</th>
                    <td>{ $NotificationStore.user.name }</td>
                {/if}
                
            </tr>
            <tr>
                <th>Titulo</th>
                <td>{ $NotificationStore.title }</td>
            </tr>
            <tr>
                <th>Descripcion</th>
                <td>{ $NotificationStore.description }</td>
            </tr>
            <tr>
                <th>Relevancia</th>
                <td>{ $NotificationStore.relevance == 'high'?'Alta':$NotificationStore.relevance == 'medium' ? 'Media':'Baja'}</td>
            </tr>
            <tr>
                <th>Creada</th>
                <td>{Utils.dateTime($NotificationStore.created)}</td>
            </tr>
        </tbody>
    </table>
</div>