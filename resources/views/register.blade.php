<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    
    <link rel="stylesheet" type="text/css" href="/CityTours/resources/views/diseño_login.css">
	<link rel="stylesheet" href="style.css">
    <style>
		.checkbox {
        width: auto;
        background: transparent;
        border: none;
    }
        #btn-ingresar {
            position:fixed;

            right: 920px;
        }
        .form-group {
        margin-bottom: 20px; /* Aumenta este valor para agregar más espacio entre los inputs */
    }
	* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}



.form-register {
  width: 400px;
  background: #24303c;
  padding: 30px;
  margin: auto;
  margin-top: 100px;
  border-radius: 4px;
  font-family: 'calibri';
  color: white;
  box-shadow: 7px 13px 37px #000;
}

.form-register h4 {
  font-size: 22px;
  margin-bottom: 20px;
}

.controls {
  width: 100%;
  background: #24303c;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 16px;
  border: 1px solid #1f53c5;
  font-family: 'calibri';
  font-size: 18px;
  color: white;
}

.form-register p {
  height: 40px;
  text-align: center;
  font-size: 18px;
  line-height: 40px;
}

.form-register a {
  color: white;
  text-decoration: none;
}

.form-register a:hover {
  color: white;
  text-decoration: underline;
}

.form-register .botons {
  width: 100%;
  background: #1f53c5;
  border: none;
  padding: 12px;
  color: white;
  margin: 16px 0;
  font-size: 16px;
}

	
    </style>
</head>
<body>
    <br>
    <br>
    <br>
    <br>
    
	

	<form method="POST" action="{{route('validar-registro')}}">
        @csrf
		<section class="form-register">
			<h4>Registrar Usuario</h4>
			@if ($errors->any())
                <div class="alert alert-danger">
                    <ul>
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif
			<input class="controls" type="text" name="name" id="nombres" placeholder="Ingrese su Nombre" required>
			<input class="controls" type="email" name="email" id="correo" placeholder="Ingrese su Correo" required>
			<input class="controls" type="password" name="password" id="password" placeholder="Ingrese su Contraseña" required>
			<input class="controls" type="password" name="conf_password" id="conf_password" placeholder="Confirme su contraseña" required>
			<input class="controls" type="text" name="dni" id="dni" placeholder="Ingrese su número de DNI" required>
			<input class="controls" type="text" name="tel" id="tel" placeholder="Ingrese su número de teléfono o celular" required>
			<select name="pais" required>
				@foreach($paises as $pais)
					<option value="{{ $pais->CodPais }}">{{ $pais->NomPais }}</option>
				@endforeach
			</select>
			
			<br>

			<input class="botons" type="submit" value="Registrar">
			<p><a href="#">¿Ya tengo Cuenta?</a></p>
		  </section>
	</form>
    


</body>
</html>