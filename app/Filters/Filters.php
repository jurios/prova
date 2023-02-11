<?php

namespace App\Filters;

use Illuminate\Database\Eloquent\Builder;

abstract class Filters
{
    public function apply(Builder $query, array $input): Builder
    {
        foreach ($input as $filter => $value) {
            if (method_exists($this, $filter)) {
                call_user_func_array([$this, $filter], array_filter([$query, $value]));
            }
        }

        return $query;
    }
}
