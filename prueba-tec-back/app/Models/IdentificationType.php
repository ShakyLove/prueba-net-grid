<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IdentificationType extends Model
{
    protected $table = "identification_type";
    protected $fillable = [
        'name',
    ];

    public function user(){
        return $this->hasMany(User::class);
    }
}
