<?php

namespace App\Trait;

trait FuncAssets
{
    //
    protected function customHash($string, $lower)
    {
        return md5(md5(md5(trim($lower ? strtolower($string) : $string))));
    }
}