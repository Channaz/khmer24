<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>



    <!-- Scripts and Styles -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])

    <!-- AdminLTE required HTML classes -->
    <style>
        body {
            height: 100%;
            margin: 0;
            font-family: 'Source Sans Pro', sans-serif;
            font-weight: 400;
        }
    </style>
</head>
<body class="hold-transition sidebar-mini">
    <div id="app">
        <admin-layout></admin-layout>
    </div>
</body>
</html>
