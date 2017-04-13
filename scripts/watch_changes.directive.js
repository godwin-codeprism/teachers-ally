angular.module('teachersAlly')
    .directive('watchChanges', [function () {
        return {
            restriced: 'A',
            scope: true,
            link: function ($scope, elm, attrs) {
                var startWatch = function (e) {
                    ($(elm).attr('made-changes') != true) ? $(elm).attr('made-changes', true): false;
                }
                $(elm).on('focus', function () {
                    $(elm).on("DOMSubtreeModified", startWatch);
                    //$(elm).on("copy",onCopy);
                    $(elm).on('keypress', function (e) {
                        if (e.keyCode == 13) {
                            e.preventDefault();
                            $(elm).blur();
                        }
                    });
                });
                $(elm).on('blur', function () {
                    $(elm).off("DOMSubtreeModified", startWatch);
                    //$(elm).off("copy",onCopy);
                    if ($(elm).attr('made-changes') == 'true') {
                        $scope.postChanges(elm);
                    }
                    $(elm).attr('made-changes', false);
                });

                function onCopy (e){
                    console.log(e.originalEvent.clipboardData.getData('Text'));
                }
            }
        }
    }])