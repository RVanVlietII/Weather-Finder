let resultsContainer = $("#resultsContainer");
let searchBtn = $("#searchButton");

let cityName;

let apiKey = "d9dc192660aded560ce44b031b481711";

let weatherURL;


function getWeather (cityName) {
    let encodedCityName = encodeURIComponent(cityName);
    let obtainCoordinates = `https://api.openweathermap.org/geo/1.0/direct?q=${encodedCityName}&limit=1&appid=${apiKey}`;


    let latitudeEl;
    let longitudeEl;

    fetch(obtainCoordinates, {
        method: 'GET'
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            
                latitudeEl = data[0].lat;
                longitudeEl = data[0].lon;
                
                console.log('Latitude:', latitudeEl);
                console.log('Longitude:', longitudeEl);
                let weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitudeEl}&lon=${longitudeEl}&appid=${apiKey}`;

                fetch(weatherURL, {
                    method: 'GET'
                })
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        console.log(data);
                    })
                    .catch(function(error) {
                        console.error("Error fetching weather data from coordinates", error);
                    })
                .catch(function(error) {
                    console.error("Error fetching weather data:", error);
                })
            
        })

            .catch(function(error) {
                console.error('Data array is empty or undefined.');
        })

    };


searchBtn.on("click", function() {
    cityName = $("#cityInput").val();
    getWeather(cityName);
});


