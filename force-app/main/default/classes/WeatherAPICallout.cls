public class WeatherAPICallout {
  
    public static void getWeatherInfo() {

        HTTP http = new HTTP();
        HTTPRequest request = new HttpRequest();

        String appId = '8480e68c4c7e2143b8b17c1f6b8b2009';
        String cityName = 'São+Paulo';       

        request.setEndpoint('https://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid='+appId);
        request.setMethod('GET');

        HttpResponse response = http.send(request);

        if (response.getStatusCode() != 200) return;  

            WeatherAPIWrapper result = WeatherAPIWrapper.parse(response.getBody());
            String mainWeather, weatherDescription = '';

            for (Integer i = 0; i < result.weather.size(); i++) {
                WeatherAPIWrapper.Weather weather = result.weather.get(i);
                mainWeather             =   weather.main;
                weatherDescription      =   weather.description;
            }    
            
            String countryName          =   result.sys.country;
            String city                 =   result.name;           
            Decimal currentTemp         =   result.main.temp;
            Decimal feelsLikeTemp       =   result.main.feels_like;
            Decimal tempMin             =   result.main.temp_min;
            Decimal tempMax             =   result.main.temp_max;
            Decimal humidity            =   result.main.humidity;

            List<String> lsValues = new List<String>{
                'Country Name : '       +   countryName, 
                'City Name: '           +   city,
                'Weather: '             +   mainWeather, 
                'Weather Description: ' +   weatherDescription, 
                'Temperature: '         +   String.valueOf(currentTemp), 
                'Sensation: '           +   String.valueOf(feelsLikeTemp), 
                'Min.Temperature: '     +   String.valueOf(tempMin), 
                'Max.Temperature: '     +   String.valueOf(tempMax), 
                'Humidity: '            +   String.valueOf(humidity)
            };

            System.debug(lsValues);       
    }
}