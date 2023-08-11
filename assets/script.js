let resultsContainer = $("#resultsContainer");
let searchBtn = $("#searchButton");

let cityName;

let apiKey = "ddb416582491d4c4a15f591564de9f92";

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
                        console.log(data.list[0].dt_txt);
                        console.log(data.list[0].weather[0].icon);
                        console.log(data.list[0].main.temp);
                        console.log(data.list[0].main.humidity);
                        console.log(data.list[0].wind.speed);
                
                        let propertiesByDay = [];

                        for (let i=0; i < 5; i++) {
                            const property1 = data.list[i].dt_txt; //"Value1_" + i;
                            const property2 = data.list[i].weather[0].icon;//"Value2_" + i;
                            const property3 = data.list[i].main.temp;//"Value3_" + i;
                            const property4 = data.list[i].main.humidity;//"Value4_" + i;
                            const property5 = data.list[i].wind.speed;//(have to convert temp to mph) "Value5_" + i;

                        propertiesByDay.push({
                            property1,
                            property2,
                            property3,
                            property4,
                            property5
                        });
                    }

                    propertiesByDay.forEach((dayProperties, index) => {
                        const resultsDiv = $("#results" + (index + 1));
                        // const cardTitle = resultsDiv.find('.card-title');
                        const cardText = resultsDiv.find('.card-text');
                        const cardTitle = resultsDiv.find('.card-title');
                        // cardTitle.text(`Weather Data for Day ${index + 1}`);
                        const iconurl = "http://openweathermap.org/img/w/" + dayProperties.property2 + ".png";
                        // $('#wicon').attr('src', property2);

                        cardTitle.html(`
                            <p>Date: ${dayProperties.property1}</p>
                            <img id="wicon" src="${iconurl}" alt="Weather Icon">
                        `)

                        cardText.html(` 
                
                        <p>Temperature: ${dayProperties.property3}</p>
                        <p>Humidity: ${dayProperties.property4}</p>
                        <p>Wind Speed: ${dayProperties.property5}</p>`)

                    })
                    
                    resultsContainer.append(resultsDiv);
                    propertiesByDay.forEach((dayProperties, index) => {
                        updateResultDiv(index, dayProperties);

                   
                    })
                    .catch(function(error) {
                        console.error("Error fetching weather data from coordinates", error);
                    })
                })
            

        })
    };



// searchBtn.on("click", function() {
//     cityName = $("#cityInput").val();
//     getWeather(cityName);
// });

searchBtn.on("click", function(event) {
    event.preventDefault()
    cityName = $("#cityInput").val();
    getWeather(cityName);
});