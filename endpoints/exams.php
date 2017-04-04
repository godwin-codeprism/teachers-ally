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

  function addNewExam ($username, $className, $exam){
    $classdataFile = fopen("../database/".$username."/".$className.".json","w");
    fwrite($classdataFile, json_encode($exam));
    return end($exam) -> name. " is added as a new exam";
  }

  function deleteExam ($username,$className,$newData,$examName){
    $classdataFile = fopen("../database/".$username."/".$className.".json","w");
    fwrite($classdataFile, json_encode($newData));
    return $examName ." is deleted from class ". $className. ' by '.$username;
  }

  function duplicateExam($username,$className,$newData,$examName){
      $classdataFile = fopen("../database/".$username."/".$className.".json","w");
    fwrite($classdataFile, json_encode($newData));
    return $examName ." is duplicated in class ". $className. ' by '.$username;
  }

  function updateExamName($username,$className,$newData,$userRequest){
    $classdataFile = fopen("../database/".$username."/".$className.".json","w");
    fwrite($classdataFile, json_encode($newData));
    return "Exam Name: '". $userRequest -> oldName ."' is updated to '". $userRequest -> newName."'";
  }
?>