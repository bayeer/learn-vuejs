<!DOCTYPE html>
<html>
    <head>
        <title>Laravel</title>

        <link href="https://fonts.googleapis.com/css?family=Lato:100" rel="stylesheet" type="text/css">
        <link href="/css/app.css" rel="stylesheet" type="text/css">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <style>
        </style>
    </head>
    <body>
        <div class="container">
            <div class="content">
                
                <div id="app" v-cloak>
                    <h1>@{{ title }}</h1>
                    <hr>
                    <tasks></tasks>

                </div>

            </div>
        </div>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.28/vue.js"></script>
        <script src="/js/app.js"></script>
    </body>
</html>
