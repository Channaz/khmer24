<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Query\Builder;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    protected $table = 'tbl_user';
    protected $primaryKey = 'user_id';
    
    protected $casts = [
		'created_by' => 'int',
		'updated_by' => 'int'
	];

    protected $fillable = [
      'first_name',
      'last_name',
      'email',
      'password',
      'phone_number',
      'auth_token',
      'rem_expiry',
      'is_active',
      'social_provider_id',
      'social_provider_type',
      'updated_by',
      'created_by'
    ];

    
}