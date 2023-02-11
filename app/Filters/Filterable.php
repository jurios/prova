<?php

namespace App\Filters;

use Illuminate\Database\Eloquent\Builder;

trait Filterable
{
    public function scopeFilters(Builder $query, string $filterClass, array $input)
    {
        /** @var Filters $filters */
        $filters = new $filterClass;

        return $filters->apply($query, $input);
    }
}
