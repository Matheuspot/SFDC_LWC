public with sharing class DisplayContactsController {
    
    @AuraEnabled (cacheable = true)
    public static List<Contact> displayContacts(){
        try {
            return [SELECT Id, FirstName, LastName FROM Contact ORDER BY Name ASC];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
   
}
