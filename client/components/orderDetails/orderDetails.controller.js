angular.module('eStationaryMart.orderController', ["eStationaryMart.services"])// make an auth module

    .controller('orderController', function ($scope,$rootScope, Orders) {

        function getAllOrders() {
            $scope.user= $rootScope.user;
            Orders.getAllOrders()
                .then(function (orders) {
                    $scope.orders = orders;
                })
                .catch(function (error) {
                    console.error(error);
                });
        }
        getAllOrders();

        $scope.delete = function (id) {
            Orders.deleteOrder(id);
            getAllOrders();
        }

        $scope.editOrder = function (id) {
            $scope.orders.forEach(function(element,index) {
                if(element._id == id){
                    $scope.orders[index].edit = true;
                }
            });
        }

        $scope.updateOrder = function (orderId,item) {
            var req={
                'orderId':orderId,
                'id':item.id,
                'quantity':item.quantity,
                'total':item.price * item.quantity
            }
            Orders.updateOrder(req).then(function(response){
                getAllOrders();
            }).catch(function (error) {
                console.error(error);
            });
        }

        $scope.updateStatus = function (orderid) {
            var req={
                'orderId':orderid,
                'status':this.selectedItem=="false"? false: true
            }
            Orders.updateOrder(req).then(function(response){
                getAllOrders();
            }).catch(function (error) {
                console.error(error);
            });
        }
    });
