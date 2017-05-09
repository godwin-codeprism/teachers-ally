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
                var currentHit = null,
                    clone = null;
                var onGrabStart = function (e) {
                    clone = $(this).clone();
                    clone.addClass('reorder-item-grabbing');
                    clone.on('mouseup', onGrabEnd);
                    $(elm).append(clone);
                    clone.css({
                        'top': e.pageY - ($(elm).parent().offset().top + ($(this).height() / 2)) + "px"
                    })
                     currentHit = clone.data().index;
                    $(document).on('mousemove', onGrabbing);
                }

                var onGrabbing = function (e) {
                    var _this = $('.reorder-item-grabbing:eq(0)');
                    var _top = e.pageY - ($(elm).parent().offset().top + (_this.height() / 2));
                    clone.css({
                        'top': _top + "px"
                    })
                    if (currentHit != detectHit(clone[0])) {
                        isNaN(currentHit) ? currentHit = 0 : false;
                        console.log(currentHit + " " + detectHit(clone[0]));
                        //$scope.reorderList.move(currentHit, detectHit(clone[0]));
                        $scope.reorderList.splice
                        $scope.$apply();
                        currentHit = detectHit(clone[0]);
                    }
                }
                var onGrabEnd = function (e) {
                    $(this).remove();
                    clone = null;
                    currentHit = null;
                    $(document).off('mousemove', onGrabbing);
                }

                var detectHit = function (_elm) {
                    var data = {};
                    var hitArea = null;
                    var _thisCoords = {
                        top: $(_elm).position().top,
                        bottom: $(_elm).position().top + $(_elm).height()
                    }
                    $(elm).find('.reorder-item').each(function (index, val) {
                        if (val != _elm) {
                            data[$(val).data().index] = {
                                top: $(val).position().top,
                                bottom: $(val).position().top + $(val).height()
                            }
                        }
                    })
                    Object.keys(data).forEach(function (val, index, arr) {
                        if (data[val].top < _thisCoords.top && data[val].bottom < _thisCoords.bottom) {
                            hitArea = val;
                        }
                    })
                    return isNaN(parseInt(hitArea)) || null ? 0 : parseInt(hitArea);
                }

            }
        }
    }])