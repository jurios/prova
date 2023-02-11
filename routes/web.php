<?php

use App\Http\Controllers\ObservationController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect()->route('app.observations.map');
});

Route::get('/map', [ObservationController::class, 'map'])->name('app.observations.map');
Route::get('/data', [ObservationController::class, 'data'])->name('app.observations.data');
