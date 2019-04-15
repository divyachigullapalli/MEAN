describe('Employee Ctrl', function() {
    var controller, $location;
    $location = {
      'path':'/'
    };
        beforeEach(function(){
          module('angularApp');
          
          inject(function ($controller,_$location_){
            controller = $controller('EmployeeController',{
              $location : _$location_
            });  
          });
          
        });
    it('expect controller to be defined', function() {
        expect(controller).toBeDefined();
    });

    it('expect variables declaration', function() {
        expect(controller.action).toBe('Add');
        expect(controller.newEmployee).toEqual({});
        expect(controller.employees.length).toBe(1);
    });

    it('save employee Record', function() {
      controller.newEmployee={
        'name': 'divya',
        'age': '29',
        'email':'divya@gmail.com'
      };
        controller.saveRecord();
        expect(controller.employees.length).toBe(2);
        expect(controller.employees[1].id).toBe(1);
    });

    it('update employee Record', function() {
      controller.action ='Update';
      spyOn(controller,'cancel');
      controller.newEmployee={
        'name': 'divya',
        'age': '28',
        'email':'divya@gmail.com'
      };
        controller.saveRecord();
        expect(controller.employees.length).toBe(2);
        expect(controller.employees[1].age).toBe('28');
        expect(controller.cancel).toHaveBeenCalled();
    });

    it('Edit employee Record', function() {
        controller.edit(0);
        expect(controller.newEmployee.id).toBe(0);
        expect(controller.newEmployee.name).toBe('Anubhav');
    });

    it('Cancel action called', function() {
        controller.cancel();
        expect(controller.newEmployee).toEqual({});
        expect($location.path).toBe('/');
        expect(controller.action).toBe('Add');
    });

});