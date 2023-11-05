<?php

use App\Http\Controllers\ImageController;
use App\Http\Controllers\QuoteController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LoginController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', [HomeController::class, 'index']);
Route::resource('image', ImageController::class)
    ->middleware('auth');
Route::resource('quote', QuoteController::class)
    ->middleware('auth');

Route::get('/login', [LoginController::class, 'login'])->name('login');
Route::post('/login', [LoginController::class, 'authenticate'])->name('login');
Route::get('/logout', [LoginController::class, 'logout'])->name('logout');

Route::get('/forgot', [LoginController::class, 'forgot'])->name('password.request');
Route::post('/forgot', [LoginController::class, 'sendForgot'])->name('password.email');
Route::get('/reset/{token}', [LoginController::class, 'reset'])->name('password.reset');
Route::post('/reset', [LoginController::class, 'sendReset'])->name('password.update');