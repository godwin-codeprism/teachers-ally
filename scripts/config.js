angular.module('teachersAlly', ["ngSanitize", "ui.router"])
    .config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('app', {
            url: "",
            templateUrl: './views/login.html',
            controller: "appController"
        });
    }])