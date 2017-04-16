angular.module('teachersAlly')
    .controller('configureController', ['$scope', '$http', '$stateParams', '$timeout', function ($scope, $http, $stateParams, $timeout) {
        $scope.exam_index = undefined;
        $http.get('./database/' + $stateParams.user + "/" + $stateParams.class + ".json")
            .then(function (res) {
                for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].id == $stateParams.exam) {
                        $scope.exam_index = i;
                        $scope.settings = res.data[i].settings;
                    }
                }
            })
        $scope.addColumns = function (e) {
            var _this = e.currentTarget,
                cell = new String;
            $scope.settings.columns.push(cell);
            $timeout(function () {
                $(_this).parent().find('.config-card-list li').eq($scope.settings.columns.length - 1).find('p').focus();
            }, 1)
        }
        $scope.postChanges = function (elm) {
            var text = elm[0].innerText;
            if (elm[0].dataset.type == "column") {
                console.log($scope.settings);
                $scope.settings.columns[parseInt(elm[0].dataset.index)] = text;
                updateColumns($scope.settings);
            }
        }

        function updateColumns(settings) {
            $http.post('./endpoints/configure.php', {
                action: 'updateColumns',
                params: [$stateParams.user, $stateParams.class, $stateParams.exam, $scope.exam_index, settings]
            }).then(function (res) {
                console.log(res.data)
            }).catch(function (err) {
                console.log(err);
            })
        }
    }])