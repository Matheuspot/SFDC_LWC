@isTest
public class SFDCStopCalloutTest {

    public static final Integer RESPONSE_CODE           =   200;
    public static final String  RESPONSE_HEADER_KEY     =   'Content-Type';
    public static final String  RESPONSE_HEADER_VALUE   =   'application/json';
    public static final String  RESPONSE_BODY           =   '{"author":"Rahul Malhotra","blogs":[{"id":"1","title":"Salesforce Integration Tutorial Part1 - Introduction and Setting up Workbench","url":"https://www.sfdcstop.com/2019/11/salesforce-integration-tutorial-part-1.html"},{"id":"2","title":"Salesforce Integration Tutorial Part 2 - Exploring GET Method","url":"https://www.sfdcstop.com/2019/11/salesforce-integration-tutorial-part-2.html"},{"id":"3","title":"Salesforce Integration Tutorial Part 3 - Exploring POST Method","url":"https://www.sfdcstop.com/2019/11/salesforce-integration-tutorial-part-3.html"},{"id":"4","title":"Salesforce Integration Tutorial Part 4 - Exploring DELETE Method","url":"https://www.sfdcstop.com/2019/11/salesforce-integration-tutorial-part-4.html"},{"id":"5","title":"Salesforce Integration Tutorial Part 5 - Exploring PUT Method","url":"https://www.sfdcstop.com/2019/11/salesforce-integration-tutorial-part-5.html"},{"id":"6","title":"Salesforce Integration Tutorial Part 6 - Exploring PATCH Method","url":"https://www.sfdcstop.com/2019/11/salesforce-integration-tutorial-part-6.html"},{"id":"7","title":"Salesforce Integration Tutorial Part 7 - Creating a test class for Apex Web Service","url":"https://www.sfdcstop.com/2019/11/salesforce-integration-tutorial-part-7.html"},{"id":"8","title":"Salesforce Integration Tutorial Part8 - Apex REST Callouts","url":"https://www.sfdcstop.com/2019/12/salesforce-integration-tutorial-part-8.html"}]}';

    @isTest
    public static void testGetBlogs() {

        Test.startTest();     
        Test.setMock(HttpCalloutMock.class, new SFDCStopMock());

        HttpResponse response = SFDCStopCallout.getBlogs();

        System.assertEquals(RESPONSE_CODE               ,   response.getStatusCode()); 
        System.assertEquals(RESPONSE_HEADER_VALUE       ,   response.getHeader(RESPONSE_HEADER_KEY));
        System.assertEquals(RESPONSE_BODY               ,   response.getBody());

        Test.stopTest();
    }

    @isTest
    public static void testGetBlogsWithContactId() {       
    
        Contact contact = new Contact(LastName = 'Test');
        insert contact;   
        contact.LastName = 'New Test';        

        Test.startTest();       
        update contact;
        System.assertEquals(!String.isBlank(contact.Description), String.isBlank(contact.Description));
        Test.stopTest();
    }   

}