<?php

namespace App\Http\Controllers;

use App\User;
use App\Http\Controllers\Controller;

class ContactoController extends Controller
{
     function contacto()
    {
        $nombre='ivan';
        return view('contacto')->with([
       'nombre'=>'Mary',
       'empresa'=>'Herbalife'
        ]);
    }

}