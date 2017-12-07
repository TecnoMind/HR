<?php 

class Persona
{

   public $nombre = array();
   public $apellido = array();

    
    public function Guardar($nombre,$apellido){
       $this->nombre[] = $nombre;
       $this->apellido[] = $apellido;  


    }
    public function Mostrar(){
     for($i = 0; $i < count($this->nombre); $i++ ){
       self::Formato($this->nombre[$i],$this->apellido[$i]);
     }
    }

    public function Formato($nombre,$apellido){

       echo "Nombre:" . $nombre . "\n" ."Apellido" ."\n". $apellido  ."<br>"; 
    }
    public function Eliminar($nombre,$apellido){
     if()

    }
}
$persona = new Persona();
 $persona ->Guardar("Jose","Antillon");
 $persona ->Guardar("Jose Ivan", "Zuñiga");
 $persona ->Eliminar("Jose","Antillon");
 $persona -> Mostrar();


?>





