public class CustomLookupController {

    @AuraEnabled(cacheable=true)  
    public static List<sobject> findRecords(String searchKey, String objectName) {  
      string searchText = '\'%' + String.escapeSingleQuotes(searchKey) + '%\'';         
      return Database.query('SELECT Id, Name, Industry FROM ' +objectName+ ' WHERE Name LIKE '+searchText+' LIMIT 10');  
    }  

    @AuraEnabled
    public static List<sObject> getOnlyRecordsOwnedByTMs(String sObjectName, String fieldName, String fieldInput, List<String> recordIds){        
  
        String key, query = '';

        if (sObjectName == 'Account') {
          key = '%' + String.escapeSingleQuotes(fieldInput) + '%';
          query = 'SELECT Id, Name FROM Account ' 
          + 'WHERE (Name LIKE : key OR Industry LIKE : key) AND Id NOT IN : recordIds ' 
          + 'WITH SECURITY_ENFORCED ' 
          + 'ORDER BY LastModifiedDate DESC';
        }

        return Database.query(query);     
    }
}