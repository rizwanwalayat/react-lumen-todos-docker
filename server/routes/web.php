<?php

/** @var \Laravel\Lumen\Routing\Router $router */
use App\Todo;
use GuzzleHttp\Psr7\Request;

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});
// $router->get('/key', function() {
//     return \Illuminate\Support\Str::random(32);
// });
// $router->get('/user', function (Request $request) {
//     return $request;
// });
$router->group(['middleware' => 'auth'], function() use ($router) {

    $router->get('/user', 'AuthController@user');
    $router->get('/todos', 'TodosController@index');
    $router->get('/todos/{id}', 'TodosController@show');
    $router->patch('/todos/{id}', 'TodosController@update');
    $router->delete('/todos/{id}', 'TodosController@destroy');
    $router->post('/todos', 'TodosController@store');
    $router->post('/logout', 'AuthController@logout');

});

$router->post('/register', 'AuthController@register');

