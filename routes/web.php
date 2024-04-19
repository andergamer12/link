<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\HomeController;

Route::get('/', HomeController::class);
Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');
Route::get('/registro', [LoginController::class, 'showRegisterForm'])->name('registro');
Route::view('/index', "index")->middleware('auth')->name('index'); //Para que solo se pueda entrar al index iniciando sesion

Route::post('/validar-registro', [LoginController::class, 'register'])->name('validar-registro');
Route::post('/inicia-sesion', [LoginController::class, 'login'])->name('inicia-sesion');
Route::get('/logout', [LoginController::class, 'logout'])->name('logout');
