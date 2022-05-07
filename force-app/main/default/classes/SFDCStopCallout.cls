public class SFDCStopCallout {   

    
    public static void getBlogs(Id contactId) {       
       
        HTTP http = new HTTP();
        HttpRequest request = new HttpRequest();

        request.setEndpoint('https://sfdcstop.herokuapp.com/blogs');
        request.setMethod('GET');

        HttpResponse response = http.send(request);

        if (response.getStatusCode() != 200) return;
        SFDCStopBlogsWrapper responseWrapper = SFDCStopBlogsWrapper.parse(response.getBody());    

        String blogResult, aux;

        if (responseWrapper.blogs != null && !responseWrapper.blogs.isEmpty()) {
            for (Integer i = 0; i < responseWrapper.blogs.size(); i++) {
                SFDCStopBlogsWrapper.Blogs blog = responseWrapper.blogs.get(i);
                aux = aux + '\n' + 'Title: ' +  blog.title + '\n URL: '+ blog.url + '\n';
                blogResult = aux;                                        
            }
        }            
          
        Contact oldContact = [SELECT Id FROM Contact WHERE Id =: contactId];
        oldContact.Description = blogResult;     
             
        update oldContact;
    }

    public static HttpResponse getBlogs() {       
       
        HTTP http = new HTTP();
        HttpRequest request = new HttpRequest();

        request.setEndpoint('https://sfdcstop.herokuapp.com/blogs');
        request.setMethod('GET');

        HttpResponse response = http.send(request);

        if (response.getStatusCode() != 200) return response;
        SFDCStopBlogsWrapper responseWrapper = SFDCStopBlogsWrapper.parse(response.getBody());    

        String blogResult, aux;

        if (responseWrapper.blogs != null && !responseWrapper.blogs.isEmpty()) {
            for (Integer i = 0; i < responseWrapper.blogs.size(); i++) {
                SFDCStopBlogsWrapper.Blogs blog = responseWrapper.blogs.get(i);
                aux = aux + '\n' + 'Title: ' +  blog.title + '\n URL: '+ blog.url + '\n';
                blogResult = aux;                                        
            }
        }   
        return response;             
    }
    
    public static void getChangedContacts(List<Contact> newData, Map<Id, Contact> oldData) {

        for (Contact newContact : newData) {            
            Contact oldContact = oldData.get(newContact.Id);

            if (oldContact.LastName != newContact.LastName) {
                SFDCStopCallout.invokeFutureMethod(newContact.Id);
            }           
        }
    }

    @future(callout = true)
    public static void invokeFutureMethod(Id contactId) {
        SFDCStopCallout.getBlogs(contactId);
    }
}