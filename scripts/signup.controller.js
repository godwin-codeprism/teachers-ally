angular.module('teachersAlly')
    .controller('signupController', ['$scope', '$http', '$state', function ($scope, $http, $state) {
        var signupData = null;
        $scope.isUnique = undefined;
        $scope.validUsername = undefined;
        $scope.validEmail = undefined;
        $scope.validPassword = undefined;
        $scope.emailBlured = false;
        $scope.signup = function () {
            signupData = {
                'firstname': $scope.firstName,
                'lastname': $scope.lastName,
                'username': $scope.username,
                'email': $scope.email,
                'school': $scope.school,
                'password': $scope.password
            };
            $http.post('./endpoints/signup.php', signupData).then(function (response) {
                localStorage.setItem('godwin_ta', response.data.trim());
                $http.post('./endpoints/check-userfiles.php', {
                    username: $scope.username
                }).then(function (res) {
                    $state.go('classroom', {
                        user: $scope.username
                    });
                })
            }).catch(function (err) {
                console.error(err);
            });
        }
        $scope.validateUsername = function () {
            $http.post('./endpoints/username-avalibility.php', $scope.username).then(function (response) {
                $scope.isUnique = response.data.trim();
            }).catch(function (err) {
                console.error(err);
            });
            if (!/^[a-zA-Z0-9-]*$/.test($scope.username)) {
                $scope.validUsername = false;
            } else {
                $scope.validUsername = true;
            }
        }
        $scope.validateEmail = function () {
            if ($scope.email != undefined) {
                if ($scope.email.indexOf('@') < 0 || $scope.email.indexOf('.') < 0) {
                    $scope.validEmail = false;
                } else {
                    $scope.validEmail = true;
                }
            } else {
                $scope.validEmail = false;
            }
            $scope.emailBlured = true;
        }
        $scope.validatePassword = function () {
            var srt = $scope.password;
            if (srt != undefined) {
                if (srt.match(/^[a-zA-z]+$/) != null && srt.match(/^[0-9]+$/) == null && srt.length >= 7) {
                    $scope.validPassword = 1; // if doesnt have numbers but length more than 7
                } else if (srt.match(/^[a-zA-z]+$/) != null && srt.match(/^[0-9]+$/) == null && srt.length < 7) {
                    $scope.validPassword = 1; // if doesnt have numbers and length less than 7
                } else if (srt.match(/^[a-zA-z]+$/) == null && srt.match(/^[0-9]+$/) != null && srt.length >= 7) {
                    $scope.validPassword = 2; // if doesnt have letter but length more than 7
                } else if (srt.match(/^[a-zA-z]+$/) == null && srt.match(/^[0-9]+$/) != null && srt.length < 7) {
                    $scope.validPassword = 2; // if doesnt have letter and length less than 7
                } else if (srt.match(/^[a-zA-z]+$/) != null && srt.match(/^[0-9]+$/) != null && srt.length < 7) {
                    $scope.validPassword = 3; // if not long enough
                } else if (srt.match(/^[a-zA-z]+$/) == null && srt.match(/^[0-9]+$/) == null && srt.length < 7) {
                    $scope.validPassword = 4; // if all above three fail
                } else {
                    $scope.validPassword = 5; // if all satisfied
                }
            } else {
                $scope.validPassword = 4;
            }
        }
    }]);