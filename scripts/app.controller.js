angular.module('teachersAlly', ["ngSanitize", "ui.router"])
    .controller('appController', ['$scope', '$http', '$state', '$stateParams', function ($scope, $http, $state, $stateParams) {
        var dup = $('.wrapper:eq(0)').clone();
        $('.content:eq(0)').append(dup);
        $(document).on('scroll', function () {
            var translation = 'translate3d(0,' + (-$(document).scrollTop() + 'px') + ',0)';
            dup.css({
                '-webkit-transform': translation,
                '-moz-transform': translation,
                '-ms-transform': translation,
                'transform': translation
            });
        });

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