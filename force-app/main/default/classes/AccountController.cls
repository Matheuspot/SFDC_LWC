public with sharing class AccountController {

    @AuraEnabled (cacheable = true)
    public static List<Account> getAccountList() {
        return [SELECT Id, Name, Type, Industry FROM Account LIMIT 10];
    }

    @AuraEnabled (cacheable = true)
    public static List<Account> filterAccountTypeType(String type) {
        return [SELECT Id, Name, Type, Industry FROM Account WHERE Type =: type LIMIT 5];
    }
    @AuraEnabled (cacheable = true)
    public static List<Account> findAccounts(String searchKey) {
        String key = '%' + searchKey + '%';
        return [SELECT Id, Name, Type, Industry FROM Account WHERE Name LIKE : key LIMIT 5];
    }

    @AuraEnabled (cacheable = true)
    public static List<Id> setSelectedRows(List<Id> selectedRowsId) {        
        return new List<Id>(selectedRowsId);
    }
    
}