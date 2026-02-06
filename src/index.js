import "./styles.css";
import { render } from './render.js';

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

submit.addEventListener('click', (e) => {
    e.preventDefault();
    getWeather(search.value);
});

async function getWeather(location) {
    try {
        const response = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=9VDZNLC8LA3ZB2WS8V64FJ3KR&contentType=json`);
        const weatherData = await response.json();
        const weather = await processJson(weatherData);
        render(weather);
    } catch (err) {
        console.log(err);
    }
}

function processJson(data) {
    const fahrenheitTemp = data.currentConditions.temp;
    const celsiusTemp = (fahrenheitTemp - 32) / 1.8;
    
    const weather = {
        resolvedAddress: data.resolvedAddress,
        description: data.description,
        conditions: data.currentConditions.conditions,
        fahrenheit: Math.round(fahrenheitTemp),
        celsius: Math.round(celsiusTemp),
    };

    return weather;
}



