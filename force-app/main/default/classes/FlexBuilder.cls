public with sharing class FlexBuilder {

    private Flex__c flex;

    public FlexBuilder() {
        Flex__c flex = new Flex__c();        
        this.flex = flex;
    }

    public FlexBuilder setRecordTypeId(String recordTypeId) {      
        this.flex.RecordTypeId = recordTypeId;   
        return this;
    }

    public FlexBuilder setIbmCode(String ibmCode) {        
        this.flex.IBM__c = ibmCode;                
        return this;   
    }

    public FlexBuilder setAccountIdByUsingIbmCode(String ibmCode) {
        this.flex.Account__c = [SELECT Id FROM Account WHERE IBM__c =: ibmCode LIMIT 1].Id;      
        return this;
    }

    public FlexBuilder setBaseCode(String baseCode) {
        this.flex.Base__c =  baseCode;
        return this;
    }

    public FlexBuilder setProductCode(String productCode) {
        this.flex.Product__c = productCode;       
        return this;
    }

    public FlexBuilder setProductPrice(String productPrice) {
        this.flex.Price__c = Decimal.valueOf(productPrice);
        return this;
    }   
    
    public Flex__c builder() {           
        return this.flex;
    }
}
