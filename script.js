/*
=========================================
☔ Larry's Rain Gauge Lewis Center, Ohio
=========================================
*/

const statusBox = document.getElementById("status");
const nextRainBox = document.getElementById("nextRain");
const hourlyBox = document.getElementById("hourly");
const updatedBox = document.getElementById("updated");
const titleBox = document.getElementById("title");

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
        nextRainBox.textContent = "Unable to retrieve forecast.";

    }

}

function displayWeather(data) {

    // ----- Header -----

    const temp = Math.round(data.current.temp);

    titleBox.innerHTML = `☔ Rain Center&nbsp;&nbsp;${temp}°`;

    // ----- Current Status -----

    const currentPop = data.hourly[0].pop || 0;

    if (currentPop >= 0.50) {

        statusBox.textContent = "🌧 RAIN";

    } else {

        statusBox.textContent = "☀ NO RAIN";

    }

    // ----- Next Rain -----

    let found = false;

    for (let i = 0; i < data.hourly.length; i++) {

        if ((data.hourly[i].pop || 0) >= 0.30) {

            const d = new Date(data.hourly[i].dt * 1000);

            const label = d.toLocaleString([], {
                weekday: "short",
                hour: "numeric"
            });

            const pct = Math.round(data.hourly[i].pop * 100);

            nextRainBox.innerHTML =
                `<strong>Next Rain</strong><br>${label} • ${pct}%`;

            found = true;
            break;

        }

    }

    if (!found) {

        nextRainBox.innerHTML =
            "<strong>No rain expected</strong><br>Next 48 hours";

    }

    // ----- Hourly Forecast -----

    hourlyBox.innerHTML = "";

    for (let i = 0; i < 5; i++) {

        const h = data.hourly[i];

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

    // ----- Updated -----

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
