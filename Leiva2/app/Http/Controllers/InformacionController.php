<?php

namespace App\Http\Controllers;

use App\User;
//use App\Http\Controllers\Controller;

class InformacionController extends Controller
{

    public function informacion()
    {
        return view('informacion');
    }
}