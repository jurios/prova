<?php

namespace App\Actions;

use App\Models\Observation;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;

class ImportObservation
{
    public function __invoke(array $input): Observation
    {
        Validator::validate($input, [
            'name' => ['required', 'string:255'],
            'latin_name' => ['required', 'string:255'],
            'latitude' => ['required', 'numeric'],
            'longitude' => ['required', 'numeric'],
            'count' => ['required', 'integer', 'min:1'],
            'observed_at' => ['required', 'date'],
            'observer_name' => ['required', 'string:255'],
            'locality' => ['required', 'string:255'],
        ]);

        $input['observed_at'] = Carbon::make($input['observed_at']);
        $input['observed_at_week'] = Carbon::make($input['observed_at'])->startOfWeek(Carbon::MONDAY);

        return Observation::create($input);
    }
}
