let resultsContainer = $(".resultsContainer");
let searchBtn = $("#searchButton");
//let encodedCityName = encodeURIComponent(cityName);
let cityName;

//let latitudeEl = {"$lat"};
//let longitudeEl = {"$lon"};
let apiKey = "aebb3a771712c2ba6165d4a2e0e458a5";

//let weatherURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitudeEl + "&lon=" + longitudeEl + "&appid=" + apiKey;
//let obtainCoordinates = "https://api.openweathermap.org/geo/1.0/direct?q=" + encodedCityName + "&limit=2&appid=" + apiKey;

function getWeather (cityName) {
    let encodedCityName = encodeURIComponent(cityName);
    let obtainCoordinates = `https://api.openweathermap.org/geo/1.0/direct?q=${encodedCityName}&limit=2&appid=${apiKey}`;


    fetch(obtainCoordinates, {
        method: 'GET'
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
        .catch(function(error) {
            console.error("Error fetching weather data:", error);
        })
};


searchBtn.on("click", function() {
    cityName = $("#cityInput").val();
    getWeather(cityName);
});