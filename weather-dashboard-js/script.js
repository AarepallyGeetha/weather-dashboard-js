const apiKey = "432e03065edf44ccbde0828d80db6ded";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const condition = document.getElementById("condition");

const weatherCard = document.getElementById("weatherCard");
const errorDiv = document.getElementById("error");

async function getWeather(city) {
    try {
        errorDiv.textContent = "";

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        displayWeather(data);

    } catch (error) {
        weatherCard.classList.add("hidden");
        errorDiv.textContent = error.message;
    }
}

function displayWeather(data) {
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = `🌡 Temperature: ${data.main.temp}°C`;
    humidity.textContent = `💧 Humidity: ${data.main.humidity}%`;
    wind.textContent = `🌬 Wind Speed: ${data.wind.speed} m/s`;
    condition.textContent = `☁ Condition: ${data.weather[0].description}`;

    weatherCard.classList.remove("hidden");
}

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if (city !== "") {
        getWeather(city);
    }
});

cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});