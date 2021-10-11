public with sharing class filePreviewAndDownloadController {
   
    @AuraEnabled(cacheable=true)
    public static Map<Id, String> getRelatedFilesByRecordId(String recordId) {
        // Get record file IDs        
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
                                        SELECT ContentDocumentId, FileExtension, Title 
                                        FROM ContentVersion 
                                        WHERE ContentDocumentId IN : setfileIDs
                                        ORDER BY CreatedDate DESC LIMIT 1
                                    ];


        Map<Id, String> mapIdTitle = new Map<Id, String>();
        for (ContentVersion docLink : lsDocs) {
            mapIdTitle.put(docLink.ContentDocumentId, docLink.Title);
        }
        return mapIdTitle;
    }
}