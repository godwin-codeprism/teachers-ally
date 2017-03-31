var template = '<div class="list-group"><a class="list-group-item"><i class="fa fa-share" aria-hidden="true"></i> Export</a><a class="list-group-item"><i class="fa fa-clone" aria-hidden="true"></i> Duplicate</a><a class="list-group-item delete"><i class="fa fa-trash" aria-hidden="true"></i> Delete</a></div>';
angular.module('teachersAlly')
    .directive('gwClassoptions', ['$compile', function ($compile) {
        return {
            restrict: 'A',
            scope: true,
            controller: 'classesController',
            link: function ($scope, elm, attrs) {
                // variable declarations
                var currentPopover = null;
                var hidePopover = function (e) {
                    if ($(e.target).parents(currentPopover).length <= 0 && !$(e.target).hasClass('class-options-btn') && !$(e.target).parent().hasClass('class-options-btn')) {
                        $(currentPopover).popover('hide');
                        $(document).off('click', hidePopover);
                    }
                }

                $(elm).attr('data-content', template);
                $(elm).popover({
                    'placement': 'bottom',
                    'animation': true,
                    'html': true,
                    'trigger': 'manual',
                    'content': function () {
                        return $compile(template)($scope);
                    }
                });
                $(elm).click(function (e) {
                    $(elm).popover('show');
                    currentPopover = '#' + $(elm).attr('aria-describedby');
                    $(currentPopover).find('.delete').attr('ng-click', 'deleteClass(' + attrs.date + ',\'' + currentPopover + '\')');
                    $compile($(currentPopover))($scope);
                    $(document).on('click', hidePopover);
                });
            }
        }
    }]);