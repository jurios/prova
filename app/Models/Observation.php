<?php

namespace App\Models;

use App\Filters\Filterable;
use App\Taxonomy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Observation extends Model
{
    use HasFactory;
    use Filterable;

    public $timestamps = false;

    protected $casts = [
        'taxonomy' => Taxonomy::class,
        'observed_at' => 'datetime',
        'latitude' => 'float',
        'longitude' => 'float'
    ];
}
