angular.module('teachersAlly')
    .directive('reorderList', ['$parse', '$timeout', function ($parse, $timeout) {
        return {
            restrict: 'A',
            scope: true,
            link: function ($scope, elm, attrs) {
                $timeout(function () {
                    $(elm).find('[reorder-item]').attr('draggable', 'false');
                    $(elm).find('[reorder-item]').on('mousedown', onGrabStart);
                    $(elm).find('[reorder-item]').on('mouseup', onGrabEnd);
                }, 1);

                var onGrabStart = function (e) {
                    console.log("onGrabStart");
                    $(this).addClass('reorder-item-grabbing');
                    $(this).css({
                        'top': e.pageY - ($(elm).parent().offset().top + ($(this).height() / 2)) + "px"
                    })
                    $(document).on('mousemove', onGrabbing);
                }

                var onGrabbing = function (e) {
                    console.log("onGrabbing");
                    var _this = $('.reorder-item-grabbing:eq(0)');
                    var _top = e.pageY - ($(elm).parent().offset().top + (_this.height() / 2)); 
                    _this.css({
                        'top': _top + "px"
                    })
                }
                var onGrabEnd = function (e) {
                    console.log("onGrabEnd");
                    $(document).off('mousemove', onGrabbing);
                    $(this).removeClass('reorder-item-grabbing');
                }

            }
        }
    }])