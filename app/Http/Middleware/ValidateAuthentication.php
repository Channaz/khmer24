<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\User;
use Illuminate\Http\Request;
use App\Trait\CustomFunction;
use Symfony\Component\HttpFoundation\Response;

class ValidateAuthentication
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $auth_token = CustomFunction::getCookie($request, 'AUTH-TOKEN');
        $user = User::where('auth_token', $auth_token)->first();
        $request->setUserResolver(function () use ($user) {
            return $user;
        });
        return $user && $user->is_active === 1 ?
            $next($request) : response(['message' => 'គណនីប្រើប្រាស់មិនទាន់ផ្ទៀងផ្ទាត់!'], 401);
    }
}