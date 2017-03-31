angular.module('teachersAlly')
    .directive('gwOrientation', [function () {
        return {
            restrict: 'A',
            scope: true,
            link: function ($scope, elm, attrs) {
                classesGrid();
                $(window).on('orientationchange', function () {
                    classesGrid();
                });

                function classesGrid() {
                    if (window.orientation == 90) { //landscape
                        $(elm).removeClass('col-xs-12');
                        $(elm).addClass('col-xs-6');
                    } else { //potrait
                        $(elm).removeClass('col-xs-6');
                        $(elm).addClass('col-xs-12');
                    }
                }
            }
        }
    }])