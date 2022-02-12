public with sharing class LightningSearchDataTableController {

    @AuraEnabled
    public static List<Account> fetchAccountData() {        
        return [SELECT Id, Name, Industry FROM Account];        
    }
}
