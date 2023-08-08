let resultsContainer = $("#resultsContainer");
let searchBtn = $("#searchButton");

let cityName;

let apiKey = "19b8c7662cda00a61cae55066965dbf7";

let weatherURL;



// function fetchedData(property1, property2, property3, property4, property5) {
//     // Create an unordered list element
//     const resultsDiv = $('<div>');
//         // let header = $('<h2>');
//         //     header.text("The Weather");
    

//     resultsDiv.html(`
//     <h2>The Weather</h2>
//     <p>Property 1: ${property1}</p>
//     <p>Property 2: ${property2}</p>
//     <p>Property 3: ${property3}</p>
//     <p>Property 4: ${property4}</p>
//     <p>Property 5: ${property5}</p>
// `);

//     resultsContainer.append(resultsDiv);
// }


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
                        // //fetchedData(data, property1, property2, property3, property4, property5);
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

                        // cardTitle.text(`Weather Data for Day ${index + 1}`);
                        cardText.html(` 
                
                        <p>Property 1: ${dayProperties.property1}</p>
                        <p>Property 2: ${dayProperties.property2}</p>
                        <p>Property 3: ${dayProperties.property3}</p>
                        <p>Property 4: ${dayProperties.property4}</p>
                        <p>Property 5: ${dayProperties.property5}</p>`)

                    })
                    
                    resultsContainer.append(resultsDiv);
                    propertiesByDay.forEach((dayProperties, index) => {
                        updateResultDiv(index, dayProperties);

                    // resultsContainer.append(resultsDiv);
                    //     fetchedData(property1, property2, property3, property4, property5);
                    })
                    .catch(function(error) {
                        console.error("Error fetching weather data from coordinates", error);
                    })
                })
            

        })
    };




// Your current code snippet with modifications to call the fetchedData function
// ... (fetch loop code)

// In the fetch loop, instead of calling console.log(data), call fetchedData with appropriate properties and containerIndex
// for (let i = 0; i < weatherURLs.length; i++) {
//     fetch(weatherURLs[i], {
//         method: 'GET'
//     })
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
        // Simulate five data properties for each set of data
        // const property1 = "Value1_" + i;
        // const property2 = "Value2_" + i;
        // const property3 = "Value3_" + i;
        // const property4 = "Value4_" + i;
        // const property5 = "Value5_" + i;

        // Call fetchedData with the properties and the containerIndex (i+1)
//         fetchedData(data, property1, property2, property3, property4, property5, i + 1);
//     })
//     .catch(function(error) {
//         console.error("Error fetching weather data from coordinates", error);
//     });
// }

searchBtn.on("click", function() {
    cityName = $("#cityInput").val();
    getWeather(cityName);
});