@isTest
private class EmployeeSortingTest {
    static testmethod void test1() {        
        List<Employee> empList = new List<Employee>();
        empList.add(new Employee(101,Date.valueOf('2022-01-04'),'Joe Smith', '4155551212'));
        empList.add(new Employee(101,Date.valueOf('2022-01-02'),'J. Smith', '4155551212'));
        empList.add(new Employee(25,Date.valueOf('2022-01-01'),'Caragh Smith', '4155551000'));
        empList.add(new Employee(105,Date.valueOf('2022-01-03'),'Mario Ruiz', '4155551099'));
        
        // Sort using the custom compareTo() method
        empList.sort();
        
        // Write list contents to the debug log
        System.debug(empList);
        
        // Verify list sort order.
       
    }
}