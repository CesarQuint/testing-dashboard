<script>
	import { navigateTo } from 'svelte-router-spa';

    import UserRecovery from '../users/user.recoverypassword.svelte'

    export let currentRoute = {}

</script>

<style>

	div.bg{
		background-image: linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(117, 19, 93, 0.73)), url('/images/building.jpg');
		width:-webkit-fill-available;
		opacity: 70%;
		height:-webkit-fill-available;
		background-position: center;
		background-size: cover;
		position: absolute;
		top: 0;
		left: 0;
	}

    div.container{
		margin-top: 5rem;	
    }

	@media(min-width: 768px){
		div.container{
		margin-top: 12rem;
		}

		.is-flex{
		display: flex;
		flex-flow:row wrap !important;
		gap:1rem;
		justify-content: space-evenly;
		}
	}
	span{
		color:rgb(125, 125, 218);
	}
	.title{
		text-align: center;
		text-align-last: center;
        margin: 1rem 0 !important;
	}
	
	.is-flex{
		display: flex;
		flex-flow: column wrap;
		gap:1rem;
	}

	div.columns{
		margin: 0 0 0 0 !important;
	}

	div.container{
		overflow: hidden;
	}

	div.content{
		display: flex;
		flex-flow: column wrap;
	}

	i,a{
		text-align: center;
	}
	i{
		font-size: 10rem;
	}

</style>

<div class="bg">
</div>
<div class="container">
	<div class="columns is-desktop">
		<div class="column is-half is-10-mobile is-offset-one-quarter is-offset-1-mobile ">
			<div class="card">
					<div class="card-content">
						<div class="content mt-4">
							<i class="fas fa-unlock-alt"></i>
							<h1 class="title is-4">Administrador de <span>Pagos</span></h1>
                			<h2 class="title is-5">Cambio de Contraseña</h2>
								<UserRecovery token={currentRoute.namedParams.token}/>
								<div class="mt-4 is-flex">
									<a on:click={()=>{navigateTo('/')}}>Ir al Inicio</a>
								</div>
						</div>
					</div>
			</div>
		</div> 
	</div>
	</div>


