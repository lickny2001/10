var eventControllers = angular.module('eventControllers', []);



eventControllers.controller('featureController', function($scope, $timeout){
/*            $timeout(function(){location.href="#/works"} , 3000);   */// reloads feature to works
});

eventControllers.controller('worksController', ['$scope','$state', 'items',
	function($scope, $state, items) {
              $scope.works = items.data;
            }])

eventControllers.controller('workController', ['$scope', '$stateParams', '$state', 'items',
	function($scope, $stateParams, $state, items) {
                    $scope.work_snippet = items.data[$stateParams.workId - 1];
            }]);

eventControllers.controller('carousselController', ['$scope', '$stateParams', '$state', 'items',
	function($scope, $stateParams, $state, items) {
                  $scope.images = items.data[$stateParams.workId - 1].caroussel;
                  $scope.work_details = items.data[$stateParams.workId - 1];

            }]);

eventControllers.controller('booksController', ['$scope','$state', 'items',
    function($scope, $state, items) {
              $scope.books = items.data;
            }])

eventControllers.controller('bookController', ['$scope', '$stateParams', '$state', 'items',
    function($scope, $stateParams, $state, items) {
                  $scope.images = items.data[$stateParams.bookId - 1].caroussel;
                  $scope.book_details = items.data[$stateParams.bookId - 1];

            }]);

eventControllers.controller('archiveController', function($scope, $stateParams, items) {
                    $scope.posts = items.data;
                    /*SFG: destroying fullpagejs*/
                    if($('html').hasClass('fp-enabled')){
                        $.fn.fullpage.destroy('all');
                    }
            });

eventControllers.controller('articleController', ['$filter', '$scope', '$stateParams', '$state', 'items',
  function($filter, $scope, $stateParams, $state, items) {
                    $scope.posts = items.data;
                    $scope.articleId = $stateParams.articleId;
                    var filterResult = $scope.posts;
                    var insert = $filter('filter')(filterResult, { ID: $scope.articleId });
            }]);
