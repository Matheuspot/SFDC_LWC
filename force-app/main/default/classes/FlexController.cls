public with sharing class FlexController {
 
    public class Flex {      
        @AuraEnabled public String ibmCode {get; set;}
        @AuraEnabled public String baseCode {get; set;}
        @AuraEnabled public String productCode {get; set;}
        @AuraEnabled public String productPrice {get; set;}
        @AuraEnabled public String[] baseCodes {get; set;}
        @AuraEnabled public String[] productPrices {get; set;}
    }

    @AuraEnabled
    public static void saveFlex(List<Flex> flexRows){
        try {
            if (flexRows.isEmpty()) return;
            List<Flex__c> flexes = new List<Flex__c>();
         
            for (Flex flexRow : flexRows) {     
                System.debug('Flex row: ' + flexRow);           
                Flex__c flex = FlexService.setFlexDetails(flexRow);        
                flexes.add(flex);
            } 

            insert flexes;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static List<RegisteredPrice__c> getRegisteredPricesForIBM(Flex filters){
        
        String key, whereClause, ibmCode, baseCode, productCode, productPrice = '';

        String [] baseCodes;
        String [] productPrices;
        
        List<String> criteria = new List<String>{};
      
        try {            

            if (filters != null) {

                ibmCode = filters.ibmCode;
                baseCode = filters.baseCode;
                productCode = filters.productCode;
                productPrice = filters.productPrice;
                baseCodes = filters.baseCodes;
                productPrices = filters.productPrices;

                if (!String.isEmpty(ibmCode)) {
                    criteria.add(' IBM__c =: ibmCode');
                }

                if (!String.isEmpty(baseCode)) {
                    criteria.add(' Base__c =: baseCode');
                }

                if (!String.isEmpty(productCode)) {
                    criteria.add(' Product__c =: productCode');
                }

                if (!String.isEmpty(productPrice)) {
                    criteria.add(' Price__c =: productPrice');
                }

                if (criteria.size() > 0 ) {
                    whereClause = ' WHERE' + String.join(criteria, ' AND');
                }           
            }  
            
            String query = 'SELECT Id, IBM__c, Base__c, Product__c, Price__c' 
            + ' FROM RegisteredPrice__c' + 
            whereClause + ' WITH SECURITY_ENFORCED';

            return Database.query(query);
        }         
        catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}