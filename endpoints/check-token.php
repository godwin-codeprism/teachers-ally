<?php
    include('./connection.php');
    $data = json_decode(file_get_contents('php://input'));
    $username = $data -> username;
    $token = $data -> token;
    $q = $db -> query("SELECT * FROM teachers WHERE `token` = '$token' AND `username` = '$username'");
    $check = $q -> fetchAll();
    if(count($check) == 1){
        echo "good";
    }else{
        echo "bad";
    }
?>