angular.module('teachersAlly')
    .controller('classesController', ['$scope', '$http', '$stateParams', function ($scope, $http, $stateParams) {
        g_blurnav.blurInit();
        $scope.untitles = null;
        $scope.classes = [];
        $http.get('./database/' + $stateParams.user + '/' + $stateParams.user + '_data.json')
            .then(function (res) {
                $scope.classes = res.data;
            }).catch(function (err) {
                console.log(err);
            })
        $scope.createNewClass = function () {
            $http.post('./endpoints/classes.php', {
                'action': 'getUntitled',
                'params': [$stateParams.user]
            }).then(function (res) {
                if (typeof res.data == 'object') {
                    var arr = [];
                    for (i = 0; i < res.data.length; i++) {
                        if (res.data[i].indexOf('untitled') >= 0) {
                            arr.push(res.data[i]);
                        }
                    }
                    $scope.untitles = (arr.length == 0) ? 'untitled' : 'untitled ' + arr.length;
                    var userData = {
                        'class': $scope.untitles,
                        'date_created': Date.now(),
                        'data_modified': Date.now()
                    }
                    $scope.classes.push(userData);
                    $http.post('./endpoints/classes.php', {
                        'action': 'createNewClass',
                        'params': [$stateParams.user, $scope.untitles, $scope.classes]
                    }).catch(function (err) {
                        console.error(err);
                    })
                } else {
                    console.error('Did not find the user folder in database');
                }
            }).catch(function (err) {
                console.error(err);
            });
        }
    }]);