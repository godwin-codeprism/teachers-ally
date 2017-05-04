<?php 
    $angular_data = file_get_contents("php://input");
    $username = json_decode($angular_data) -> username;
    if(!file_exists("../database")){
        mkdir("../database");
        mkdir("../database/".$username);
        $user_data = fopen("../database/".$username."/".$username."_data.json","w");
        fwrite($user_data,"[]");
        fclose($user_data);
        echo "Database,".$username.", ".$username."_data.json were missing so created";
    }elseif (!file_exists("../database/".$username)) {
        mkdir("../database/".$username);
        $user_data = fopen("../database/".$username."/".$username."_data.json","w");
        fwrite($user_data,"[]");
        fclose($user_data);
        echo $username.", ".$username."_data.json were missing so created";
    }elseif(!file_exists("../database/".$username."/".$username."_data.json")){
        $user_data = fopen("../database/".$username."/".$username."_data.json","w");
        fwrite($user_data,"[]");
        fclose($user_data);
        echo $username."_data.json was missing so created";
    }
?>