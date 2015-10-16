var eventControllers = angular.module('eventControllers', []);

eventControllers.controller('newWorksController', ['$scope','$state', 'items',
	function($scope, $state, items) {
              $scope.works = items.data;
            }])

eventControllers.controller('newWorkController', ['$scope', '$stateParams', '$state', 'items',
	function($scope, $stateParams, $state, items) {
                    $scope.snippet = items.data[$stateParams.workId - 1];
            }]);

eventControllers.controller('newCarousselController', ['$scope', '$stateParams', '$state', 'items',
	function($scope, $stateParams, $state, items) {
                  $scope.images = items.data[$stateParams.workId - 1].newcaroussel;
                  $scope.caroussel = items.data[$stateParams.workId - 1];
            }]);

eventControllers.controller('newArchiveController', function($scope, $stateParams, items) {
                    $scope.posts = items.data;
                    console.log($scope.posts);
                    //destroying fullpagejs
                    if($('html').hasClass('fp-enabled')){
                        $.fn.fullpage.destroy('all');
                    }
            });

