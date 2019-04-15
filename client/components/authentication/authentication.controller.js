angular.module('eStationaryMart.authentitation', ["eStationaryMart.services"])// make an auth module

  .controller('AuthenticationController', function ($scope, $rootScope, $window, $location, Auth) {

    $scope.signin = function () {
      Auth.signin($scope.user)
        .then(function (data) {
          //Save token, user_id and address to local storage
          $window.localStorage.setItem('marttoken', data.token)
          $window.localStorage.setItem('martuser', data.userid);
          $window.localStorage.setItem('martuserstreet', data.address.street);
          $window.localStorage.setItem('martusercity', data.address.city);
          $window.localStorage.setItem('martuserstate', data.address.state);
          $window.localStorage.setItem('martuserzip', data.address.zip_code);
          $rootScope.user = data.username;
          $rootScope.userEmail = data.email;
          if(data.email=="admin@cognizant.com"){
            $location.path('/order');
          } else{
            $location.path('/stationary');
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    };

    $scope.signup = function () {
      Auth.signup($scope.user)
        .then(function (data) {
          $window.localStorage.setItem('marttoken', data.token);
          // saving username to localstorage
          $window.localStorage.setItem('martuser', data.userid);
          $location.path('/stationary');
        })
        .catch(function (error) {
          console.error(error);
        });
    };
  });
