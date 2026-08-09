async function loadWeather() {

    // Get today's date in local time (Lewis Center, Ohio)
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    const today = `${year}-${month}-${day}`;

    const url =
        `https://api.openweathermap.org/data/3.0/onecall/day_summary` +
        `?lat=${CONFIG.latitude}` +
        `&lon=${CONFIG.longitude}` +
        `&date=${today}` +
        `&appid=${CONFIG.apiKey}` +
        `&units=${CONFIG.units}`;

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(
                `OpenWeather error: ${response.status} ${response.statusText}`
            );
        }

        const weather = await response.json();

        // OpenWeather returns daily precipitation in millimeters.
        // Convert millimeters to inches.
        const rainMm =
            weather.precipitation &&
            typeof weather.precipitation.total === "number"
                ? weather.precipitation.total
                : 0;

        const rainToday = rainMm / 25.4;

        // Display today's accumulated rainfall
        document.getElementById("rainValue").innerHTML =
            rainToday.toFixed(2) + '"';

        // Gauge scale
        const maxRain = 2.0;

        const percent =
            Math.min(rainToday / maxRain, 1);

        const tubeHeight =
            percent * 165;

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

        // Update time
        document.getElementById("updated").innerHTML =
            "Updated " +
            now.toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit"
            });

        console.log(
            `Today's rain: ${rainToday.toFixed(2)} inches`
        );

    }
    catch (err) {

        console.error(err);

        document.getElementById("updated").innerHTML =
            "Weather update failed";

    }
}


// Load immediately
loadWeather();


// Refresh according to config.js
setInterval(
    loadWeather,
    CONFIG.refreshMinutes * 60 * 1000
);
