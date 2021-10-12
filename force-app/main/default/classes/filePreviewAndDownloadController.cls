public with sharing class filePreviewAndDownloadController {
   
    @AuraEnabled(cacheable = true)
    public static String getRelatedFilesByRecordId(String recordId) {
        
        List<ContentDocumentLink> lsFiles = [
                                            SELECT ContentDocumentId 
                                            FROM ContentDocumentLink 
                                            WHERE LinkedEntityId = :recordId
                                        ];

        Set<Id> setfileIDs = new Set<Id>();

        for (ContentDocumentLink docLink : lsFiles) {
            setfileIDs.add(docLink.ContentDocumentId);
        }
 
        List<ContentVersion> lsDocs = [
                                        SELECT Id,
                                        CreatedDate, 
                                        CreatedBy.Name, 
                                        ContentDocumentId, 
                                        FileExtension, 
                                        Title 
                                        FROM ContentVersion 
                                        WHERE ContentDocumentId IN : setfileIDs
                                        ORDER BY CreatedDate DESC LIMIT 1
                                    ];  
        return JSON.serialize(lsDocs);
    }
}