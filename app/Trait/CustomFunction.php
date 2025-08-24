<?php

namespace App\Trait;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

trait CustomFunction
{
    //
    public static function hash($string, $lower){
        
        return md5(md5(md5(trim($lower ? strtolower($string) : $string))));
    }

    public static function setCookie(
        Response $response,
        string|null $name = null,
        string|null $value = null,
        int $minutes = 0,
        string|null $path = null,
        string|null $domain = null,
        bool|null $secure = null,
        bool $httpOnly = true,
        bool $raw = false,
        string|null $sameSite = null
    ){
        return $response->cookie($name, $value, $minutes, $path, $domain, $secure, $httpOnly, $raw, $sameSite)
            ->cookie($name . '-HASH', self::hash($value, false), $minutes, $path, $domain, $secure, false, $raw, $sameSite);
    }

    public static function getCookie(
        Request $request,
        string|null $name = null,
    ) {
        $cookie = $request->cookie($name);
        $cookieHash = $request->cookie($name . '-HASH');
        if (self::hash($cookie, false) !== $cookieHash) {
            return null;
        }
        return $cookie;
    }
}