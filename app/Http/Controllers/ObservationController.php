<?php

namespace App\Http\Controllers;

use App\Filters\ObservationFilters;
use App\Models\Observation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class ObservationController extends Controller
{
    public function map(Request $request): Response
    {
        return Inertia::render('Map', [
            'observations' => Observation::filters(ObservationFilters::class, $request->all())->get(),
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
