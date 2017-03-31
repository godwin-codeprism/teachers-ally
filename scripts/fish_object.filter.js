angular.module('teachersAlly')
.filter('fishObject',function(){
    return function(array,value,key){
        for(i=0;i < array.length; i++ ){
            if(array[i][key] == value){
                return i;
            }
        }
        return null;
    }
});