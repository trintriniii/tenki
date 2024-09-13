const apiKey = 'your_openweather_api_key'; // Replace with your actual API key

async function fetchWeatherData(city: string) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("City not found");
        const data = await response.json();
        displayWeatherData(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

function displayWeatherData(data: any) {
    const temperature = document.getElementById('temperature') as HTMLElement;
    const city = document.getElementById('city') as HTMLElement;
    const status = document.getElementById('status') as HTMLElement;
    const cloudiness = document.getElementById('cloudiness') as HTMLElement;
    const humidity = document.getElementById('humidity') as HTMLElement;
    const windSpeed = document.getElementById('wind-speed') as HTMLElement;

    // Update the DOM elements with API data
    temperature.textContent = `${Math.round(data.main.temp)}°`;
    city.textContent = data.name;
    status.textContent = data.weather[0].description;
    cloudiness.textContent = `${data.clouds.all}%`;
    humidity.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${data.wind.speed} km/h`;
}

const searchBtn = document.getElementById('search-btn') as HTMLElement;
const locationInput = document.getElementById('location-input') as HTMLInputElement;

searchBtn.addEventListener('click', () => {
    const city = locationInput.value.trim();
    if (city) fetchWeatherData(city);
});

// You can pre-load weather data for a default city like 'London'
window.onload = () => {
    fetchWeatherData('London');
};
