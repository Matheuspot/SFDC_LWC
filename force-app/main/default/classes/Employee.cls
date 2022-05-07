global class Employee implements Comparable {

    public Long id;
    public Date birthday;
    public String name;
    public String phone;
    
    // Constructor
    public Employee(Long i, Date b, String n, String p) {
        id = i;
        birthday = b;
        name = n;
        phone = p;
    }
    
    // Implement the compareTo() method
    global Integer compareTo(Object compareTo) {
        Employee secondEmployee = (Employee)compareTo;
        if( birthday > secondEmployee.birthday ) {
            return -1;
        } else if( birthday < secondEmployee.birthday ) {
            return 1;
        }
        return 0;              
    }
}