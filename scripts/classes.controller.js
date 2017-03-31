angular.module('teachersAlly')
    .controller('classesController', ['$scope', '$http', '$stateParams', '$filter', '$state', function ($scope, $http, $stateParams, $filter, $state) {
        $scope.classes = [];
        $scope.userRequest = {
            'class': null,
            'type': null
        };
        $http.get('./database/' + $stateParams.user + '/' + $stateParams.user + '_data.json')
            .then(function (res) {
                $scope.classes = res.data;
                $scope.$watchCollection('classes', function (newVal, oldVal) {
                    updateData(newVal);
                });
            }).catch(function (err) {
                console.log(err);
            })
        $scope.createNewClass = function () {
            var userData = {
                'class': 'Untitled',
                'date_created': Date.now(),
                'date_modified': Date.now(),
                'exams': 0
            }
            $scope.userRequest.type = 'createNewClass';
            $scope.userRequest.class = userData.date_created;
            $http.post('./endpoints/classes.php', {
                'action': 'createNewClass',
                'params': [$stateParams.user, userData.date_created, userData]
            }).then(function () {
                $scope.classes.push(userData);
            }).catch(function (err) {
                console.error(err);
            })
        }

        function updateData(newData) {
            $http.post('./endpoints/classes.php', {
                'action': 'updateClasses',
                'params': [$stateParams.user, newData, $scope.userRequest]
            }).then(function (res) {
                //console.log(res);
            }).catch(function (err) {
                console.error(err);
            })
            console.log("User requested to " + $scope.userRequest.type + " " + $scope.userRequest.class);
            $scope.userRequest = {
                class: null,
                type: null
            };
        }

        $scope.deleteClass = function (value) {
            var classIndex = $filter('fishObject')($scope.classes, value, 'date_modified');
            var tempArr = $scope.classes;
            $scope.userRequest.class = $scope.classes[classIndex].date_created;
            $scope.userRequest.type = 'deleteClass';
            tempArr.splice(classIndex, 1);
            $scope.classes = tempArr;
        }

        $scope.deleteConformation = function (e) {
            if ($(e.target).hasClass('delete')) {
                $(e.target).parent().find('.sure').removeClass('sure');
                $(e.target).addClass('sure');
            } else {
                $(e.target).parents('.class-options').find('.input-group').addClass('sure');
                $(e.target).parents('.class-options').find('.delete').removeClass('sure');
            }
        }
        $scope.openClass = function (e, classID) {
            if (e.target.nodeName != 'BUTTON' && e.target.nodeName != 'I') {
                $state.go('classroom.exams', {
                    class: classID
                });
            }
        }

    }]);