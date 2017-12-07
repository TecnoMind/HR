<?php

$_GET['action'];
function autoload($clase){
//include "Clases/" . $clase . ".php";
include $_GET['action']. "/" .$clase.".php";
}

spl_autoload_register('autoload');

Persona::habla("\nHola");
Auto::mostrar("\nEncendio");
?>