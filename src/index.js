import "./styles.css";

// - search for location
// - toggle between Fahrenheit or Celsius
// - background color based on data
// - Giphy API imgs based on weather
// - use promeises and async/await

// take location function
// return weather data from location function
// console.log it

const search = document.getElementById('search');
const submit = document.getElementById('submit');
const img = document.querySelector('img');

// let fahrenheit, celsius;

submit.addEventListener('click', (e) => {
    e.preventDefault();
    getWeather(search.value);
});

async function getWeather(location) {
    const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=9VDZNLC8LA3ZB2WS8V64FJ3KR&contentType=json`);
    const weatherData = await response.json();
    processJson(weatherData);

    // const description = weatherData.description;
    // const conditions = weatherData.currentConditions.conditions;
    // const fahrenheitTemp = weatherData.currentConditions.temp;
    // const celsiusTemp = (fahrenheitTemp - 32) / 1.8;

    // console.log(weatherData);
    // console.log(description);
    // console.log(conditions);
    // console.log(Math.round(fahrenheitTemp));
    // console.log(Math.round(celsiusTemp));
}

// async function getGif(weather) {
//     const response = await fetch(
//         `https://api.giphy.com/v1/gifs/translate?api_key=nAF1u1OjJoALsK8vcBtXs5WheYsQNbly&s=weather ${weather}`);
//     const gifData = await response.json();
//     img.src = gifData.data.images.original.url;  

//     console.log(gifData);
// }

function processJson(data) {
    const fahrenheitTemp = data.currentConditions.temp;
    const celsiusTemp = (fahrenheitTemp - 32) / 1.8;

    const weather = {
        description: data.description,
        conditions: data.currentConditions.conditions,
        fahrenheit: Math.round(fahrenheitTemp),
        celsius: Math.round(celsiusTemp),
    }
    console.log(weather);

    // return weather;
}

// getWeather('São Paulo');
// getGif('Cloudy');

