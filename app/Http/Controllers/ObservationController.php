<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ObservationController extends Controller
{
    public function map(): Response
    {
        return Inertia::render('Map', []);
    }

    public function data(): Response
    {
        return Inertia::render('Data', []);
    }
}
