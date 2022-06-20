<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmployeesController;

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
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/Stock', [App\Http\Controllers\StockController::class, 'index']);
Route::get('/App', [App\Http\Controllers\AuthController::class, 'index']);
Route::get('/Inventory', [App\Http\Controllers\InventoryController::class, 'index']);
Route::get('/Allowance', [App\Http\Controllers\AllowanceController::class, 'index']);

// ORDER
Route::get('/Order', [App\Http\Controllers\OrderController::class, 'index']);
Route::get('/Order2', [App\Http\Controllers\OrderController::class, 'index']);
Route::post('/addOrder', [App\Http\Controllers\OrderController::class, 'addOrder']);
Route::post('/saveOrder', [App\Http\Controllers\OrderController::class, 'saveOrder']);
Route::post('/editOrder', [App\Http\Controllers\OrderController::class, 'editOrder']);
Route::post('/editOrders', [App\Http\Controllers\OrderController::class, 'editOrders']);
Route::post('/deleteOrder', [App\Http\Controllers\OrderController::class, 'deleteOrder']);
Route::post('/updateDp2', [App\Http\Controllers\OrderController::class, 'updateDp2']);

Route::get('/get/employee/list', [EmployeesController::class, 'getEmployeeList'])->name('employee.list');