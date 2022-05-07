public class CustomLookupController {  
    @AuraEnabled(cacheable=true)  
    public static List<sobject> findRecords(String searchKey, String objectName) {  
      string searchText = '\'' + String.escapeSingleQuotes(searchKey) + '%\'';         
      return Database.query('SELECT Id, Name, Industry FROM ' +objectName+ ' WHERE Name LIKE '+searchText+' LIMIT 10');  
    }  
}