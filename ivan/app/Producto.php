<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    protected $table = "productos";
    protected $fillable=['nombre','descripcion','precio','created_at','updated_at'];

    public function users(){

        return $this->belongsTo('App\User');
    }

}
