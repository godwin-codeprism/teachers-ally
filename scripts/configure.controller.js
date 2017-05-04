angular.module('teachersAlly')
    .controller('configureController', ['$scope', '$http', '$stateParams', '$timeout', function ($scope, $http, $stateParams, $timeout) {
        var calculations = ["Student_Totals", "Subject_Grading", "Overall_Grading", "Ranks"];
        $scope.exam_index = undefined;
        $http.get('./database/' + $stateParams.user + "/" + $stateParams.class + ".json")
            .then(function (res) {
                for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].id == $stateParams.exam) {
                        $scope.exam_index = i;
                        $scope.settings = res.data[i].settings;
                    }
                }
                if ($scope.settings.calculations.length > 0) {
                    calculations = $scope.settings.calculations;
                    calculations.forEach(function(val,index,arr){
                        $scope[val] = true;
                    })
                }
            })
        // angular function to add columns and subjects
        $scope.addColumnsOrSubjects = function (e) {
            var _this = e.currentTarget,
                type = _this.dataset.type,
                cell = new String;
            $scope.settings[type].push(cell);
            $timeout(function () {
                $(_this).parent().find('.config-card-list li').eq($scope.settings[type].length - 1).find('p').focus();
            }, 1)
        }
        $scope.postChanges = function (elm) {
            var text = elm[0].innerText,
                type = elm[0].dataset.type;
            switch (type) {
                case "column":
                    if (text != "") {
                        $scope.settings.columns[parseInt(elm[0].dataset.index)] = text;
                    } else {
                        $scope.settings.columns.splice(parseInt(elm[0].dataset.index), 1);
                    }
                    updateSettings($scope.settings, 'updateColumns');
                    break;
                case "subject":
                    if (text != "") {
                        $scope.settings.subjects[parseInt(elm[0].dataset.index)] = text;
                    } else {
                        $scope.settings.subjects.splice(parseInt(elm[0].dataset.index), 1);
                    }
                    updateSettings($scope.settings, 'updateSubjects');
                    break;
            }
        }

        $scope.checkboxStateChange = function () {
            $scope.settings.calculations = [];
            calculations.forEach(function (val, index, arr) {
                if ($scope[val]) {
                    $scope.settings.calculations.push(val);
                }
            })
            updateSettings($scope.settings,"updateCalculations")
        }

        function updateSettings(settings, action) {
            $http.post('./endpoints/configure.php', {
                action: action,
                params: [$stateParams.user, $stateParams.class, $stateParams.exam, $scope.exam_index, settings]
            }).then(function (res) {
                console.log(res.data)
            }).catch(function (err) {
                console.log(err);
            })
        }
    }])