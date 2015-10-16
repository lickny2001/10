/*SFG: todo:
* check onEnter / onLeave parameters*/
/*            onEnter: function(){
                alert('hello onEnter');
                },
            onExit: function(){
            alert('hello onExit');
            }*/


var martineStig = angular.module('martineStig', ['ui.router', 'ngAnimate', 
    'ngTouch', 'eventControllers', 'slick', 'swipe', ]);

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

var resolveBooks = {
            items: ['$http', function($http){
                return $http ({
                    method: 'GET',
                    url: 'json/books.json'
                });
                }]
            };
            

martineStig.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('feature');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('feature', {
            url: '/feature',
            templateUrl: 'pages/feature.html',
            controller: 'featureController',
            data:{
                cssClassnames: 'feature'
            },
        })

        .state('works', {
            url: '/works',
            templateUrl: 'pages/works.html',
            resolve: resolveWorks,
            controller: 'worksController',
            data:{
                cssClassnames: 'works'
            }
        })
        .state('work', {
        	url: '/work/:workId',
        	templateUrl: 'pages/work.html',
            resolve: resolveWorks,
            controller: 'workController',
            data:{
                cssClassnames: 'worksnippet'
            }
        })
        .state('work_caroussel', {
            url: '/work_caroussel/:workId',
            templateUrl: 'pages/caroussel.html',
            resolve: resolveWorks,
            controller: 'carousselController',
            data:{
                cssClassnames: 'caroussel'
            }
        })
        .state('work_longtext', {
            url: '/work_longtext/:workId',
            templateUrl: 'pages/longtext.html',
            resolve: resolveWorks,
            controller: ['$scope', '$stateParams', '$state', 'items', 
                function($scope, $stateParams, $state, items) {
                  $scope.work_longtext = items.data[$stateParams.workId - 1]; // don't forget to add it here!
            }],
            data:{
                cssClassnames: 'longtext'
            }
        })
        .state('books', {
            url: '/books',
            templateUrl: 'pages/books.html',
            resolve: resolveBooks,
            controller: 'booksController',
            data:{
                cssClassnames: 'books'
            }
        })
        .state('book', {
            url: '/book/:bookId',
            templateUrl: 'pages/book.html',
            resolve: resolveBooks,
            controller: 'bookController',
            data:{
                cssClassnames: 'book'
            }
        })

        .state('text', {
            url: '/text',
            templateUrl: 'pages/text.html',
            data:{
                cssClassnames: 'text'
            }
        })
        .state('archive', {
            url: '/archive',
            templateUrl: 'pages/archive.html',
            resolve: resolveWP,
            controller: 'archiveController',
            data:{
                cssClassnames: 'archive'
            }
        })

        .state('article', {
            url: '/article/:articleId',
            templateUrl: 'pages/article.html',
            resolve: resolveWP,
            controller: 'articleController',
            data:{
                cssClassnames: 'article'
            }
        });

});


/* -- SFG: directive resizable to handle any window resizing events -- */
martineStig.directive('resizable', function ($window) {
    return function($scope) {
        $scope.initializeWindowSize = function() {
        $scope.windowHeight = $window.innerHeight;
        return $scope.windowWidth = $window.innerWidth;
    };
        $scope.initializeWindowSize();
        return angular.element($window).bind('resize', function() {
        $scope.initializeWindowSize();
      return $scope.$apply();
    });
  };
});

martineStig.directive('contentwrapper', function ($window) {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            var winHeight = $window.innerHeight;
            /*var headerHeight = attrs.banner ? attrs.banner : 0; */// SFG: original code based on css height of banner element
            var headerHeight = 100; // SFG: based on fixed height of nav element
            elem.css('height', winHeight - headerHeight + 'px');
        }
    };
});
martineStig.directive('contentitem', function ($window) {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            var winHeight = $window.innerHeight;
            /*var headerHeight = attrs.banner ? attrs.banner : 0; */// SFG: original code based on css height of banner element
            var headerHeight = 150; // SFG: based on fixed height of nav element
            elem.css('height', winHeight - headerHeight + 'px');
        }
    };
});

/* SFG: directive for FullPageJS */
martineStig.directive('fullpage', function () {
    return {
        restrict:'A',
        link: function (scope, element, attrs) {
            
        if (typeof $.fn.fullpage.destroy == 'function') { 
            $.fn.fullpage.destroy('all');

            console.log('fp destroyed');
        }
            setTimeout(function(){
            element.fullpage({
            });

            console.log('fp initialised in directive');

        },1);
        }                  
    }
});

martineStig.directive('isActiveNav', [ '$location', function($location) {
return {
 restrict: 'A',
 link: function(scope, element) {
   scope.location = $location;
   console.log($location);
   scope.$watch('location.path()', function(currentPath) {
     if('/#' + currentPath === element[0].attributes['href'].nodeValue) {
       element.parent().addClass('active');
       console.log('active');
     } else {
       element.parent().removeClass('active');
       console.log('remove active');
     }
   });
 }
 };
}]);


