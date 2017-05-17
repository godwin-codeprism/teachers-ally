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
                    setPostions($(elm).find('[reorder-item]'));
                }, 1);
                var currentTop = null,
                    originalTop = null,
                    originalBottom = null,
                    orginalIndex = null,
                    originalArr = null,
                    mainArr = $scope.reorderList;
                var setPostions = function (arr) {
                    var parentHeight = $(elm).height();
                    arr.each(function (index, val) {
                        $(val).css({
                            'left': 0,
                            'top': index == 0 ? 0 + 'px' : ($(arr[index - 1]).position().top + $(arr[index - 1]).height()) + 'px'
                        });
                    })
                    $(elm).css({
                        height: parentHeight + 'px'
                    })
                    $(elm).find('[reorder-item]').css('position', 'absolute');
                }
                var onGrabStart = function (e) {
                    originalArr = $(elm).find('[reorder-item]');
                    $(this).addClass('reorder-item-grabbing');
                    $(this).removeClass('transition');
                    $(this).css({
                        top: e.pageY - ($(elm).parent().offset().top + ($(this).height() / 2)) + "px"
                    })
                    currentTop = $(this).position().top;
                    originalTop = currentTop;
                    originalBottom = currentTop + $(this).height();
                    orginalIndex = parseInt($(this)[0].dataset.index);
                    $(document).on('mousemove', onGrabbing);
                }

                var onGrabbing = function (e) {
                    var _this = $('.reorder-item-grabbing:eq(0)');
                    var _top = e.pageY - ($(elm).parent().offset().top + (_this.height() / 2));
                    _this.css({
                        'top': _top + "px"
                    })
                    _this.attr('new-index') != undefined ? orginalIndex = parseInt(_this.attr('new-index')) : false;
                    detectHit(_this, detectDirection(_this), originalTop, originalBottom, orginalIndex, originalArr);
                    currentTop = _top;

                }
                var onGrabEnd = function (e) {
                    $(this).removeClass('reorder-item-grabbing');
                    $(this).addClass('transition');
                    $(document).off('mousemove', onGrabbing);
                    currentTop = null;
                    originalTop = null;
                    originalBottom = null;
                }

                var detectDirection = function (el) {
                    return el.position().top <= currentTop ? 'up' : 'down';
                }
                var detectHit = function (el, direction, top, bottom, index, arr) {
                    var newIndex = Math.round((currentTop / el.height()));
                    if (index != newIndex) {
                        console.log(direction + ": " + newIndex);
                        if (direction == 'up') {
                            $(arr[newIndex]).css({
                                top: $(arr[newIndex]).position().top + $(arr[newIndex]).height() + 'px'
                            });
                        } else {
                            $(arr[newIndex]).css({
                                top: $(arr[newIndex]).position().top - $(arr[newIndex]).height() + 'px'
                            });
                        }
                        mainArr.move(index, newIndex);
                        $scope.reorderList = mainArr;
                        $scope.$apply();
                        originalArr = $(elm).find('[reorder-item]');
                        el.attr('new-index', newIndex);
                    }
                }

            }
        }
    }])