angular.module('teachersAlly')
    .controller('classroomController', ['$scope', '$http', '$stateParams', '$state', function ($scope, $http, $stateParams, $state) {
        $scope.teacherName = undefined;
        $scope.shortName = undefined;
        $http.post('./endpoints/fetch-userdata.php', $stateParams.user)
            .then(function (res) {
                $scope.teacherName = res.data[0].firstname;
                $scope.shortName = res.data[0].firstname.charAt(0) + res.data[0].lastname.charAt(0);
                $state.go('classroom.classes');
            }).catch(function (err) {
                console.error(err);
            })
    }]);