<?php
/*
@author: Oscar Alderete <me@oscaralderete.com>
@website: https://oscaralderete.com
@editor: NetBeans IDE v12.5
*/

// load the custom class to manage admin access
require_once __DIR__ . '/classes/Main.php';

// instantiate our class
$class = new \OscarAlderete\Main(__DIR__);

// intercept all $_POST requests
$class->interceptPostRequests();

// render page
$class->renderPage();