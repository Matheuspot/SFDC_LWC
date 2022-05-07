public class ScheduleQueue implements Schedulable {
    public void execute(SchedulableContext sc) {
        System.enqueueJob(new QueueableApexDemo());
    }
}