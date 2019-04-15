// create the eStationaryMart app
angular.module("eStationaryMart", [
  "eStationaryMart.services",
  "eStationaryMart.authentitation",
  "eStationaryMart.stationary",
  "eStationaryMart.orderController",
  "ngRoute",
  "ui.bootstrap"
])

  //config/routing
  .config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "components/authentication/signIn.html",
        controller: 'AuthenticationController'
      })
      .when('/signin', {
        templateUrl: 'components/authentication/signIn.html',
        controller: 'AuthenticationController'
      })
      .when('/signup', {
        templateUrl: 'components/authentication/signUp.html',
        controller: 'AuthenticationController'
      })
      .when('/stationary', {
        templateUrl: 'components/stationaryLists/stationary.html',
        controller: 'StationaryController'
      })
      .when('/order', {
        templateUrl: 'components/orderDetails/orderDetails.html',
        controller: 'orderController'
      })
      .when('/logout', {
        templateUrl: 'components/authentication/signIn.html',
        controller: 'AuthenticationController'
      })

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('AttachTokens');

  })

  // main app controller, not inside a ng-view, hanldes signout
  .controller('AppController', function ($scope, Auth, $rootScope) {
    $rootScope.hasSession = Auth.isAuthenticated();
    $scope.signout = function () {
      Auth.signout();
    }
  })

  .factory('AttachTokens', function ($window) {
    // this is an $httpInterceptor
    // its job is to stop all out going request
    // then look in local storage and find the user's token
    // then add it to the header so the server can validate the request
    var attach = {
      request: function (object) {
        var jwt = $window.localStorage.getItem('marttoken');
        if (jwt) {
          object.headers['x-access-token'] = jwt;
        }
        object.headers['Allow-Control-Allow-Origin'] = '*';
        return object;
      }
    };
    return attach;
  })

  // run directive
  .run(function ($rootScope, $location, Auth) {
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
      if (next.$$route && next.$$route.authenticate && !Auth.isAuthenticated()) {
        $location.path('/signin');
      }
      $rootScope.hasSession = Auth.isAuthenticated();
    });
  });