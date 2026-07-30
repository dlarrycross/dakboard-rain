/*
=========================================
Larry's Rain Center v1.0
=========================================
*/

const statusBox = document.getElementById("status");
const nextRainBox = document.getElementById("nextRain");
const hourlyBox = document.getElementById("hourly");
const updatedBox = document.getElementById("updated");

const API_URL =
`https://api.openweathermap.org/data/3.0/onecall?lat=${CONFIG.latitude}&lon=${CONFIG.longitude}&exclude=minutely,daily,alerts&units=${CONFIG.units}&appid=${CONFIG.apiKey}`;

async function loadWeather() {

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Weather download failed");
        }

        const data = await response.json();

        displayWeather(data);

    }

    catch (err) {

        console.error(err);

        statusBox.textContent = "Weather Error";

        nextRainBox.textContent =
            "Unable to retrieve forecast.";

    }

}

function displayWeather(data) {

    const hourly = data.hourly;

    //---------------------------------------
    // Current Rain Status
    //---------------------------------------

    const currentPop = hourly[0].pop || 0;

    if (currentPop >= 0.50) {

        statusBox.textContent = "🌧 Rain Expected";

    } else {

        statusBox.textContent = "☀ No Rain";

    }

    //---------------------------------------
    // Next Rain
    //---------------------------------------

    let found = false;

    for (let i = 0; i < hourly.length; i++) {

        if ((hourly[i].pop || 0) >= 0.30) {

            const time = new Date(hourly[i].dt * 1000);

            const label = time.toLocaleString([], {
                weekday: "short",
                hour: "numeric"
            });

            const percent = Math.round(hourly[i].pop * 100);

            nextRainBox.innerHTML =
                `<strong>Next Rain</strong><br>${label} (${percent}%)`;

            found = true;

            break;

        }

    }

    if (!found) {

        nextRainBox.innerHTML =
            "<strong>No rain expected</strong><br>Next 48 hours";

    }

    //---------------------------------------
    // Hourly Forecast
    //---------------------------------------

    hourlyBox.innerHTML = "";

    for (let i = 0; i < 6; i++) {

        const h = hourly[i];

        const time = new Date(h.dt * 1000);

        const hour = time.toLocaleTimeString([], {
            hour: "numeric"
        });

        const chance = Math.round((h.pop || 0) * 100);

        hourlyBox.innerHTML += `
            <div class="hourRow">
                <div class="time">${hour}</div>
                <div class="percent">${chance}%</div>
            </div>
        `;
    }

    //---------------------------------------
    // Updated Time
    //---------------------------------------

    updatedBox.textContent =
        "Updated " +
        new Date().toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit"
        });

}

loadWeather();

setInterval(
    loadWeather,
    CONFIG.refreshMinutes * 60 * 1000
);
