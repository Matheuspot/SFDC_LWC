public without sharing class MultiLookUpController {
  
    public class SObjectResult {
        @AuraEnabled public String recordName;
        @AuraEnabled public Id recordId;

        

    public SObJectResult(String recNameTemp, Id recIdTemp) {
            recordName = recNameTemp;
            recordId = recIdTemp;
        }
    
    }

    @AuraEnabled(cacheable=true)
    public static List<SObJectResult> getResults(String ObjectName, String fieldName, String value, List<String> selectedRecId, Boolean useFilterCriteria, String filterField, String filterFieldValue) {
        List<SObJectResult> sObjectResultList = new List<SObJectResult>();
        system.debug(fieldName+'-------------'+ObjectName+'---++----------'+value+'====='+selectedRecId);
        if(selectedRecId == null)
            selectedRecId = new List<String>();

        if(String.isNotEmpty(value)) {
            String query = 'Select Id,';
            if(useFilterCriteria){
                query = query+ fieldName+' FROM '+ObjectName+' WHERE '+fieldName+' LIKE \'%' + value.trim() + '%\' and ID NOT IN: selectedRecId ';
                query = query+' and '+filterField+'= \''+filterFieldValue+'\'';

            }else{
                query = query+ fieldName+' FROM '+ObjectName+' WHERE '+fieldName+' LIKE \'%' + value.trim() + '%\' and ID NOT IN: selectedRecId';
            }
            system.debug(query);
            String fieldvalue = '';
            for(sObject so : Database.Query(query)) {
                fieldvalue = (String)so.get(fieldName);
                sObjectResultList.add(new SObjectResult(fieldvalue, so.Id));


            }
        }
        return sObjectResultList;
    }





}