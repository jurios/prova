<?php

namespace App\Http\Controllers;

use App\Models\Observation;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class ObservationController extends Controller
{
    public function map(): Response
    {
        return Inertia::render('Map', [
            'observations' => Observation::all(),
            'species' => DB::table('observations')
                ->select('name', 'latin_name')
                ->groupBy('latin_name', 'name')
                ->get(),
            'years' => Observation::select(DB::raw('EXTRACT(YEAR from observed_at) as extracted_year'))
                ->distinct()
                ->get()
                ->pluck('extracted_year')
        ]);
    }

    public function data(): Response
    {
        return Inertia::render('Data', []);
    }
}
