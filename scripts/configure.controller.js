angular.module('teachersAlly')
    .controller('configureController', ['$scope', '$http', '$stateParams', '$timeout', function ($scope, $http, $stateParams, $timeout) {

        //******************Initial Settings*******************/
        var calculations = ["Student_Totals", "Overall_Grading", "Ranks"];
        $scope.exam_index = undefined;
        $scope.invokedPopup = false;
        $scope.popupView = "";
        $scope.settings = {
            columns: [],
            subjects: [],
            calculations: [],
            sub_gr: {
                gradables: [],
                structure: []
            },
            overall_gr: {
                structure: []
            },
            reorderList: []
        }
        /*****************************************************/

        /****************** On Load functions *****************/
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
                if ($scope.settings.sub_gr.gradables.length > 0) {
                    $scope.Subject_Grading = true;
                }
                if ($scope.settings.reorderList.length > 0) {
                    $scope.buildList();
                } else {
                    buildReorderList();
                }
            })
        /*****************************************************/

        //*************** Configure functions ******************/
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

        // checks for change of state for calculation checkboxes
        $scope.checkboxStateChange = function (item) {
            switch (item) {
                case "Subject_Grading":
                    if ($scope.Subject_Grading) {
                        $scope.invokedPopup = true;
                        $scope.popupView = 'views/subject_grading.html';
                    }
                    break;
                case "Overall_Grading":
                    if ($scope.Overall_Grading) {
                        $scope.invokedPopup = true;
                        $scope.popupView = 'views/overall_grading.html';
                    }
                    break;

                default:
                    break;
            }
            if ($scope[item]) {
                if (item == "Subject_Grading") {
                    $scope.settings.subjects.forEach(function (element) {
                        if ($scope.settings.subjects.indexOf(element + " Grades") < 0) {
                            $scope.settings.sub_gr.gradables.push(element + " Grades");
                        }
                    }, this);
                } else {
                    $scope.settings.calculations.push(item);
                }
                $scope.updateSettings($scope.settings, "updateCalculations", "", item);
            } else {
                if (item == "Subject_Grading") {
                    $scope.settings.sub_gr.gradables = [];
                    removeSubjectGrades();
                } else {
                    $scope.settings.calculations.splice($scope.settings.calculations.indexOf(item));
                }
                $scope.updateSettings($scope.settings, "updateCalculations", item, "");
            }
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
                    //updates columns in ReorderList
                    $scope.updateReorderList(oldVal, newVal, 'updateColumns');
                    break;
                case "subject":
                    if (text != "") {
                        $scope.settings.subjects[parseInt(elm[0].dataset.index)] = text;
                    } else {
                        $scope.settings.subjects.splice(parseInt(elm[0].dataset.index), 1);
                    }
                    if ($scope.Subject_Grading) {
                        //update Subjects in reorderlist and then update it's grading
                        updateReorderList(oldVal, newVal, 'updateSubjectsAndGrades');
                    } else {
                        //Just update subjects in reorderlist
                        updateReorderList(oldVal, newVal, 'updateSubjects');
                    }
                    break;
            }
        }

        function updateSubject_Grading(oldVal, newVal) {
            if (oldVal == "" && newVal != "") { //means subject added thus add its grade
                $scope.settings.sub_gr.gradables.push(newVal + " Grades");
                updateReorderList_SubjectGrades("add", oldVal, newVal);
            } else if (oldVal != "" && newVal == "") { //means subject deleted thus delete its grade
                $scope.settings.sub_gr.gradables.splice($scope.settings.sub_gr.gradables.indexOf(oldVal + " Grades"), 1);
                updateReorderList_SubjectGrades("delete", oldVal, newVal);
            } else if (oldVal != "" && newVal != "") { //means subject edited thus edit it's grade
                $scope.settings.sub_gr.gradables[$scope.settings.sub_gr.gradables.indexOf(oldVal + " Grades")] = newVal + " Grades";
                updateReorderList_SubjectGrades("edit", oldVal, newVal);
            }
        }

        function updateReorderList_SubjectGrades(action, oldVal, newVal) {
            switch (action) {
                case "add":
                    $scope.settings.reorderList.splice($scope.settings.reorderList.indexOf(newVal) + 1, 0, newVal + " Grades");
                    break;
                case "delete":
                    $scope.settings.reorderList.splice($scope.settings.reorderList.indexOf(oldVal + " Grades"), 1);
                    break;
                case "edit":
                    $scope.settings.reorderList[$scope.settings.reorderList.indexOf(oldVal + " Grades")] = newVal + " Grades";
                    break;
            }
            $timeout(function () {
                $scope.buildList();
                $scope.updateScrollbar('update');
            }, 1);
        }
        // angular function to post all the changes to database through PHP - Final post function
        $scope.updateSettings = function (settings, action, oldVal, newVal) {
            if (newVal == "Subject_Grading") {
                injectSubjectGrades();
            }
            $http.post('./endpoints/configure.php', {
                action: action,
                params: [$stateParams.user, $stateParams.class, $stateParams.exam, $scope.exam_index, settings]
            }).then(function (res) {
                console.log(res.data);
            }).catch(function (err) {
                console.log(err);
            })
        }
        // reorder list updater 
        function buildReorderList() {
            // for reorder list
            $scope.settings.reorderList = [];
            $scope.settings.reorderList = $scope.settings.reorderList.concat($scope.settings.columns);
            $scope.settings.reorderList = $scope.settings.reorderList.concat($scope.settings.subjects);
            $scope.settings.reorderList = $scope.settings.reorderList.concat($scope.settings.calculations);
            $scope.Subject_Grading ? injectSubjectGrades() : false;
            $scope.buildList();
            $scope.updateScrollbar('update');
        }

        // adds, deletes and edits subject grades
        function injectSubjectGrades() {
            $scope.settings.subjects.forEach(function (value, index, arr) {
                var subjectIndex = $scope.settings.reorderList.indexOf(value),
                    sub_gr_index = $scope.settings.reorderList.indexOf(value + " Grades");
                if (subjectIndex >= 0 && sub_gr_index < 0) {
                    $scope.settings.reorderList.splice((subjectIndex + 1), 0, value + " Grades");
                }
            });
            $scope.buildList();
            $scope.updateScrollbar('update');
        }

        function removeSubjectGrades() {
            $scope.settings.subjects.forEach(function (value, index, arr) {
                var subjectIndex = $scope.settings.reorderList.indexOf(value),
                    sub_gr_index = $scope.settings.reorderList.indexOf(value + " Grades");
                if (subjectIndex >= 0 && sub_gr_index >= 0) {
                    $scope.settings.reorderList.splice(sub_gr_index, 1);
                }
            });
            $scope.buildList();
            $scope.updateScrollbar('update');
        }

        function updateReorderList(oldVal, newVal, action) {
            function update(oldVal, newVal) {
                if (oldVal != "" && newVal != "") {
                    $scope.forceReset(oldVal, newVal, 'edited');
                } else if (oldVal == "" && newVal != "") {
                    $scope.forceReset(oldVal, newVal, 'added');
                    $timeout(function () {
                        $('.table-preview-container').mCustomScrollbar("scrollTo", "last", {
                            scrollEasing: "easeOut"
                        }, 10);
                    }, 66);
                } else if (oldVal != "" && newVal == "") {
                    $scope.forceReset(oldVal, newVal, 'deleted');
                    $timeout(function () {
                        $('.table-preview-container:eq(2) table').parent().css("width", $('.table-preview-container:eq(2) table').width() + "px");
                    }, 1);
                } else {
                    $scope.buildReorderList();
                }
                $timeout(function () {
                    $scope.updateScrollbar('update');
                    $('.table-preview-container').mCustomScrollbar("update");
                }, 65);
            }
            switch (action) {
                case "updateColumns":
                    update(oldVal, newVal);
                    $scope.updateSettings($scope.settings, action);
                    break;
                case "updateSubjects":
                    update(oldVal, newVal);
                    $scope.updateSettings($scope.settings, action);
                    break;
                case "updateSubjectsAndGrades":
                    update(oldVal, newVal);
                    updateSubject_Grading(oldVal, newVal);
                    $scope.updateSettings($scope.settings, "updateSubjects");
                    break;
                case "updateCalculations":
                    update(oldVal, newVal);
                    $scope.updateSettings($scope.settings, action);
                    break;

            }
        }

        $scope.revokePopup = function () {
            $scope.invokedPopup = false;
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