let resultsContainer = $("#resultsContainer");
let searchBtn = $("#searchButton");

let cityName;

let apiKey = "b8c6ddc1cf07f554cdb5b7d524103a5b";

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
                        fetchedData(data, property1, property2, property3, property4, property5);
                    })
                    .catch(function(error) {
                        console.error("Error fetching weather data from coordinates", error);
                    })
                    processFetchedData(fetchedData);
                })
            
        

            .catch(function(error) {
                console.error('Data array is empty or undefined.');
        })

    };

// Modify the fetchedData function to display the data in separate result containers
// function fetchedData(data, property1, property2, property3, property4, property5, containerIndex) {
    // Create an unordered list element
    // const list = document.createElement('ul');

    // Create list items for each property and add them to the list
//     const listItem1 = document.createElement('li');
//     listItem1.textContent = `Property 1: ${property1}`;
//     list.appendChild(listItem1);

//     const listItem2 = document.createElement('li');
//     listItem2.textContent = `Property 2: ${property2}`;
//     list.appendChild(listItem2);

//     const listItem3 = document.createElement('li');
//     listItem3.textContent = `Property 3: ${property3}`;
//     list.appendChild(listItem3);

//     const listItem4 = document.createElement('li');
//     listItem4.textContent = `Property 4: ${property4}`;
//     list.appendChild(listItem4);

//     const listItem5 = document.createElement('li');
//     listItem5.textContent = `Property 5: ${property5}`;
//     list.appendChild(listItem5);

//     // Append the list to the respective container based on the containerIndex
//     const resultContainer = document.getElementById(`resultContainer${containerIndex}`);
//     resultContainer.appendChild(list);

//     // Process the fetched data as needed
//     console.log("Fetched data:", data);
// }

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
//         // Simulate five data properties for each set of data
//         const property1 = "Value1_" + i;
//         const property2 = "Value2_" + i;
//         const property3 = "Value3_" + i;
//         const property4 = "Value4_" + i;
//         const property5 = "Value5_" + i;

//         // Call fetchedData with the properties and the containerIndex (i+1)
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