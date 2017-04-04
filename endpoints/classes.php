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


    function createNewClass($username,$filename,$userData){
        $userDataFile = fopen("../database/".$username."/".$username."_data.json", "w");
        $jsonFile = fopen("../database/".$username."/".$filename.".json", "w");
        fwrite($userDataFile, json_encode($userData));
        fwrite($jsonFile, "");
        return 'Success';
    }

    function updateClasses($username,$newData, $userRequest){
        $userDataFile = fopen("../database/".$username."/".$username."_data.json", "w");
        fwrite($userDataFile, json_encode($newData));
        if($userRequest -> type == "deleteClass"){
            return deleteClass($username, $userRequest -> class);
        }elseif($userRequest -> type == "updateClassName"){
            return "Update Class Name with: ".$userRequest -> class;
        }else if($userRequest -> type == "lastUpdated_ExamsNum"){
            return "Changed LastUpdated and Date";
        }
        else{
            return $userRequest -> class ." updated";
        }
    }

    function deleteClass ($username,$classname){
        if(!is_dir("../database/".$username."/trash")){
            mkdir("../database/".$username."/trash");
        }
        if(copy("../database/".$username."/".$classname.".json","../database/".$username."/trash"."/".$classname.".json")){
            unlink("../database/".$username."/".$classname.".json");
            return $classname." deleted sucessfully";
        }else{
            return $classname." could not be deleted";
        }
    }
?>