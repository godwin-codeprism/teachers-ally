angular.module('teachersAlly')
    .controller('appController', ['$scope', function ($scope) {
        var dup = $('.wrapper:eq(0)').clone();
        $('.content:eq(0)').append(dup);
        $(document).on('scroll', function () {
            var translation = 'translate3d(0,' + (-$(document).scrollTop() + 'px') + ',0)';
            dup.css({
                '-webkit-transform': translation,
                '-moz-transform': translation,
                '-ms-transform': translation,
                'transform': translation
            });
        });
        
    }])