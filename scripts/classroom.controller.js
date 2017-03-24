angular.module('teachersAlly')
    .controller('classroomController', ['$scope', '$http', '$stateParams', '$state', function ($scope, $http, $stateParams, $state) {
        $scope.mobileMenu = false;
        $scope.teacherName = undefined;
        $scope.shortName = undefined;
        $scope.logout = function () {
            $scope.toggleMobileMenu();
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
            $scope.toggleMobileMenu();
            console.log('Account Function not built yet');
        }
        $http.post('./endpoints/fetch-userdata.php', $stateParams.user)
            .then(function (res) {
                $scope.teacherName = res.data[0].firstname;
                $scope.shortName = res.data[0].firstname.charAt(0) + res.data[0].lastname.charAt(0);
                $state.go('classroom.classes');
            }).catch(function (err) {
                console.error(err);
            })

        $scope.toggleMobileMenu = function () {
            g_blurnav.customBlur('.wrapper:last', '.sidemenu-overlay .content');
            $scope.mobileMenu = ($scope.mobileMenu) ? $scope.mobileMenu = false : $scope.mobileMenu = true;
            if ($scope.mobileMenu) {
                $('body').addClass('disable-scroll');
            } else {
                $('body').removeClass('disable-scroll');
            }
        }
    }]);