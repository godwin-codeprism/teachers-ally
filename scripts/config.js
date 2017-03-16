var runFunction = function ($transitions, authService, $state) {
    $transitions.onBefore({}, function (trans) {
        if (trans.$to().name == 'classroom') {
            if (localStorage.getItem('godwin_ta') != null) {
                authService.checkToken(trans.params().user, localStorage.getItem('godwin_ta')).then(function (res) {
                    if (res != 'good') {
                        console.log('Token mismatch');
                        $state.go('app');
                    }
                })
            } else {
                console.log('Token missing');
                $state.go('app');
            }
        }
    })
};
runFunction.$inject = ['$transitions', 'authService', '$state'];
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
    }]).run(runFunction);