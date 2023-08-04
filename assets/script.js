let resultsContainer = $("#resultsContainer");
let searchBtn = $("#searchButton");

let cityName;

let latitudeEl;
let longitudeEl;
let apiKey = "d9dc192660aded560ce44b031b481711";

let weatherURL;

function getWeather (cityName) {
    let encodedCityName = encodeURIComponent(cityName);
    let obtainCoordinates = `https://api.openweathermap.org/geo/1.0/direct?q=${encodedCityName}&limit=1&appid=${apiKey}`;


    let latitudeEl = "";
    let longitudeEl = "";

    fetch(obtainCoordinates, {
        method: 'GET'
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // if (data && data.length > 0) {
                latitudeEl = data[0].lat;
                longitudeEl = data[0].lon;
                
                console.log('Latitude:', latitudeEl);
                console.log('Longitude:', longitudeEl);

            // .catch(function(error) {
            //     console.error('Data array is empty or undefined.');
        })

        const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitudeEl}&lon=${longitudeEl}&appid=${apiKey}`;

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

    

    // const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitudeEl}&lon=${longitudeEl}&appid=${apiKey}`;

    // fetch(weatherURL, {
    //     method: 'GET'
    // })
    //     .then(function (response) {
    //         return response.json();
    //     })
    //     .then(function (data) {
    //         console.log(data);
    //     })
    //     .catch(function(error) {
    //         console.error("Error fetching weather data from coordinates", error);
    //     })
    };


searchBtn.on("click", function() {
    cityName = $("#cityInput").val();
    getWeather(cityName);
});


// Example code to fetch data from OpenWeatherMap API
// fetch('your_openweathermap_api_url_here')
//   .then(response => response.json())
//   .then(data => {
//     // Check if the data array is not empty
//     if (data && data.length > 0) {
//       // Access latitude and longitude from the first element of the data array
//       const latitudeEl = data[0].lat;
//       const longitudeEl = data[0].lon;

//       // Do something with the latitude and longitude values
//       console.log('Latitude:', latitudeEl);
//       console.log('Longitude:', longitudeEl);
//     } else {
//       console.error('Data array is empty or undefined.');
//     }
//   })
//   .catch(error => {
//     console.error('Error fetching data from OpenWeatherMap API:', error);
//   });