public class QueueableApexDemo implements Queueable {
    public void execute(QueueableContext qc) {
        List<Account> accList = [SELECT Id, Name FROM Account];
        for (Account acc : accList) {
            acc.Name = 'Batch update - ' + acc.Name;
        }
        update accList;
    }
}