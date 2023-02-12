<?php

namespace Database\Factories;

use App\Models\Observation;
use App\Taxonomy;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Observation>
 */
class ObservationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        /** @var Carbon $date */
        $date = Carbon::make($this->faker->dateTimeBetween('-10 years'));
        $week_starts_at = Carbon::make($date)->startOfWeek(Carbon::MONDAY);

        $name = $this->faker->unique()->name;
        return [
            'name' => $name,
            'latin_name' => $name . '_latin',
            'family' => $this->faker->name,
            'taxonomy' => Taxonomy::Aus,
            'latitude' => $this->faker->latitude,
            'longitude' => $this->faker->longitude,
            'count' => $this->faker->numberBetween(1, 500),
            'observed_at' => $date,
            'observed_at_week' => $week_starts_at,
            'year' => $date->year,
            'observer_name' => $this->faker->name,
            'locality' => $this->faker->name
        ];
    }
}
