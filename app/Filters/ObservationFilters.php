<?php

namespace App\Filters;

use Illuminate\Database\Eloquent\Builder;

class ObservationFilters extends Filters
{
    /**
     * Filters observations by observed_at year
     *
     * @param Builder $query
     * @param string $year
     * @return Builder
     */
    protected function year(Builder $query, string $year): Builder
    {
        return $query->whereYear('observed_at', $year);
    }

    /**
     * Filters observations by the species name
     *
     * @param Builder $query
     * @param string $specie
     * @return Builder
     */
    protected function species(Builder $query, string $specie): Builder
    {
        return $query->where('latin_name', $specie);
    }
}
