public class AnimalsCallouts {   

    public static void getAnimals() {

    HTTP http = new HTTP();
    HttpRequest request = new HttpRequest();
    
    request.setEndpoint('https://th-apex-http-callout.herokuapp.com/animals');
    request.setMethod('GET');

    HttpResponse response = http.send(request);
        if (response.getStatusCode() == 200) {

            Map<String, Object> mapAnimals = (Map<String, Object>)JSON.deserializeUntyped(response.getBody());  
            List<Object> lsAnimals = (List<Object>) mapAnimals.get('animals');
   
            for (Object animal : lsAnimals) {
                System.debug(animal);
            }
        }

    }

    public static void getAnimalsById(String animalId) {

        HTTP http = new HTTP();
        HttpRequest request = new HttpRequest();

        request.setEndpoint('https://th-apex-http-callout.herokuapp.com/animals/'+animalId);
        request.setMethod('GET');

        HttpResponse response = http.send(request);

        if (response.getStatusCode() == 200) {
            System.debug(response.getBody());
        } else {
            System.debug(response.getStatusCode() + ' ' + response.getStatus());            
        }
    }

    public static void setAnimals() {

        HTTP http = new HTTP();
        HttpRequest request = new HttpRequest();

        request.setEndpoint('https://th-apex-http-callout.herokuapp.com/animals');
        request.setMethod('POST');
        request.setHeader('Content-Type', 'Application/JSON;charset = UTF-8');
        request.setBody('{"name": "mighty moose"}');

        HttpResponse response = http.send(request);

        if (response.getStatusCode() != 201) {
            System.debug('The status code returned was not expected: ' +
                response.getStatusCode() + ' ' + response.getStatus());
        } else {
            System.debug(response.getBody());
        }  
    }   
}