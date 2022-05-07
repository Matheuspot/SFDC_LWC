public with sharing class DynamicFieldsController {
 
    @AuraEnabled
    public static String getAccountIndustryByName(String accountName){
        try {
            string name = '%' + accountName + '%';
            return [SELECT Id, Type FROM Account WHERE Name LIKE : name LIMIT 1].Type;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static List<Account> getAccountPhoneByName(String accountName){
        try {
            string name = '%' + accountName + '%';
            return [SELECT Id, Phone FROM Account WHERE Name LIKE : name LIMIT 2];            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
