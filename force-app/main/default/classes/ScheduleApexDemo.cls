public class ScheduleApexDemo implements Schedulable {
    public void execute(SchedulableContext SC) {
        Database.executeBatch(new ScheduleBatch());                         
    }
}