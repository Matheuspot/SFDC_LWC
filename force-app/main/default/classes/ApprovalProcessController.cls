public with sharing class ApprovalProcessController {

    private Map<Id, ProcessInstance> mapProcessInstance = new Map<Id, ProcessInstance>();

    public class ApprovalObject {
        Id workItemId;  
        String currentApprover;
        String submittedByName;
        String sObjectName;
        Id recordId;
        Id targetObjectName;
        Id actorId;    
        String stepName;
        Datetime submittedDateTime;
    }
    
    @AuraEnabled
    public static List<ApprovalObject> getRecordId(Id userId) {  
        ApprovalProcessController apprProcess = new ApprovalProcessController();
        List<ApprovalObject> app = new List<ApprovalObject>();
        app = apprProcess.getPendingApprovalRecords(userId);      
        return apprProcess.getPendingApprovalRecords(userId);        
    }

    private List<ApprovalObject> getPendingApprovalRecords(Id userId) {

        for (ProcessInstance processInstances :
        [
            SELECT Id, TargetObjectId, SubmittedById, SubmittedBy.Name, LastActorId, CreatedDate, CompletedDate, Status, 
            (SELECT Id, StepStatus, Comments FROM Steps WHERE StepStatus = 'Started'),
            (SELECT Id, ActorId, ProcessInstanceId FROM WorkItems WHERE ActorId =: userId)
            FROM ProcessInstance WHERE Status = 'Pending' ORDER BY CreatedDate DESC
        ]){
            this.mapProcessInstance.put(processInstances.TargetObjectId, processInstances);
        }         
        List<ApprovalObject> lsApprObject   = new List<ApprovalObject>();
        lsApprObject = this.getListWithObjectType();  
        
        return lsApprObject;
    }

    private List<ApprovalObject> getListWithObjectType() {

        //if (this.mapProcessInstance.isEmpty()) return;
        Set<Id> setRecordIds = this.mapProcessInstance.keySet();

        Set<Id> setaccountIds = new Set<Id>();       
        Set<Id> setAVECIds  = new Set<Id>();       
        
        for (Id recordId : setRecordIds) {                
            String sObjectType = recordId.getSObjectType().getDescribe().getName();        

            switch on sObjectType {
                when 'Account' {		
                    setAccountIds.add(recordId);
                }	
                when 'Case' {		
                    setAVECIds.add(recordId);
                }               
            }
        }

        List<Account> lsAccount = new List<Account>();
        List<Case> lsCase       = new List<Case>();
        
        if (!setAccountIds.isEmpty()) lsAccount = [SELECT Id FROM Account WHERE Id IN : setAccountIds];
        if (!setAVECIds.isEmpty()) lsCase =     [SELECT Id, CaseNumber FROM Case WHERE Id  IN : setAVECIds];

        List<ApprovalObject> lsApprObject = new List<ApprovalObject> ();
        List<List<ApprovalObject>> lsofListApprObject   = new List<List<ApprovalObject>>();

        lsofListApprObject.add(this.buildRecordToApprove('Account', lsAccount));
        lsofListApprObject.add(this.buildRecordToApprove('Case', lsCase));

        return lsApprObject;        
    }

    private List<ApprovalObject> buildRecordToApprove (String sObjectTypeName, List<SObject> sObjectRecords) {                
        
        Map<Id, ApprovalObject> mapApprovalObject = new Map<Id, ApprovalObject>();

        List<ApprovalObject> lsApprObject   = new List<ApprovalObject>();

        if (sObjectTypeName == 'Account') {
            for (sObject account : sObjectRecords) {

                ApprovalObject apprObject = new ApprovalObject();

                apprObject.recordId = account.Id;  
                apprObject.sObjectName = 'Account';   
                apprObject.currentApprover = this.mapProcessInstance.get(account.Id).WorkItems[0].Id;   
                apprObject.submittedByName = this.mapProcessInstance.get(account.Id).SubmittedBy.Name;               
                mapApprovalObject.put(account.Id, apprObject);  
            }                       
        }  

        if (sObjectTypeName == 'Case') {
            for (sObject avec : sObjectRecords) {

                ApprovalObject apprObject = new ApprovalObject();

                apprObject.recordId = avec.Id;     
                apprObject.sObjectName = 'Case';                       
                apprObject.submittedByName = this.mapProcessInstance.get(avec.Id).SubmittedBy.Name;                  
                mapApprovalObject.put(avec.Id, apprObject);       
            }                      
        }        

        lsApprObject.addAll(mapApprovalObject.values());    

        return lsApprObject;  
    }

}
