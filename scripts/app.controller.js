angular
  .module("teachersAlly", [
    "ngSanitize",
    "ui.router",
    "ngAnimate",
    "ngScrollbars"
  ])
  .controller("appController", [
    "$scope",
    "$http",
    "$state",
    "$stateParams",
    "$rootScope",
    function($scope, $http, $state, $stateParams, $rootScope) {
      $scope.logout = function() {
        $http
          .post("./endpoints/logout.php", $stateParams.user)
          .then(function(res) {
            if (res.status == 200) {
              localStorage.removeItem("godwin_ta");
              $state.go("app");
            } else {
              console.log(res);
            }
          })
          .catch(function(err) {
            console.error(err);
          });
      };
      $scope.goToAccount = function() {
        console.log("Account Function not built yet");
      };
      $rootScope.backButton = function() {
        var currentState =
          $rootScope.trans._treeChanges.to[
            $rootScope.trans._treeChanges.to.length - 1
          ].state.name;
        console.log($stateParams.user);
        switch (currentState) {
          case "classroom.exams":
            $state.go("classroom.classes", $stateParams);
            break;
          case "classroom.configure":
            $state.go("classroom.exams", $stateParams);
            break;
          default:
            $state.go("app");
            break;
        }
      };
    }
  ]);
