<?php
    include('./connection.php');
    $username = file_get_contents('php://input');
    $q= $db -> query("SELECT * FROM `teachers` WHERE `username` = '$username'");
    $user_data = $q -> fetchAll();
    print_r(json_encode($user_data));    
?>