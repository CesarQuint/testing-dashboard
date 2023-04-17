<script>

    import { onMount } from 'svelte'
    import {SessionStore,PaymentsStore, PaymentStore, ToastStore } from '../stores'

    import PaymentsService from '../$services/payments.service'
    import HomeService from '../$services/homes.service'
    import Utils from '../utils'

    import Table from '../$components/table.svelte'
    import Search from '../$components/search.svelte'

    let loading = false 
    let query = {}
    let metadata = {}

    onMount(getPayments)

    async function getPayments() {

        loading = true
        const home = await HomeService.getHomeUser($SessionStore.userId)
        query.homeId = home.data._id
        const response = await PaymentsService.getPayments(query)
        loading = false

        if(response.error)
            return ToastStore.error(response.error)

        PaymentsStore.set(response.data.payments)
        metadata = response.data.metadata

    }
</script>

<Search on:enter={ getPayments } bind:value={ query.find } >
</Search>

<Table bind:query items={ $PaymentsStore.length } on:change={ getPayments } { metadata } { loading }>
    <thead>
        <th>#</th>
        <th>Casa</th>
        <th>Concepto</th>
        <th>Cantidad</th>
        <th>Estatus</th>
        <th>Fecha de Creacion</th>
    </thead>
    <tbody>
        {#each $PaymentsStore as payment, index}
            <tr on:click={() => PaymentStore.modalRead(payment)}>
                <td>{ (index+1) + ( metadata.page * metadata.limit ) }</td>
                <td>{String(payment.home.address).substring(0,30) + "..."}</td>
                <td>{payment.concept}</td>
                <td>{Utils.cash(payment.amount)}</td>
                <td><strong>{payment.status == 'complete'?'Completado':payment.status == 'failed' ?'Fallido':'Pendiente..'}</strong></td>
                <td>{ Utils.dateLarge(payment.created) }</td>
            </tr>
        {/each}
    </tbody>
</Table>