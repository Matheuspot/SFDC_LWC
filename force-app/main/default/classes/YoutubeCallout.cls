public class YoutubeCallout {
  
    public static void getChannelInfo(){
        HTTP http = new  HTTP();
        HttpRequest request = new HttpRequest();
    
        request.setEndpoint('https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=UCBlYlH3l9otvgEqcJx-wSGQ&key=AIzaSyAOZto0M8iFFPbymWr-dvgjfPh-gVYjdrA');
        request.setMethod('GET');

        HttpResponse response = http.send(request);
    
        if (response.getStatusCode() == 200) {
            
            String uniqueValue = response.getBody().substringBetween('"title": "', '",');            
            System.debug('Unique Value Result: ' + uniqueValue);

            YoutubeAPIWrapper responseWrapper = YoutubeAPIWrapper.parse(response.getBody());   
            
            if (responseWrapper.items != null && !responseWrapper.items.isEmpty()) {

                for (Integer i = 0; i < responseWrapper.items.size(); i++) {

                    YoutubeAPIWrapper.Items item    = responseWrapper.items.get(i);
                    Boolean hiddenSub               = item.Statistics.hiddenSubscriberCount;
                    String subsCounts               = item.Statistics.subscriberCount;
                    String viewCount                = item.Statistics.viewCount;
                    String videoCount               = item.Statistics.videoCount;
                    String channelTitle             = item.snippet.title;
                    String description              = item.snippet.description;
                    String publishedDate            = item.snippet.publishedAt;
                    String channelId                = item.id;

                    System.debug(
                                'Is subscribers number hidden? '     + hiddenSub     +   ' \n ' +
                                'Number of Subscribers: '            + subsCounts    +   ' \n ' +
                                'Number of Views: '                  + viewCount     +   ' \n ' + 
                                'Number of Videos: '                 + videoCount    +   ' \n ' +
                                'Channel Title: '                    + channelTitle  +   ' \n ' +
                                'Channel Description: '              + description   +   ' \n ' +
                                'Publication Date: '                 + publishedDate +   ' \n ' + 
                                'Channel Id : '                      + channelId   
                    );                                                        
                }
            }   
        }    
    }
}