public with sharing class NewFlexController {
   
    public class Flex {      
        @AuraEnabled public String ibmCode {get; set;}
        @AuraEnabled public String base {get; set;}
        @AuraEnabled public String product {get; set;}       
        @AuraEnabled public String paymentCondition {get; set;}
        @AuraEnabled public String shippingCondition {get; set;}
        @AuraEnabled public String type {get; set;}
        @AuraEnabled public Decimal productNewPrice {get; set;}
        @AuraEnabled public Decimal productCurrentPrice {get; set;}
        @AuraEnabled public Decimal freightCost {get; set;}
        @AuraEnabled public Decimal arbitragemPonderada {get; set;}
        @AuraEnabled public Decimal faqTotaICMs {get; set;}
        @AuraEnabled public Decimal faqImpostoTotal {get; set;}
        @AuraEnabled public Decimal marginM3 {get; set;}
        @AuraEnabled public Decimal marginM3G {get; set;}
        @AuraEnabled public Decimal temporaryDiscount {get; set;}
        @AuraEnabled public Date limitDiscountDate {get; set;}
   }

    @AuraEnabled
    public static void saveFlexItems(List<Flex> flexRows){      
        
        System.debug('flexes: ' + flexRows);
        
        try {
            if (flexRows.isEmpty()) return;
            List<Flex__c> flexes = new List<Flex__c>();
         
            for (Flex flexRow : flexRows) {                     
                Flex__c flex = NewFlexService.setFlexDetails(flexRow);        
                flexes.add(flex);
            } 

            insert flexes;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static List<RegisteredPrice__c> getRegisteredPricesForIBMs(List<String> ibmCodes){              
              
        try {         

                return [
                        SELECT Id, IBM__c, Base__c, Product__c, Price__c 
                        FROM RegisteredPrice__c
                        WHERE IBM__c IN : ibmCodes WITH SECURITY_ENFORCED
                ];

        }  

        catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static List<RegisteredPrice__c> getRegisteredPricesByCustomerGroup(List<String> ibmCodes){              
              
        try {         

                return [
                        SELECT Id, IBM__c, Base__c, Product__c, Price__c 
                        FROM RegisteredPrice__c
                        WHERE IBM__c IN : ibmCodes WITH SECURITY_ENFORCED
                ];

        }  

        catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
