<?php

namespace Leiva2\Http\Controllers;

use App\User;
use App\Http\Controllers\Controller;

class PaginaController extends Controller{

    public function contacto()
    {
       // return "imprimiendo";
        return view('contacto');
    }
}