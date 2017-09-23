<?php
    $angularData = json_decode(file_get_contents('php://input'));
   if(!is_null($angularData -> action)){
        if(is_null($angularData -> params)){
            echo call_user_func("finalPost");
        }else{
            echo call_user_func_array("finalPost",$angularData -> params);
        }
    }
    function finalPost($username, $class_name, $exam_name, $exam_index, $settings){
        $class_file = "../database/".$username."/".$class_name.".json";
        $class = json_decode(file_get_contents($class_file));
        $class[$exam_index] -> settings = $settings;
        file_put_contents($class_file, json_encode($class));
        switch ($GLOBALS['angularData'] -> action) {
            case 'updateColumns':
                return "Columns Updated by ".$username." for class: ".$class_name.", for exam: ".$exam_name;
                break;            
            case 'updateSubjects':
                return "Subjects Updated by ".$username." for class: ".$class_name.", for exam: ".$exam_name;
                break;
            case 'updateCalculations':
                return "Calculations Updated by ".$username." for class: ".$class_name.", for exam: ".$exam_name;
                break;
            case 'updateReorderList':
                return "ReoderList action is called";
                break;
            default:
                return "FinalPost called without any action specified, Please check data";
                break;
        }
    }
?>