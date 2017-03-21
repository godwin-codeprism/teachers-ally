angular.module('teachersAlly')
    .controller('loginController', ['$scope', '$http', '$state', function ($scope, $http, $state) {
        $scope.goodLogin = null;
        var loginData = {};
        $scope.login = function () {
            loginData = {
                "username": $scope.username,
                "password": $scope.password
            }
            $http.post('./endpoints/login.php', loginData)
                .then(function (response) {
                    if (response.data != 'ERROR') {
                        localStorage.setItem('godwin_ta', response.data);
                        $state.go('classroom', {
                            user: $scope.username
                        });
                    } else {
                        $scope.goodLogin = response.data;
                    }
                })
                .catch(function (err) {
                    console.error(err);
                });
        }
    }]);