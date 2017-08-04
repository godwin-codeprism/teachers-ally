angular.module('teachersAlly')
    .directive('reorderList', ['$parse', '$timeout', function ($parse, $timeout) {
        return {
            restrict: 'A',
            //transclude: true,
            scope: false,
            link: function ($scope, elm, attrs) {
                $scope.$watch("reorderList", function (newValue, oldValue) {
                    if (newValue != oldValue) {
                        $(elm).find('[reorder-item]').each(function (index, val) {
                            if ($(val).attr('draggable') != "false") {
                                $(elm).find('[reorder-item]').attr('draggable', 'false');
                                $(elm).find('[reorder-item] i').on('mousedown touchstart', onGrabStart);
                            }
                        })
                        $timeout(function () {
                            setPostions($(elm).find('[reorder-item]'));
                            $scope.updateScrollbar('update');
                            console.log("Detected change in re-order list. So I've reset the positions");
                        }, 400);
                    }
                });
                //global vars for this directive
                var currentTop = null,
                    originalTop = null,
                    originalBottom = null,
                    orginalIndex = null,
                    scrollLoop = null,
                    originalArr = $(elm).find('[reorder-item]'),
                    mainArr = $scope.reorderList;

                //helper functions
                var setPostions = function (arr) {
                    var parentHeight = $(elm).height();
                    var styleStr = "";
                    arr.each(function (index, val) {
                        var _top = $(val).height() * index;
                        styleStr += "[reorder-list] .item-" + (index) + " {left:0; top:" + _top + "px; visibility: visible;} ";
                        if ($(val).attr('class').match(/item-[0-9]/)) {
                            var len = $(val).attr('class').match(/item-[0-9]/).length;
                            for (i = 0; i < len; i++) {
                                $(val).removeClass($(val).attr('class').match(/item-[0-9]/)[i]);
                            }
                        }
                        $(val).addClass('item-' + index);
                    })
                    $('#dynamicStyles').remove();
                    $("<style type='text/css' id='dynamicStyles'>" + styleStr + "</style>").appendTo("head");
                    $(elm).css({
                        height: ($(elm).find('[reorder-item]').length * $('[reorder-item]').height() + $(elm).find('[reorder-item]').length) + 'px'
                    })
                    $(elm).find('[reorder-item]').css('position', 'absolute');
                    mainArr = $scope.reorderList;
                }

                // event Handlers
                var onGrabStart = function (e) {
                    $(window).on('mousemove touchmove', onGrabbing);
                    $(window).on('mouseup touchend', onGrabEnd);
                    $(this).parent().addClass('reorder-item-grabbing');
                    $(this).parent().removeClass('transition');
                    $(this).parent().attr('class', $(this).parent().attr('class').replace("item-" + $(this).parent().attr('class').match(/[0-9]/g).join().replace(/,/g, ""), ''));
                    e.type == 'touchstart' ? $('html').addClass('scroll-lock') : false;
                    var _top = (e.type == 'touchstart' ? e.changedTouches[0].pageY : e.pageY) - ($(elm).parent().offset().top + ($(this).parent().height() / 2));
                    _top > 0 ? $(this).parent().css({
                        top: _top + "px"
                    }) : false;
                    currentTop = $(this).parent().position().top;
                    originalTop = currentTop;
                    originalBottom = currentTop + $(this).parent().height();
                    orginalIndex = parseInt($(this).parent()[0].dataset.index);
                    $scope.updateScrollbar('disable');
                }

                // while dragging
                var onGrabbing = function (e) {
                    e.preventDefault();

                    //local Grabbing Vars
                    var _this = $('.reorder-item-grabbing');
                    var bound = checkLimits(e, $('#reorderListContainer'), _this);
                    var _top = (e.type == 'touchmove' ? e.changedTouches[0].pageY : e.pageY) - ($(elm).parent().offset().top + (_this.height() / 2));
                    var scrollNewIndex = null;

                    // jumbling logic when dragging inside.
                    if (_top > 0 && bound == "inside") {
                        scrollLoop != null ? clearInterval(scrollLoop) : false;
                        scrollLoop = null;
                        _this.css({
                            top: _top + "px"
                        })
                        _this.attr('new-index') != undefined ? orginalIndex = parseInt(_this.attr('new-index')) : parseInt(_this.attr('data-index'));
                        detectHit(_this, detectDirection(_this), originalTop, originalBottom, orginalIndex, originalArr, scrollNewIndex);
                        currentTop = _top;
                    }

                    // continues scrolling when dragging outsite
                    switch (bound) {
                        case "top":
                            if (scrollLoop == null) {
                                scrollLoop = setInterval(function () {
                                    if (parseInt($(elm).parent().css('top')) < 0) {
                                        $(elm).parent().css('top', parseInt($(elm).parent().css('top')) + 3);
                                        _this.css('top', parseInt(_this.css('top')) - 3);
                                        scrollNewIndex = Math.round((parseInt(_this[0].style.top) / _this.height()));
                                        _this.attr('new-index') != undefined ? orginalIndex = parseInt(_this.attr('new-index')) : parseInt(_this.attr('data-index'));
                                        detectHit(_this, detectDirection(_this), originalTop, originalBottom, orginalIndex, originalArr, scrollNewIndex);
                                    } else {
                                        scrollNewIndex = null;
                                        clearInterval(scrollLoop);
                                        scrollLoop = null;
                                    }
                                }, 15);
                            }
                            break;

                        case "bottom":
                            if (scrollLoop == null) {
                                scrollLoop = setInterval(function () {
                                    if ($('#reorderListContainer').height() - $(elm).parent().height() < parseInt($(elm).parent().css('top'))) {
                                        $(elm).parent().css('top', parseInt($(elm).parent().css('top')) - 3);
                                        _this.css('top', parseInt(_this.css('top')) + 3);
                                        scrollNewIndex = Math.round((parseInt(_this[0].style.top) / _this.height()));
                                        _this.attr('new-index') != undefined ? orginalIndex = parseInt(_this.attr('new-index')) : parseInt(_this.attr('data-index'));
                                        detectHit(_this, detectDirection(_this), originalTop, originalBottom, orginalIndex, originalArr, scrollNewIndex);
                                    } else {
                                        scrollNewIndex = null;
                                        clearInterval(scrollLoop);
                                        scrollLoop = null;
                                    }
                                }, 15);
                            }
                            break;
                    }
                }

                // when drag ends
                var onGrabEnd = function (e) {
                    scrollLoop != null ? clearInterval(scrollLoop) : false;
                    scrollLoop = null;
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
                    _this.addClass('item-' + _this[0].dataset.index);
                    _this[0].style.top = "";
                    _this.attr('new-index') != undefined ? _this.removeAttr('new-index') : false;
                    _this.removeClass('reorder-item-grabbing');
                }

                //movement detections
                var detectDirection = function (el) {
                    return el.position().top <= currentTop ? 'up' : 'down';
                }

                // gets new position 
                var detectHit = function (el, direction, top, bottom, index, arr, scrollNewIndex) {
                    var newIndex = scrollNewIndex != null ? scrollNewIndex : Math.round((parseInt(el[0].style.top) / el.height()));
                    if (index != newIndex && $('.item-' + newIndex).length > 0) {
                        el.attr('new-index', newIndex);
                        var str = $('.item-' + newIndex).attr('class');
                        if (direction == "up") {
                            $('.item-' + newIndex).attr('class', str.replace("item-" + str.match(/[0-9]/g).join().replace(/,/g, ""), 'item-' + (newIndex + 1)));
                        } else {
                            $('.item-' + newIndex).attr('class', str.replace("item-" + str.match(/[0-9]/g).join().replace(/,/g, ""), 'item-' + (newIndex - 1)));
                        }
                        mainArr.move(index, newIndex);
                    }
                }

                // checks for upper and lower limits of loop scroll
                var checkLimits = function (e, div, dragItem) {
                    var mouse_y = e.type == 'touchmove' ? e.changedTouches[0].pageY : e.pageY;
                    var top_limit = div.offset().top + (dragItem.height() / 2);
                    var bottom_limit = div.offset().top + (div.height() - (dragItem.height() / 2));
                    if (mouse_y < top_limit) {
                        return "top"
                    } else if (mouse_y > bottom_limit) {
                        return "bottom"
                    } else {
                        return "inside"
                    }

                }
            }
        }
    }])