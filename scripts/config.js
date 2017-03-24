var runFunction = function ($rootScope, $transitions, authService, $state) {
    $transitions.onBefore({}, function (trans) {
        if (trans.$to().name == 'classroom') {
            if (localStorage.getItem('godwin_ta') != null) {
                authService.checkToken(trans.params().user, localStorage.getItem('godwin_ta')).then(function (res) {
                    if (res != 'good') {
                        console.log('Token mismatch');
                        localStorage.removeItem('godwin_ta');
                        $state.go('app');
                    }
                })
            } else {
                console.log('Token missing');
                $state.go('app');
            }
        };
        if (trans.$to().name == 'app') {
            if (localStorage.getItem('godwin_ta') != null) {
                authService.checkToken(localStorage.getItem('godwin_ta').split('|')[0], localStorage.getItem('godwin_ta')).then(function (res) {
                    if (res == 'good') {
                        console.log('Token matched');
                        $state.go('classroom', {
                            user: localStorage.getItem('godwin_ta').split('|')[0]
                        });
                    } else {
                        console.log('Token mismatch');
                    }
                })
            }
        }
    });
    $transitions.onSuccess({}, function (trans) {
        if (trans.$to().name == 'app') {
            g_blurnav.blurInit('home');
        } else {
            g_blurnav.blurInit();
        }
    });
};
runFunction.$inject = ['$rootScope', '$transitions', 'authService', '$state'];
angular.module('teachersAlly')
    .config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('app', {
            url: "",
            templateUrl: './views/login.html',
            controller: "appController"
        });
        $stateProvider.state('classroom', {
            url: "/:user",
            templateUrl: './views/classroom.html',
            controller: "classroomController"
        });
        $stateProvider.state('classroom.classes', {
            url: "",
            templateUrl: './views/classes.html',
            controller: "classesController"
        });
    }]).run(runFunction);