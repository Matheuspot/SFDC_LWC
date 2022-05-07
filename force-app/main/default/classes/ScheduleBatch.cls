public class ScheduleBatch implements Database.Batchable<SObject> {
    public Database.QueryLocator start(Database.BatchableContext bc) {
        return Database.getQueryLocator('SELECT Id, Name FROM Account');
    }

    public void execute (Database.BatchableContext bc, List<Account> accList) {
        for (Account acc : accList) {
            acc.Name = 'Batch update - ' + acc.Name;
        }
        update accList;
    }

    public void finish (Database.BatchableContext bc) {
        System.debug('It ran!');
    }
}