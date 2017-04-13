angular.module('teachersAlly', ["ngSanitize", "ui.router", "ngAnimate", "ngScrollbars"])
    .controller('appController', ['$scope', '$http', '$state', '$stateParams', '$rootScope', 'ScrollBarsProvider', function ($scope, $http, $state, $stateParams, $rootScope, ScrollBarsProvider) {
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
        $rootScope.backButton = function () {
            var currentState = $rootScope.trans._treeChanges.to[$rootScope.trans._treeChanges.to.length - 1].state.name;
            switch (currentState) {
                case "classroom.exams":
                    $state.go("classroom.classes");
                    break;
                case "classroom.configure":
                    $state.go("classroom.exams", $stateParams);
                    break;
                default:
                    $state.go("app");
                    break;
            }
        }
        ScrollBarsProvider.defaults = {
            scrollButtons: {
                scrollAmount: "auto",
                enable: !0
            },
            scrollInertia: 400,
            axis: "y",
            theme: "dark-thin",
            autoHideScrollbar: !1
        }

    }]);