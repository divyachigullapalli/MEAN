angular.module('eStationaryMart.stationary', ["eStationaryMart.services"])// make an stationary module

	.controller('StationaryController', function ($scope, $rootScope, $location, Lists, Orders) {
		$scope.totalPrice = 0;
		$scope.itemsOrdered = [];
		$scope.quantity;

		Lists.getAllItems()
			.then(function (list) {
				$scope.availableItems = {
					"products": list
				}
			})

		$scope.addToCart = function (item) {
			if (item.quantity > 0) {
				var total = item.price * item.quantity;
				item.total = total;
				$scope.itemsOrdered.push(item);
				$scope.totalPrice = $scope.totalPrice + total;
			}

		}
		$scope.order = function () {
			var order = {
				emailId: $rootScope.userEmail,
				Status: false,
				items: $scope.itemsOrdered
			};
			Orders.addOrder(order);

			$location.path('/order');
		};

	});