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

    function updateColumns($username, $class_name, $exam_name, $exam_index, $settings){
        $class_file = "../database/".$username."/".$class_name.".json";
        $class = json_decode(file_get_contents($class_file));
        $class[$exam_index] -> settings = $settings;
        file_put_contents($class_file, json_encode($class));
        return "Columns Updated by ".$username." for class: ".$class_name.", for exam: ".$exam_name;
    }

    function updateSubjects($username, $class_name, $exam_name, $exam_index, $settings){
        $class_file = "../database/".$username."/".$class_name.".json";
        $class = json_decode(file_get_contents($class_file));
        $class[$exam_index] -> settings = $settings;
        file_put_contents($class_file, json_encode($class));
        return "Subjects Updated by ".$username." for class: ".$class_name.", for exam: ".$exam_name;
    }
    function updateCalculations($username, $class_name, $exam_name, $exam_index, $settings){
        $class_file = "../database/".$username."/".$class_name.".json";
        $class = json_decode(file_get_contents($class_file));
        $class[$exam_index] -> settings = $settings;
        file_put_contents($class_file, json_encode($class));
        return "Calculations Updated by ".$username." for class: ".$class_name.", for exam: ".$exam_name;
    }
?>