public with sharing class NewFlexBuilder {

    private Flex__c flex;

    public NewFlexBuilder() {
        Flex__c flex = new Flex__c();        
        this.flex = flex;
    }

    public NewFlexBuilder setRecordTypeId(String recordTypeId) {      
        this.flex.RecordTypeId = recordTypeId;   
        return this;
    }

    public NewFlexBuilder setIbmCode(String ibmCode) {        
        this.flex.IBM__c = ibmCode;                
        return this;   
    }

    public NewFlexBuilder setAccountIdByUsingIbmCode(String ibmCode) {
        this.flex.Account__c = [SELECT Id FROM Account WHERE IBM__c =: ibmCode LIMIT 1].Id;      
        return this;
    }

    public NewFlexBuilder setBaseCode(String base) {
        this.flex.Base__c =  base;
        return this;
    }

    public NewFlexBuilder setProductCode(String product) {
        this.flex.Product__c = product;       
        return this;
    }

    public NewFlexBuilder setProductNewPrice(Decimal productNewPrice) {
        this.flex.Price__c = productNewPrice;
        return this;
    }   

    public NewFlexBuilder setProductCurrentPrice(Decimal productCurrentPrice) {
        this.flex.Price__c = productCurrentPrice;
        return this;
    }   
    
    public Flex__c builder() {           
        return this.flex;
    }
}
