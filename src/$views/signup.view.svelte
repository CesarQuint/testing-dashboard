<script>

    import UserLogin from '../users/user.login.svelte'

</script>

<style>
    .columns {
        height: 100vh;
    }
</style>

<div class="columns">
    <div class="column items center">
        <div class="box" style="min-width: 30%;">
            <div class="title">Login</div>
            <br>
            <UserLogin />
        </div>
    </div>
</div>