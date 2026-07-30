# Larry's Rain Center

A weather dashboard designed specifically for **GitHub Pages** and **DAKboard**.

Displays current weather conditions for **Lewis Center, Ohio (43035)** using the OpenWeather API.

---

## Features

- Current temperature
- Feels Like temperature
- Weather icon
- Weather description
- Humidity
- Wind speed and direction
- Pressure
- Visibility
- Sunrise
- Sunset
- Rain (last hour, when available)
- Automatic refresh every 10 minutes
- Dark theme for TVs and wall displays
- Responsive layout
- DAKboard Website/iFrame compatible

---

## Files

| File | Purpose |
|------|---------|
| index.html | Main page |
| style.css | Dashboard styling |
| script.js | Weather logic |
| config.js | Configuration and API key |
| README.md | Documentation |

---

## Installation

1. Create a new GitHub repository.

Example:

Larrys-Rain-Center

2. Upload all project files.

3. Edit **config.js**

Replace:

```javascript
apiKey: "YOUR_OPENWEATHER_API_KEY"
```

with

```javascript
apiKey: "YOUR_ACTUAL_API_KEY"
```

4. Commit the changes.

---

## Enable GitHub Pages

Open:

Settings

↓

Pages

↓

Build from Branch

↓

Branch:

main

Folder:

/root

Save

GitHub will publish your website.

The URL will look similar to:

https://YOURUSERNAME.github.io/Larrys-Rain-Center/

---

## DAKboard

Add a new block.

Choose:

Website

Paste your GitHub Pages URL.

Enable:

- Full Screen
- No Scrolling

---

## Refresh

The dashboard refreshes automatically every 10 minutes.

Change the interval inside **config.js**

Example:

```javascript
refreshMinutes: 5
```

---

## Future Enhancements

- 7-day forecast
- Hourly forecast
- Rain graph
- Radar button
- National Weather Service alerts
- Lightning map
- Air quality
- UV index
- Pollen
- Snow totals
- Moon phase
- Weather history

---

## License

Free for personal use.
