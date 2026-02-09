const resolvedAddress = document.getElementById('resolvedAddress');
const conditions = document.getElementById('conditions');
const description = document.getElementById('description');
const temp = document.getElementById('temp');
const gif = document.getElementById('gif');
const icon = document.getElementById('icon');

export function render(weather, format) {
    loadIcon(weather.icon).then(result => {
        console.log(result);
        icon.src = result;
    });

    loadGif(weather.conditions);   

    resolvedAddress.textContent = weather.resolvedAddress;
    conditions.textContent = weather.conditions;
    description.textContent = weather.description;

    if (format === 'fahrenheit') {
        temp.textContent = `${weather.fahrenheit}°F`;
    } else {
        temp.textContent = `${weather.celsius}°C`;
    }
}

async function loadGif(weather) {
    try {
        const response = await fetch(
            `https://api.giphy.com/v1/gifs/translate?api_key=nAF1u1OjJoALsK8vcBtXs5WheYsQNbly&s=weather ${weather}`);
        const gifData = await response.json();
        gif.src = gifData.data.images.original.url;
    } catch (err) {
        console.log(err);
    }
}

async function loadIcon(weather) {
    try {
        const iconModule = await import(`./icons/${weather}.svg`);
        return iconModule.default;
    } catch (err) {
        console.log(err);
    }
}








