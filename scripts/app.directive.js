angular.module('teachersAlly')
    .directive('gwA', function () {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                if (attrs.href === '' || attrs.href.indexOf('#') >= 0) {
                    elem.on('click', function (e) {
                        e.preventDefault();
                    });
                }
            }
        };
    })