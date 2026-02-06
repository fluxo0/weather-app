const resolvedAddress = document.getElementById('resolvedAddress');
const conditions = document.getElementById('conditions');
const description = document.getElementById('description');
const temp = document.getElementById('temp');
const formatBtn = document.getElementById('format-btn');
const img = document.querySelector('img');

export function render(weather) {
    const fahrenheit = weather.fahrenheit;
    const celsius = weather.celsius;

    resolvedAddress.textContent = weather.resolvedAddress;
    conditions.textContent = weather.conditions;
    description.textContent = weather.description;
    
    if (formatBtn.className === 'fahrenheit') {
        temp.textContent = `${fahrenheit}°F`;
    } else {
        temp.textContent = `${celsius}°C`;
    }

    getGif(weather.conditions);
    
}

async function getGif(weather) {
    try {
        const response = await fetch(
            `https://api.giphy.com/v1/gifs/translate?api_key=nAF1u1OjJoALsK8vcBtXs5WheYsQNbly&s=weather ${weather}`);
        const gifData = await response.json();
        img.src = gifData.data.images.original.url;
    } catch (err) {
        console.log(err);
    }
}

formatBtn.addEventListener('click', () => {
    if (formatBtn.className === 'fahrenheit') {
        formatBtn.className = 'celsius';
        formatBtn.textContent = '°F';
    } else {
        formatBtn.className = 'fahrenheit';
        formatBtn.textContent = '°C';
    }
});