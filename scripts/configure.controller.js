angular.module('teachersAlly')
    .controller('configureController', ['$scope', '$http', '$stateParams', '$timeout', function ($scope, $http, $stateParams, $timeout) {
        var calculations = ["Student_Totals", "Subject_Grading", "Overall_Grading", "Ranks"];
        $scope.exam_index = undefined;
        $scope.reorderList = [];

        // Collects the data for settings when this controller and template are loaded
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
                    calculations.forEach(function (val, index, arr) {
                        $scope[val] = true;
                    })
                }
                buildReorderList();
            })
        // angular function to add columns and subjects - runs when clicked plus sign
        $scope.addColumnsOrSubjects = function (e) {
            var _this = e.currentTarget,
                type = _this.dataset.type,
                cell = new String;
            $scope.settings[type].push(cell);
            $timeout(function () {
                $(_this).parent().find('.config-card-list li').eq($scope.settings[type].length - 1).find('p').focus();
            }, 1)
        }
        // angular function to collect changes from the directive watch changes
        $scope.postChanges = function (elm, oldVal, newVal) {
            var text = elm[0].innerText,
                type = elm[0].dataset.type;
            switch (type) {
                case "column":
                    if (text != "") {
                        $scope.settings.columns[parseInt(elm[0].dataset.index)] = text;
                    } else {
                        $scope.settings.columns.splice(parseInt(elm[0].dataset.index), 1);
                    }
                    updateSettings($scope.settings, 'updateColumns', oldVal, newVal);
                    break;
                case "subject":
                    if (text != "") {
                        $scope.settings.subjects[parseInt(elm[0].dataset.index)] = text;
                    } else {
                        $scope.settings.subjects.splice(parseInt(elm[0].dataset.index), 1);
                    }
                    updateSettings($scope.settings, 'updateSubjects', oldVal, newVal);
                    break;
            }
        }
        // checks for change of state for calculation checkboxes
        $scope.checkboxStateChange = function (item) {
            console.log(item);
            if ($scope[item]) {
                $scope.settings.calculations.push(item);
                updateSettings($scope.settings, "updateCalculations", "", item);
            } else {
                $scope.settings.calculations.splice($scope.settings.calculations.indexOf(item));
                updateSettings($scope.settings, "updateCalculations", item, "");
            }
        }
        // angular function to post all the changes to database through PHP
        function updateSettings(settings, action, oldVal, newVal) {
            $http.post('./endpoints/configure.php', {
                action: action,
                params: [$stateParams.user, $stateParams.class, $stateParams.exam, $scope.exam_index, settings]
            }).then(function (res) {
                console.log(res.data);
                updateReorderList(oldVal, newVal);
            }).catch(function (err) {
                console.log(err);
            })
        }

        // reorder list updater 
        function buildReorderList() {
            // for reorder list
            $scope.reorderList = [];
            $scope.reorderList = $scope.reorderList.concat($scope.settings.columns);
            $scope.reorderList = $scope.reorderList.concat($scope.settings.subjects);
            $scope.reorderList = $scope.reorderList.concat($scope.settings.calculations);
            $scope.buildList();
            $scope.updateScrollbar('update');
        }

        function updateReorderList(oldVal, newVal) {
            if (oldVal != "" && newVal != "") {
                $scope.forceReset(oldVal, newVal, 'edited');
            } else if (oldVal == "" && newVal != "") {
                $scope.forceReset(oldVal, newVal, 'added');
                $('.table-preview-container').mCustomScrollbar("scrollTo", "last", {
                    scrollEasing: "easeOut"
                },10);
            } else if (oldVal != "" && newVal == "") {
                $scope.forceReset(oldVal, newVal, 'deleted');
                $timeout(function(){
                    $('.table-preview-container:eq(2) table').parent().css("width", $('.table-preview-container:eq(2) table').width() + "px");
                },1);
            } else {
                $scope.buildReorderList();
            }
            $timeout(function () {
                $scope.updateScrollbar('update');
                $('.table-preview-container').mCustomScrollbar("update");
            }, 1);
        }
        $scope.tableScroll = {
            scrollButtons: {
                scrollAmount: "auto",
                enable: true
            },
            scrollInertia: 400,
            axis: "xy",
            theme: "inset-dark",
            autoHideScrollbar: false
        }
    }])