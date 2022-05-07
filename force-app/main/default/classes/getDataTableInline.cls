public class getDataTableInline {
    
    @AuraEnabled
    public static List<Account> getAccount(String searchKey){
        try {
            if (searchKey == null || searchKey == '') {
                return [SELECT Id, Name, Phone, LastModifiedDate FROM Account ORDER BY LastModifiedDate DESC LIMIT 20];
            } else {
                String name =  + searchKey + '%';
                return [SELECT Id, Name, Phone, LastModifiedDate FROM Account WHERE name LIKE :name];  
            }       
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static void updateAccount(List<Account> lsAccount){
        try {
            update lsAccount;
            
        } catch (DmlException  e) {
            throw new AuraHandledException(e.getDmlMessage(0));
        }
        catch (Exception e) {
            throw new AurahandledException('Error Details : ' + e.getMessage());
        }
    }      
    
}