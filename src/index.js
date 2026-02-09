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
const formatBtn = document.getElementById('format-btn');

const weather = {};

submit.addEventListener('click', (e) => {
    e.preventDefault();
    getWeather(search.value);
});

formatBtn.addEventListener('click', () => {
    if (formatBtn.className === 'fahrenheit') {
        formatBtn.className = 'celsius';
        formatBtn.textContent = '°F';
    } else {
        formatBtn.className = 'fahrenheit';
        formatBtn.textContent = '°C';
    }

    if (Object.values(weather).length > 0) {
        render(weather, formatBtn.className);
    }
});

async function getWeather(location) {
    try {
        const response = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=9VDZNLC8LA3ZB2WS8V64FJ3KR&contentType=json`);
        const weatherData = await response.json();
        const weather = processJson(weatherData);
        render(weather, formatBtn.className);
    } catch (err) {
        console.log(err);
    }
}

function processJson(data) {
    const fahrenheitTemp = data.currentConditions.temp;
    const celsiusTemp = (fahrenheitTemp - 32) / 1.8;
    
    weather.resolvedAddress = data.resolvedAddress;
    weather.description = data.description;
    weather.conditions = data.currentConditions.conditions;
    weather.fahrenheit = Math.round(fahrenheitTemp);
    weather.celsius = Math.round(celsiusTemp);
    weather.icon = data.currentConditions.icon;

    return weather;
}




