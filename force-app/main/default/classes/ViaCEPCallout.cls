public class ViaCEPCallout {

    public class CepAddress {
        String cep, rua, bairro, logradouro, localidade, uf; 
    }
    
    @AuraEnabled
    public static ViaCEPWrapper getAddress(String CEP) {

        HTTP http = new HTTP();
        HttpRequest request = new HttpRequest();

        request.setEndpoint('https://viacep.com.br/ws/'+CEP+'/json/');
        request.setMethod('GET');

        HttpResponse response = http.send(request);
        ViaCEPWrapper responseWrapper   =   ViaCEPWrapper.parse(response.getBody());  

        if (response.getStatusCode() == 200) {                             
            System.debug('OK!');                            
        } else{
            System.debug('NOK!');   
        }     
        return responseWrapper;     
    }

    @AuraEnabled
    public static boolean updateAddress (String accountId, String jsonCEP) {

        try {            
            ViaCEPWrapper responseWrapper   =   ViaCEPWrapper.parse(jsonCEP);
            Account acc = [
                            SELECT Id, BillingStreet, BillingCity, BillingState, BillingPostalCode 
                            FROM Account 
                            WHERE Id =: AccountId
                        ];

            acc.BillingStreet       =   responseWrapper.logradouro;
            acc.BillingCity         =   responseWrapper.localidade;
            acc.BillingState        =   responseWrapper.uf;
            acc.BillingPostalCode   =   responseWrapper.cep;

        update acc;
            
        } catch (Exception e) {
            System.debug(e.getLineNumber());
            System.debug(e.getMessage());
            return false;
        }
        return false;
    }
}