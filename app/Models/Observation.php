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
        'observed_at_week' => 'datetime',
        'latitude' => 'float',
        'longitude' => 'float'
    ];

    protected $fillable = [
        'name',
        'latin_name',
        'latitude',
        'longitude',
        'count',
        'observed_at',
        'observed_at_week',
        'observer_name',
        'locality',
    ];
}
