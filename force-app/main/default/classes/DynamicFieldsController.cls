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
            return [SELECT Id, Phone FROM Account WHERE Name LIKE : name LIMIT 1];            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static RegisteredPrice__c getRegisteredPricesForIBM(List<String> ibmCodes){
        try {
            return [SELECT IBM__c, Base__c, Product__c,Price__c FROM RegisteredPrice__c WHERE IBM__c IN : ibmCodes];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}