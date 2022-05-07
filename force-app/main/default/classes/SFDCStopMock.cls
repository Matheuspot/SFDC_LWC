@isTest
global class SFDCStopMock implements HttpCalloutMock {

    global HTTPResponse respond(HTTPRequest request) {
        HTTPResponse response = new HttpResponse();

        response.setBody('{"author":"Rahul Malhotra","blogs":[{"id":"1","title":"Salesforce Integration Tutorial Part1 - Introduction and Setting up Workbench","url":"https://www.sfdcstop.com/2019/11/salesforce-integration-tutorial-part-1.html"},{"id":"2","title":"Salesforce Integration Tutorial Part 2 - Exploring GET Method","url":"https://www.sfdcstop.com/2019/11/salesforce-integration-tutorial-part-2.html"},{"id":"3","title":"Salesforce Integration Tutorial Part 3 - Exploring POST Method","url":"https://www.sfdcstop.com/2019/11/salesforce-integration-tutorial-part-3.html"},{"id":"4","title":"Salesforce Integration Tutorial Part 4 - Exploring DELETE Method","url":"https://www.sfdcstop.com/2019/11/salesforce-integration-tutorial-part-4.html"},{"id":"5","title":"Salesforce Integration Tutorial Part 5 - Exploring PUT Method","url":"https://www.sfdcstop.com/2019/11/salesforce-integration-tutorial-part-5.html"},{"id":"6","title":"Salesforce Integration Tutorial Part 6 - Exploring PATCH Method","url":"https://www.sfdcstop.com/2019/11/salesforce-integration-tutorial-part-6.html"},{"id":"7","title":"Salesforce Integration Tutorial Part 7 - Creating a test class for Apex Web Service","url":"https://www.sfdcstop.com/2019/11/salesforce-integration-tutorial-part-7.html"},{"id":"8","title":"Salesforce Integration Tutorial Part8 - Apex REST Callouts","url":"https://www.sfdcstop.com/2019/12/salesforce-integration-tutorial-part-8.html"}]}');
        response.setHeader('Content-Type', 'application/json');
        response.setStatusCode(200);

        return response;
    }   
}