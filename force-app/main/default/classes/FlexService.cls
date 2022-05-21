public with sharing class FlexService {  

   private final static Id FLEX_DISCOUNT_RT = Schema.SObjectType.Flex__c.getRecordTypeInfosByDeveloperName().get('NewPrice').getRecordTypeId();   
   private final static Id FLEX_MAINTENANCE_RT = Schema.SObjectType.Flex__c.getRecordTypeInfosByDeveloperName().get('BusinessMaintenance').getRecordTypeId();   
   private final static Id FLEX_REBATE_RT = Schema.SObjectType.Flex__c.getRecordTypeInfosByDeveloperName().get('Rebate').getRecordTypeId();        
   
    public static Flex__c setFlexDetails(FlexController.Flex flex) {   
                
        FlexBuilder builder = new FlexBuilder();

        Flex__c builtFlex = builder.setIbmCode(flex.ibmCode)
                                .setBaseCode(flex.baseCode)                                    
                                .setProductCode(flex.productCode)                                    
                                .setProductPrice(flex.productPrice)
                                .setAccountIdByUsingIbmCode(flex.ibmCode)
                                .builder();
        return builtFlex;
    }
}
