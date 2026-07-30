/*
==========================================================
Larry's Rain Center
GitHub Pages + DAKboard
==========================================================
*/

const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";

async function loadWeather() {

    if (
        CONFIG.apiKey === "" ||
        CONFIG.apiKey === "a198ca797648bbd83e3892251c3385b9"
    ) {
        showMessage("Please add your OpenWeather API key to config.js");
        return;
    }

    try {

        const url =
            `${WEATHER_URL}?lat=${CONFIG.latitude}` +
            `&lon=${CONFIG.longitude}` +
            `&units=${CONFIG.units}` +
            `&appid=${CONFIG.apiKey}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Weather service unavailable");
        }

        const weather = await response.json();

        updateScreen(weather);

    }
    catch (error) {

        console.error(error);

        showMessage("Unable to retrieve weather.");

    }

}

function updateScreen(data) {

    document.getElementById("temperature").textContent =
        Math.round(data.main.temp);

    document.getElementById("feelsLike").textContent =
        Math.round(data.main.feels_like) + "°";

    document.getElementById("humidity").textContent =
        data.main.humidity + "%";

    document.getElementById("description").textContent =
        capitalize(data.weather[0].description);

    document.getElementById("wind").textContent =
        Math.round(data.wind.speed) +
        " mph " +
        degreesToCompass(data.wind.deg);

    document.getElementById("pressure").textContent =
        (data.main.pressure * 0.02953).toFixed(2) +
        " inHg";

    document.getElementById("visibility").textContent =
        (data.visibility / 1609.34).toFixed(1) +
        " mi";

    document.getElementById("sunrise").textContent =
        formatTime(data.sys.sunrise);

    document.getElementById("sunset").textContent =
        formatTime(data.sys.sunset);

    document.getElementById("weatherIcon").src =
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

    document.getElementById("weatherIcon").alt =
        data.weather[0].description;

    // Dew point not available from Current Weather API
    document.getElementById("dewpoint").textContent = "--";

    // Chance of rain not available from Current Weather API
    document.getElementById("pop").textContent = "--";

    // Rainfall today
    if (data.rain && data.rain["1h"]) {
        document.getElementById("rainToday").textContent =
            (data.rain["1h"] / 25.4).toFixed(2) + "\"";
    } else {
        document.getElementById("rainToday").textContent = "0.00\"";
    }

    document.getElementById("lastUpdated").textContent =
        "Updated " + new Date().toLocaleTimeString();

}

function formatTime(unixTime) {

    return new Date(unixTime * 1000).toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit"
    });

}

function capitalize(text) {

    return text.replace(/\b\w/g, c => c.toUpperCase());

}

function showMessage(message) {

    document.getElementById("description").textContent = message;

}

function degreesToCompass(degrees) {

    const directions = [
        "N","NNE","NE","ENE",
        "E","ESE","SE","SSE",
        "S","SSW","SW","WSW",
        "W","WNW","NW","NNW"
    ];

    return directions[
        Math.round(degrees / 22.5) % 16
    ];

}

// Initial load
loadWeather();

// Refresh automatically
setInterval(loadWeather, CONFIG.refreshMinutes * 60 * 1000);
