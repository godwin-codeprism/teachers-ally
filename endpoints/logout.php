<?php
    include('./connection.php');
    $username = file_get_contents('php://input');
    $q = "UPDATE `teachers` SET `token` = 'LOGGED_OUT' WHERE `username` = '$username'";
    $query = $db -> prepare($q);
    $query -> execute();
?>