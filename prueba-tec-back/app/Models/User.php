<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table = "user";

    protected $fillable = [
        'username',
        'name',
        'last_name',
        'type_identification_id',
        'identification',
        'password'
    ];

    public function user(){
        return $this->hasOne(IdentificationType::class);
    }
}
