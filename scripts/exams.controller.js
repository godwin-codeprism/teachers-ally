angular.module('teachersAlly')
    .controller('examsController', ['$scope', '$http', '$stateParams', function ($scope, $http, $stateParams) {
        var classIndex, userData;
        $scope.exams = [];
        $http.get('./database/' + $stateParams.user + '/' + $stateParams.user + '_data.json')
            .then(function (res) {
                userData = res.data;
                var arr = res.data;
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].date_created == $stateParams.class) {
                        classIndex = i;
                        $scope.classInfo = arr[i];
                        break;
                    }
                }
                if ($scope.classInfo == undefined || $scope.classInfo == null) {
                    console.log("Class Info not found");
                }
            }).catch(function (err) {
                console.log(err);
            })

        $http.get('./database/' + $stateParams.user + '/' + $stateParams.class + '.json').then(function (res) {
            if (res.data == undefined || res.data == "") {
                $scope.exams = [];
            } else {
                $scope.exams = res.data;
            }
        }).catch(function (err) {
            console.log(err);
        })

        $scope.postChanges = function (elm) {
            if (elm[0].nodeName == 'H1') {
                updateClassName(elm[0].innerText);
            }
            if (elm[0].nodeName == 'H4') {
                addNewExam(elm[0].innerText);
                elm[0].innerText = "";
            }
            if (elm[0].dataset.type == 'examName') {
                updateExamName(elm[0].dataset.id, elm[0].innerText);
            }
        }

        function updateClassName(value) {
            $scope.classInfo.class = value;
            userData[classIndex] = $scope.classInfo;
            $http.post('./endpoints/classes.php', {
                action: 'updateClasses',
                params: [$stateParams.user, userData, {
                    class: $scope.classInfo.class,
                    type: 'updateClassName'
                }]
            }).then(function (res) {
                console.log(res.data);
            }).catch(function (err) {
                console.log(err);
            })
        }

        function addNewExam(name) {
            var exam = {
                "id": Date.now(),
                "name": name,
                marks_data: [],
                marks: []
            }
            $scope.$apply(function () {
                $scope.exams.push(exam);
            });
            $http.post('./endpoints/exams.php', {
                action: 'addNewExam',
                params: [$stateParams.user, $stateParams.class, $scope.exams]
            }).then(function (res) {
                console.log(res.data);
                updateUserData(Date.now(), $scope.exams.length);
            }).catch(function (err) {
                console.log(err);
            })
        }
        $scope.deleteExamConformation = function (e) {
            if ($(e.target).hasClass('delete')) {
                $(e.target).parent().find('.sure').removeClass('sure');
                $(e.target).addClass('sure');
            } else {
                $(e.target).parents('.exam-options').find('.input-group').addClass('sure');
                $(e.target).parents('.exam-options').find('.delete').removeClass('sure');
            }
        }

        $scope.deleteExam = function (examID) {
            var deletedExam = null;
            $scope.exams.forEach(function (value, index, arr) {
                if (examID == $scope.exams[index].id) {
                    deletedExam = $scope.exams[index];
                    $scope.exams.splice(index, 1);
                }
            });
            $http.post('./endpoints/exams.php', {
                action: 'deleteExam',
                params: [$stateParams.user, $stateParams.class, $scope.exams, deletedExam.name]
            }).then(function (res) {
                console.log(res.data);
                updateUserData(Date.now(), $scope.exams.length);
            }).catch(function (err) {
                console.log(err);
            })
        }

        $scope.duplicateExams = function (examID) {
            var examClone = {};
            $scope.exams.forEach(function (value, index, arr) {
                if (value.id == examID) {
                    Object.keys(value).forEach(function (v, i, a) {
                        if (v.indexOf('$') < 0) {
                            examClone[v] = value[v];
                        }
                    });
                    examClone.id = Date.now();
                    $scope.exams.push(examClone);
                }
            });
            $http.post('./endpoints/exams.php', {
                action: 'duplicateExam',
                params: [$stateParams.user, $stateParams.class, $scope.exams, examClone.name]
            }).then(function (res) {
                console.log(res.data);
                updateUserData(Date.now(), $scope.exams.length);
            }).catch(function (err) {
                console.log(err);
            })
        }

        function updateUserData(lastUpdate, examsNum) {
            userData[classIndex].exams = examsNum;
            userData[classIndex].date_modified = lastUpdate;
            $http.post('./endpoints/classes.php', {
                action: 'updateClasses',
                params: [$stateParams.user, userData, {
                    class: $stateParams.class,
                    type: 'lastUpdated_ExamsNum'
                }]
            }).then(function (res) {
                console.log(res.data);
            }).catch(function (err) {
                console.log(err);
            })
        }

        function updateExamName(examID, newName) {
            var oldname = null;
            $scope.exams.forEach(function (value, index, arr) {
                if (value.id == examID) {
                    oldname = value.name;
                    $scope.exams[index].name = newName;
                }
            });
            $http.post('./endpoints/exams.php', {
                action: 'updateExamName',
                params: [$stateParams.user, $stateParams.class, $scope.exams, {
                    oldName: oldname,
                    newName: newName
                }]
            }).then(function (res) {
                console.log(res.data);
            }).catch(function (err) {
                console.log(err);
            })
        }
    }]);