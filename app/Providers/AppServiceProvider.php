<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use App;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        App::singleton('Loggy', function () {
            return new \Monolog\Logger("my-app", [new \Monolog\Handler\BrowserConsoleHandler(\Monolog\Logger::DEBUG)]);
        });
    }
}
