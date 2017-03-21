<?php
    $angularData = json_decode(file_get_contents('php://input'));
    if(!is_null($angularData -> action)){
        $action = $angularData -> action; 
        if(is_null($angularData -> params)){
            echo call_user_func($action);
        }else{
            echo call_user_func_array($action,$angularData -> params);
        }
    }
    function getUntitled($username){
        if(is_dir("../database/".$username)){
            $fileList = scandir("../database/".$username,0);
            return json_encode($fileList);
        }else{
            return "Something went wrong";
        }
    }
    function createNewClass($username,$filename,$userData){
        $userDataFile = fopen("../database/".$username."/".$username."_data.json", "w");
        $jsonFile = fopen("../database/".$username."/".$filename.".json", "w");
        fwrite($userDataFile, json_encode($userData));
        fwrite($jsonFile, "");
        return 'Success';
    }
?>