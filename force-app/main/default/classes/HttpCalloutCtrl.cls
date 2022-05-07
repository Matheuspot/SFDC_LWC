public class HttpCalloutCtrl {

    @AuraEnabled
    public static map<String, Object> getCalloutResponseContents(String url) {

        Http h = new Http();
        HttpRequest req = new HttpRequest();

        req.setEndpoint(url);
        req.setMethod('GET');

        HttpResponse res = h.send(req);
        System.debug('Response: ' + res.getBody());
        Map<String, Object> mapResult = (Map<String, Object>)JSON.deserializeUntyped(res.getBody());
        System.debug('Map Results: ' + mapResult);
        return mapResult;
    }
}