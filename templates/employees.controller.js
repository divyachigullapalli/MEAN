function EmployeeController($location) {
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

}