public class AccountHandler {
    
    public void getContacts(List<Account> lsAccount) {
        List<Contact> lsContact = [SELECT Id FROM Contact WHERE AccountId IN : lsAccount];
        System.debug(lsContact);
        
    }

}