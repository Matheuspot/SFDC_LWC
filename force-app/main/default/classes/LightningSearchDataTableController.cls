public with sharing class LightningSearchDataTableController {

    public class accountWrapper {
        @AuraEnabled public String id;
        @AuraEnabled public String name;
        @AuraEnabled public String industry;
    }

    @AuraEnabled
    public static List<accountWrapper> fetchAccountData() {     
        
        List<Account> accounts = [SELECT Id, Name, Industry FROM Account LIMIT 10];

        List<accountWrapper> accountsWrappered = wrapperAccount(accounts);
        return accountsWrappered;             
    }

    private static List<accountWrapper> wrapperAccount(List<Account> accounts) {

        List<accountWrapper> accsWrapper = new List<accountWrapper>();

        for (Account account : accounts) {
            accountWrapper accWrapper = new accountWrapper();

            accWrapper.id = account.Id;
            accWrapper.name = account.Name;
            accWrapper.industry = account.Industry == null ? '' : account.Industry;

            accsWrapper.add(accWrapper);            
        }

        return accsWrapper;
    }
}
