@RestResource (urlMapping = '/studentsInfo/*')

global class StudentInformationService {

    global class StudentInfo {

        String studentName      {get; set;}
        String studentAddress   {get; set;}
        String studentPhone     {get; set;}
        String schoolName       {get; set;}
    }

    @HTTPGet
    global static StudentInfo getStudent() {

        RestRequest request = RestContext.Request;
        String studentId = request.RequestURI.substring(request.RequestURI.lastIndexOf('/') + 1);

        Student__c student =    [
                                    SELECT Id, Name, Address__c, Student_Name__c, Phone_Number__c, School__r.Name
                                    FROM Student__c
                                    WHERE Id =: studentId
                                ];

        StudentInfo stdInfo     = new StudentInfo();
        stdInfo.studentName     = student.Student_Name__c;
        stdInfo.studentAddress  = student.Address__c;
        stdInfo.studentPhone    = student.Phone_Number__c;
        stdInfo.schoolName      = student.School__r.Name;

        return stdInfo;
    }  
}