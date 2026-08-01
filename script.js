async function loadWeather() {

    const url =
        `https://api.openweathermap.org/data/2.5/weather?lat=${CONFIG.latitude}` +
        `&lon=${CONFIG.longitude}` +
        `&appid=${CONFIG.apiKey}` +
        `&units=${CONFIG.units}`;

    try {

        const response = await fetch(url);
        const weather = await response.json();

        document.getElementById("temp").innerHTML =
            Math.round(weather.main.temp) + "°F";

        document.getElementById("humidity").innerHTML =
            weather.main.humidity + "%";

        document.getElementById("wind").innerHTML =
            Math.round(weather.wind.speed) + " mph";

        document.getElementById("status").innerHTML =
            weather.weather[0].description;

        // Rain amount if available
        let rainToday = 0;

        if (weather.rain && weather.rain["1h"]) {
            rainToday = weather.rain["1h"] / 25.4;
        }

        document.getElementById("rainValue").innerHTML =
            rainToday.toFixed(2) + '"';
const maxRain = 2.0;

let percent = Math.min(rainToday / maxRain, 1);

let tubeHeight = percent * 165;

document.getElementById("waterLevel")
.setAttribute(
    "y",
    185 - tubeHeight
);

document.getElementById("waterLevel")
.setAttribute(
    "height",
    tubeHeight
);
        document.getElementById("updated").innerHTML =
            "Updated " +
            new Date().toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit"
            });

    }
    catch (err) {

        console.error(err);

        document.getElementById("status").innerHTML =
            "Unable to load weather";

    }

}

loadWeather();

setInterval(
    loadWeather,
    CONFIG.refreshMinutes * 60 * 1000
);
