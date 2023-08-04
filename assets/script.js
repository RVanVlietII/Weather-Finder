let resultsContainer = $("#resultsContainer");
let searchBtn = $("#searchButton");
//let encodedCityName = encodeURIComponent(cityName);
let cityName;

let latitudeEl;
let longitudeEl;
let apiKey = "d9dc192660aded560ce44b031b481711";

// let weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat={latitudeEl}&lon={longitudeEl}&appid={apiKey}`;
//let obtainCoordinates = "https://api.openweathermap.org/geo/1.0/direct?q=" + encodedCityName + "&limit=2&appid=" + apiKey;
let weatherURL;

function getWeather (cityName) {
    let encodedCityName = encodeURIComponent(cityName);
    let obtainCoordinates = `https://api.openweathermap.org/geo/1.0/direct?q=${encodedCityName}&limit=1&appid=${apiKey}`;


    fetch(obtainCoordinates, {
        method: 'GET'
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            // if (!Array.isArray(data) || data.length === 0 || !data[0].lat) {
            //     console.error("City not found or invalid response from the coordinates API.");
            //     return;

            // }
        })
        // .catch(function(error) {
        //     console.error("Error fetching weather data:", error);
        // })

    
    
    
    .then(function (data) {

        console.log(data);
    
        latitudeEl = data[0].lat;
        longitudeEl = data[0].lon;

    let weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat={latitudeEl}&lon={longitudeEl}&appid={apiKey}`;

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
    })
};


searchBtn.on("click", function() {
    cityName = $("#cityInput").val();
    getWeather(cityName);
});