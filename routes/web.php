<?php

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
/*
Route::get('/', function () {
    return view('square-payment');
});
*/

Route::get('/', 'SquarePaymentController@index');
Route::post('/', 'SquarePaymentController@processCard');

/*
Route::group(array('domain' => 'square-payment.laravel-package.test.local'), function () {
    
    Route::get('/', 'SquarePaymentController@index');

    Route::post('/', 'SquarePaymentController@processCard');
    
});

*/
