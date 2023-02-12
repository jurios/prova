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

    public function data(Request $request): Response
    {
        return Inertia::render('Data', [
            'observations' => Observation::filters(ObservationFilters::class, $request->all())
                ->select('latin_name', 'name','observed_at_week', DB::raw('SUM(count) as count'))
                ->groupBy('observed_at_week', 'latin_name', 'name')
                ->orderBy('observed_at_week', 'desc')
                ->paginate(10),

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
}
