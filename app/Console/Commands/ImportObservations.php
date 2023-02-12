<?php

namespace App\Console\Commands;

use App\Actions\ImportObservation;
use Carbon\Carbon;
use Exception;
use Illuminate\Console\Command;
use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class ImportObservations extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'observations:import {file}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import CSV file with observations';

    /**
     * Execute the console command.
     *
     * @return int
     * @throws FileNotFoundException
     */
    public function handle()
    {
        /** @var Filesystem $files */
        $files = app('files');
        $filePath = base_path($this->argument('file'));

        if ($files->isReadable($filePath)) {
            $content = $files->get($filePath);
            foreach (explode("\n", $content) as $row => $line) {
                if ($row === 0 || $row === 1) {
                    continue; //HEADERS
                }

                $data = explode("\t", $line);
                $date = Carbon::createFromFormat('d.m.Y H:i', $data[7] . ' ' . $data[11])->format('Y-m-d H:i');
                try {
                    app(ImportObservation::class)([
                        'name' => $data[2],
                        'latin_name' => $data[3],
                        'latitude' => $data[19],
                        'longitude' => $data[20],
                        'count' => $data[24],
                        'observed_at' => $date,
                        'observer_name' => $data[37] . ' ' . $data[38],
                        'locality' => $data[15],
                    ]);
                } catch (Exception $e) {
                    $this->info("Line {$row} is not compatible: {$e->getMessage()}");
                }
            }
        }
    }
}
