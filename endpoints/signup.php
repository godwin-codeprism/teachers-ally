<?php
    include('./connection.php');
    $signup_data = json_decode(file_get_contents('php://input'));
    $q = "INSERT INTO `teachers`(`firstname`, `lastname`, `username`, `email`, `school`, `password`, `token`) VALUES (:firstname, :lastname, :username, :email, :school, :password, :token)";
    $query = $db -> prepare($q);
    $execute = $query -> execute(array(
        ":firstname"=> $signup_data -> firstname,
        ":lastname" => $signup_data -> lastname,
        ":username" => $signup_data -> username,
        ":email" => $signup_data -> email,
        ":school" => $signup_data -> school,
        ":password" => sha1($signup_data -> password),
        ":token" => $signup_data -> username ."|".uniqid().uniqid().uniqid()
    ));
    echo $signup_data -> username ."|".uniqid().uniqid().uniqid();
?>