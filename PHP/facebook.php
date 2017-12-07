<?php 
   class Facebook {
    
    public $nombre;
    public $edad;
    private $pass;

   public function __construct($nombre,$edad,$pass){
    
    $this->nombre=$nombre;
    $this->edad=$edad;
    $this->pass=$pass;
    
   }
   public function mostrarInfo(){
     self:: cambiarPass("54321");
       echo "Nombre:\n".$this->nombre . "\nEdad:\n" . $this->edad . "\nPassword:\n" . $this-> pass;  
   }
   public function cambiarPass($pass){
   
   $this->pass=$pass;

   }

}

$usuario = new Facebook("Ivan","23","12345");

$usuario->mostrarInfo();
?>