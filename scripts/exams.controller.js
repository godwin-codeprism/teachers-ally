angular.module('teachersAlly')
    .controller('examsController', ['$scope', '$http', '$stateParams', function ($scope, $http, $stateParams) {
        $http.get('./database/' + $stateParams.user + '/' + $stateParams.class + '.json').then(function (res) {
            if(res.data == undefined || res.data == ""){
                $scope.classData = [];
            }else{
                $scope.classData = res.data;
            }
        }).catch(function (err) {
            console.error(err);
        })
    }]);