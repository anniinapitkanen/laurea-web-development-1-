"use strict";

// OpenWeatherMap API-avain
const API_KEY = "29081691484e94fe8b918efbfa913991";

// Haetaan HTML-elementit
const citySelect = document.getElementById("city");
const citySearch = document.getElementById("citysearch");
const searchButton = document.getElementById("search");
const fetchButton = document.getElementById("fetchWeather");
const weatherData = document.getElementById("weatherdata");

// Funktio säätietojen hakemiseen
async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&mode=xml&appid=${API_KEY}`;

  try {
    weatherData.textContent = "Haetaan säätietoja...";

    const response = await fetch(url);

    const xmlText = await response.text();

    console.log("XML-vastaus:", xmlText);

    if (!response.ok) {
      throw new Error("Säätietojen hakeminen epäonnistui.");
    }

    // Parsitaan XML-vastaus
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlText, "text/xml");

    // Haetaan tiedot XML:stä
    const cityName = xml.querySelector("city")?.getAttribute("name");
    const temperature = xml.querySelector("temperature")?.getAttribute("value");
    const humidity = xml.querySelector("humidity")?.getAttribute("value");
    const clouds = xml.querySelector("clouds")?.getAttribute("value");
    const weather = xml.querySelector("weather")?.getAttribute("value");

    // Tarkistetaan löytyivätkö tiedot
    if (temperature === null || temperature === undefined) {
      throw new Error("Säätietoja ei löytynyt.");
    }

    // Näytetään tiedot verkkosivulla
    weatherData.innerHTML = `
            <h3>Säätiedot: ${cityName || city}</h3>
            <p>Lämpötila: ${temperature} °C</p>
            <p>Ilmankosteus: ${humidity}%</p>
            <p>Pilvisyys: ${clouds}%</p>
            <p>Säätila: ${weather || "Ei saatavilla"}</p>
        `;
  } catch (error) {
    console.error("Virhe:", error);

    weatherData.textContent = error.message;
  }
}

// Hae data -painike hakee Helsingin säätiedot
fetchButton.addEventListener("click", function () {
  getWeather("Helsinki");
});

// Kaupungin valinta pudotusvalikosta
citySelect.addEventListener("change", function () {
  getWeather(citySelect.value);
});

// Hakupainike
searchButton.addEventListener("click", function () {
  const city = citySearch.value.trim();

  if (city !== "") {
    getWeather(city);
  } else {
    weatherData.textContent = "Kirjoita ensin kaupungin nimi.";
  }
});

// Enter-näppäimellä hakeminen
citySearch.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    searchButton.click();
  }
});
