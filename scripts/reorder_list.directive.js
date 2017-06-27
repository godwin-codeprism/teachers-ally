angular.module('teachersAlly')
    .directive('reorderList', ['$parse', '$timeout', function ($parse, $timeout) {
        return {
            restrict: 'A',
            scope: true,
            link: function ($scope, elm, attrs) {
                $timeout(function () {
                    $(elm).find('[reorder-item]').attr('draggable', 'false');
                    $(elm).find('[reorder-item]').on('mousedown touchstart', onGrabStart);
                    setPostions($(elm).find('[reorder-item]'));
                }, 1)
                var currentTop = null,
                    originalTop = null,
                    originalBottom = null,
                    orginalIndex = null,
                    originalArr = $(elm).find('[reorder-item]'),
                    mainArr = $scope.reorderList;
                //helper functions
                var setPostions = function (arr) {
                    var parentHeight = $(elm).height();
                    var styleStr = "";
                    arr.each(function (index, val) {
                        var _top = $(val).height() * index;
                        styleStr += "[reorder-list] .item-" + (index) + " {left:0; top:" + _top + "px;} ";
                        $(val).addClass('item-' + index);
                    })
                    $("<style type='text/css'>" + styleStr + "</style>").appendTo("head");
                    $(elm).css({
                        height: parentHeight + 'px'
                    })
                    $(elm).find('[reorder-item]').css('position', 'absolute');
                }

                // event Handlers
                var onGrabStart = function (e) {
                    $(window).on('mousemove touchmove', onGrabbing);
                    $(window).on('mouseup touchend', onGrabEnd);
                    $(this).addClass('reorder-item-grabbing');
                    $(this).removeClass('transition');
                    e.type == 'touchstart' ? $('html').addClass('scroll-lock') : false;
                    var _top = (e.type == 'touchstart' ? e.changedTouches[0].pageY : e.pageY) - ($(elm).parent().offset().top + ($(this).height() / 2));
                    _top > 0 ? $(this).css({
                        top: _top + "px"
                    }) : false;
                    currentTop = $(this).position().top;
                    originalTop = currentTop;
                    originalBottom = currentTop + $(this).height();
                    orginalIndex = parseInt($(this)[0].dataset.index);
                    $scope.updateScrollbar('disable');
                }
                var onGrabbing = function (e) {
                    e.preventDefault();
                    var _this = $('.reorder-item-grabbing');
                    var _top = (e.type == 'touchmove' ? e.changedTouches[0].pageY : e.pageY) - ($(elm).parent().offset().top + (_this.height() / 2));
                    if (_top > 0) {
                        _this.css({
                            top: _top + "px"
                        })
                        _this.attr('new-index') != undefined ? orginalIndex = parseInt(_this.attr('new-index')) : parseInt(_this.attr('data-index'));
                        detectHit(_this, detectDirection(_this), originalTop, originalBottom, orginalIndex, originalArr);
                        currentTop = _top;
                        console.log("if");
                    }else{
                        console.log("else");
                    }
                }
                var onGrabEnd = function (e) {
                    var _this = $('.reorder-item-grabbing');
                    $(window).off('mousemove touchmove', onGrabbing);
                    $(window).off('mouseup touchend', onGrabEnd);
                    _this.addClass('transition');
                    $('html').removeClass('scroll-lock');
                    $scope.updateScrollbar('update');
                    currentTop = null;
                    originalTop = null;
                    originalBottom = null;
                    $scope.reorderList = mainArr;
                    $scope.$apply();
                    _this.attr('class', _this.attr('class').replace(/item-[0-9]/, 'item-' + _this[0].dataset.index));
                    _this[0].style.top = "";
                    _this.removeClass('reorder-item-grabbing');
                }

                //movement detections
                var detectDirection = function (el) {
                    return el.position().top <= currentTop ? 'up' : 'down';
                }

                var detectHit = function (el, direction, top, bottom, index, arr) {
                    var newIndex = Math.round((parseInt(el[0].style.top) / el.height()));
                }
            }
        }
    }])