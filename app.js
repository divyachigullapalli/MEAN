
 var app = angular.module("angularApp", ["ngRoute"]);
    app.controller('EmployeeController', function($location) {
    var vm = this;
    var empid = 1;
    vm.action = 'Add';
    vm.newEmployee = {};
    vm.employees = [
        { id: 0, 'name': 'Anubhav', 'age': 28, 'email': 'anubhav.g@gmail.com' }

    ];
    vm.saveRecord = function () {
        if (vm.newEmployee.id == null) {
            vm.newEmployee.id = empid++;
            vm.employees.push(vm.newEmployee);

        } else {
            for (i in vm.employees) {
                if (vm.employees[i].id == vm.newEmployee.id) {
                    vm.employees[i] = vm.newEmployee;
                }
            }
        }
        vm.newEmployee = {};
        if (vm.action == 'Update') {
            vm.cancel();
        }
    }

    vm.edit = function (id) {
        vm.action = 'Update';
        for (i in vm.employees) {
            if (vm.employees[i].id == id) {
                vm.newEmployee = angular.copy(vm.employees[i]);
            }
        }
    }

    vm.cancel = function () {
        vm.newEmployee = {};
        $location.path('/');
        vm.action = 'Add';
    }

})  
    app.config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "templates/employees.html"
            })
            .when("/new", {
                templateUrl: "templates/new.html"
            })
            .when("/employees", {
                templateUrl: "templates/employees.html"
            })
            // use the HTML5 History API
        $locationProvider.html5Mode(true);
    });