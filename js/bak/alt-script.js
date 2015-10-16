var martineStig = angular.module('martineStig', ['ui.router', 'ngAnimate', 
    'ngTouch', 'slick', 'swipe', ]);

var resolveWorks = {
              items: ['$http', function($http) {
                return $http({
                  method: 'GET',
                  url: 'json/work.json'
                });
              }]
            };

var resolveWP = {
              items: ['$http', function($http) {
                return $http({
                  method: 'GET',
                  url: '../wordpress/wp-json/posts'
                });
              }]
            };
            

martineStig.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('feature');
$stateProvider

	.state('feature', {
            url: '/feature',
            templateUrl: 'pages/feature.html',
	})
	.state('works', {
		url: '/newworks',
		templateUrl: 'pages/newworks.html',
		resolve: resolveWorks,
		controller: ['$scope','$state', 'items',
				function($scope, $state, items) {
              	$scope.works = items.data;
          }]
	})
	.state('works.snippet', {
		url: '/newworksnippet',
		templateUrl: 'pages/newwork.html',
		controller: ['$scope', '$stateParams', '$state', 'items',
				function($scope, $stateParams, $state, items) {
                $scope.works.snippet = items.data[$stateParams.workId - 1];
            }]
	})
	.state('works.caroussel', {
		url: '/newworkcaroussel',
		templateUrl: 'pages/newcaroussel.html',
		controller: ['$scope', '$stateParams', '$state', 'items',
				function($scope, $stateParams, $state, items) {
                $scope.images = items.data[$stateParams.workId - 1].newcaroussel;
                $scope.caroussel = items.data[$stateParams.workId - 1];
            }]
	})
	.state('works.text', {
		url: '/newworklongtext',
		templateUrl: 'pages/newlongtext.html',
		controller: 'newLongTextController'
	})
	.state('books', {
		url: '/books',
        templateUrl: 'pages/books.html'
	})
    .state('text', {
	    url: '/text',
	    templateUrl: 'pages/text.html'
    })
    .state('archive', {
	    url: '/archive',
	    templateUrl: 'pages/archive.html',
	    resolve: resolveWP,
	    controller: 'archiveController'
    });

       });
