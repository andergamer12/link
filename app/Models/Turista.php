<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Turista extends Model
{
    use HasFactory;
    protected $fillable = [
        'id',
        'dni',
        'tel',
        'CodPais',
    ];
}
