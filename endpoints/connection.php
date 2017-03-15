<?php
$db = new PDO("mysql:host=localhost;dbname=godwin;port:3306","root","password");
/*    try{

        $db = new PDO("mysql:host=localhost;dbname=godwin;port:3306","root","password");
        $db ->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
        echo "Database Conncetion Success";
    }
    catch(PDOException $e)
    {
        echo "Connection Failed: ".$e->getMessage();
    }*/
?>