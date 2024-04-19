<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="/CityTours/resources/views/diseño_login.css">
    <style>
        #btn-ingresar {
            position:fixed;

            right: 920px;
        }
    </style>
</head>
<body>
    <br>
    <br>
    <br>
    <br>
    
    
	<a href="https://front.codes/" class="logo" target="_blank">
		<img src="https://assets.codepen.io/1462889/fcy.png" alt="">
	</a>

	<form method="POST" action="{{route('inicia-sesion')}}">
        @csrf
		<div class="container" id='div_container'>
			<div class="row full-height justify-content-center">
				<div class="col-12 text-center align-self-center py-5">
					<div class="section pb-5 pt-5 pt-sm-2 text-center">
						<h6 class="mb-0 pb-3"><span>Iniciar Sesión </span><span>Recuperar Contraseña</span></h6>
			          	<input class="checkbox" type="checkbox" id="reg-log" name="reg-log"/>
			          	<label for="reg-log"></label>
						<div class="card-3d-wrap mx-auto">
							<div class="card-3d-wrapper">
								<div class="card-front">
									<div class="center-wrap">
										<div class="section text-center">
											<h4 class="mb-4 pb-3">Iniciar Sesión</h4>
											<div class="form-group">
												<input type="email" name="email" class="form-style" placeholder="Correo electrónico" id="email1" autocomplete="off">
												<i class="input-icon uil uil-at"></i>
											</div>	
											<div class="form-group mt-2">
												<input type="password" name="password" class="form-style" placeholder="Contraseña" id="password1" autocomplete="off">
												<i class="input-icon uil uil-lock-alt"></i>
											</div>
                                            <br>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" name="remember">
                                                <label class="form-check-label" for="flexCheckDefault">
                                                  Default checkbox
                                                </label>
                                              </div>
											<button type="submit" class="btn mt-4">Acceder</button>
                            				<p class="mb-0 mt-4 text-center">¿No tienes cuenta? <a href="{{route('registro')}}">Registrate</a></p>
				      					</div>
			      					</div>
			      				</div>
								<div class="card-back">
									<div class="center-wrap">
										<div class="section text-center">
											<h4 class="mb-4 pb-3">Recuperar Contraseña</h4>

											<div class="form-group mt-2">
												<input type="email" name="recemail" class="form-style" placeholder="Correo electrónico" id="logemail" autocomplete="off">
												<i class="input-icon uil uil-at"></i>
											</div>	
                                            <br>
		
                                            
											<a href="#" class="btn mt-4">Enviar Solicitud</a>
				      					</div>
			      					</div>
			      				</div>
			      			</div>
			      		</div>
			      	</div>
		      	</div>
	      	</div>
	    </div>
	</form>
    

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>
</html>