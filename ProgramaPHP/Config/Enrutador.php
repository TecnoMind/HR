<?php namespace Config; 

class Enrutador{
  public static function run(Request $request){
      $controlador = $request->getControlador() . "Controller";
      //print $controlador;
      $ruta = ROOT . "Controllers" . DS . $controlador . ".php";
      //print $ruta;
       $metodo = $request->getMetodo();
       $argumento = $request->getArgumento(); 
    }
}

?>