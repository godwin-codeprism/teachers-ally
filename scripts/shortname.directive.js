var template = `<div class="list-group compile">
  <a class="list-group-item" ng-click="goToAccount()">
    <i class="fa fa-user" aria-hidden="true"></i> Account
  </a>
  <a class="list-group-item" ng-click="logout()">
    <i class="fa fa-power-off" aria-hidden="true"></i> Sign Out
  </a>
</div>`;
angular.module('teachersAlly')
    .directive('gwShortname', ['$compile', function ($compile) {
        return {
            restrict: 'A',
            scope: true,
            controller:'appController',
            link: function ($scope, elm, attrs) {
                $(elm).attr('data-content', template);
                $(elm).popover({
                    'placement': 'bottom',
                    'animation': true,
                    'container': 'body',
                    'html': true,
                    'trigger': 'focus',
                    'content': function(){
                        return $compile(template)($scope);
                    }
                });
                $(elm).click(function () {
                    $compile($('.compile'))($scope);
                });
            }
        }
    }]);