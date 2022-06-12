public with sharing class NewFlexService {  

    private final static Id FLEX_NEW_PRICE_RT = Schema.SObjectType.SolicitacaoDesconto__c.getRecordTypeInfosByDeveloperName().get('NewPrice').getRecordTypeId();   
    private final static Id FLEX_CHANGE_PRICE_RT = Schema.SObjectType.SolicitacaoDesconto__c.getRecordTypeInfosByDeveloperName().get('ChangePrice').getRecordTypeId();   
    
     public static Flex__c setFlexDetails(NewFlexController.Flex flex) {   
                 
        NewFlexBuilder builder = new NewFlexBuilder();
 
         Flex__c builtFlex = builder.setIbmCode(flex.ibmCode)
                                 .setBaseCode(flex.base)                                    
                                 .setProductCode(flex.product)  
                                 .setProductCurrentPrice(flex.productCurrentPrice)                                  
                                 .setProductNewPrice(flex.productNewPrice)
                                 .setAccountIdByUsingIbmCode(flex.ibmCode)
                                 .builder();
         return builtFlex;
     }
 }
 