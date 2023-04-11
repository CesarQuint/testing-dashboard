<script>
    export let icon = ''
</script>

<style>
.content p{
        font-size: 4rem;
        margin: 0;
        text-align: center;
    }
</style>

<div class="card">
    <div class="card-content">
        <div class="content">
            <p><i class="fas fa-{icon}"></i></p> 
            <slot></slot>
        </div>
    </div>
</div>