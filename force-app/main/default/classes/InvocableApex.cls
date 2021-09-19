/*
Class for updating contacts related to an account. These contacts are updated by an Apex Class
that is invoked by a Flow that is triggered by a quick Action.
*/

public class InvocableApex  {
   
    @InvocableMethod (label = 'Update Contacts')
    public static void updateContacts(List<Id> lsAccount) {   

    List<Contact> lsContact = [SELECT Id FROM Contact WHERE AccountId IN : lsAccount];
    if (lsContact.isEmpty()) return;
    
        for (Contact cls : lsContact) {            
            cls.Description = 'Populated by Apex v2';
        }
        update lsContact;
    }
}