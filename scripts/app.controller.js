angular.module('teachersAlly', ["ngSanitize", "ui.router", "ngAnimate"])
    .controller('appController', ['$scope', '$http', '$state', '$stateParams', function ($scope, $http, $state, $stateParams) {
        $scope.logout = function () {
            $http.post('./endpoints/logout.php', $stateParams.user).then(function (res) {
                if (res.status == 200) {
                    localStorage.removeItem('godwin_ta');
                    $state.go('app');
                } else {
                    console.log(res);
                }
            }).catch(function (err) {
                console.error(err);
            })
        }
        $scope.goToAccount = function () {
            console.log('Account Function not built yet');
        }

    }]);