const body = document.querySelector('body');
const resolvedAddress = document.getElementById('resolvedAddress');
const conditions = document.getElementById('conditions');
const description = document.getElementById('description');
const temp = document.getElementById('temp');
const gif = document.getElementById('gif');
const icon = document.getElementById('icon');

export function render(weather, format) {
    showContainers();

    loadIcon(weather.icon).then(result => {
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

    renderBackgroundColor(weather.celsius);
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

function renderBackgroundColor(celsius) {
    if (celsius <= 0) {
        body.style.setProperty('background-color', '#d0d0d0');
    } else if (celsius > 0 && celsius <= 20) {
        body.style.setProperty('background-color', '#3f3fff');
    } else if (celsius > 20 && celsius < 30) {
        body.style.setProperty('background-color', '#eeee61');
    } else {
        body.style.setProperty('background-color', '#f7ab20');
    }
}

function showContainers() {
    const leftCtnr = document.getElementById('left-container');
    leftCtnr.style.setProperty('display', 'flex');
    const rightCtnr = document.getElementById('right-container');
    rightCtnr.style.setProperty('display', 'flex');
}








