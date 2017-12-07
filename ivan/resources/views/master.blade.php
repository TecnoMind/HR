<!doctype html>
<html>
  <head>
     <title> Herbalife Ensenada - @yield('title')</title>

    <!-- Fonts -->

    <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="css/contacto.css">
    <link rel="stylesheet" href="css/informacion.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  </head>

  <body>


    @yield('contenido')
    <img src="https://yt3.ggpht.com/-V_UuhqoTZrg/AAAAAAAAAAI/AAAAAAAAAAA/QcAE-Smpi3o/s900-c-k-no-mo-rj-c0xffffff/photo.jpg" width="25%" height="95%">
    <div   class="top-titulo">
      <h1 class="texto"> Herbalife Ensenada</h1>
      <p class="texto">Empresa dedicada a la nutricion</p>


    </div>
    <div class="menu">
      <nav  class="navbar navbar-inverse">
        <div class="container-fluid">
          <div class="navbar-header">
            <a class="navbar-brand" href="/">Herbalife</a>
          </div>
          <ul class="nav navbar-nav">

            <li><a href="producto">Productos</a></li>
            <li><a href="contacto">Contacto</a></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li><a href="#"><span class="glyphicon glyphicon-user"></span> Iniciar Sesion</a></li>
            <li><a href="#"><span class="glyphicon glyphicon-log-in"></span> Registrarse</a></li>
          </ul>
        </div>
      </nav>
    </div>

  <footer style="text-align:end"> Copyright -Herbalife Ensenada Derechos Reservados</footer>


  </body>


</html>