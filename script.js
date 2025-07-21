const apiKey = '4a2bb8758ded2ef1f64a510b4c26b7df';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?';

document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.querySelector('.search-form');
    const cityInput = document.querySelector('.city-input');
    const cityElement = document.querySelector('.city');
    const dateElement = document.querySelector('.date');
    const tempElement = document.querySelector('.temp');
    const descriptionElement = document.querySelector('.description-text');
    const windSpeedElement = document.querySelector('.wind-speed');
    const humidityElement = document.querySelector('.humidity');
    const visibilityElement = document.querySelector('.visibility-distance');

    // Set initial date to current time
    const now = new Date();
    dateElement.textContent = now.toLocaleString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }) + ' IST';

    // Fetch weather data
    async function getWeather(city) {
        try {
            const response = await fetch(`${apiUrl}q=${city}&units=metric&appid=${apiKey}`);
            if (!response.ok) throw new Error('City not found');
            const data = await response.json();

            cityElement.textContent = `${data.name}, India`;
            tempElement.textContent = `${Math.round(data.main.temp)}°`;
            descriptionElement.textContent = data.weather[0].description;
            windSpeedElement.textContent = `${data.wind.speed} KM/H`;
            humidityElement.textContent = `${data.main.humidity}%`;
            visibilityElement.textContent = `${data.visibility / 1000} KM`;

            // Update weather icon
            const weatherIcon = document.querySelector('.description i');
            weatherIcon.textContent = getWeatherIcon(data.weather[0].main);
        } catch (error) {
            alert('Error fetching weather data. Please try again.');
            console.error(error);
        }
    }

    // Map weather conditions to Material Icons
    function getWeatherIcon(main) {
        const iconMap = {
            Clear: 'sunny',
            Clouds: 'cloud',
            Rain: 'rainy',
            Drizzle: 'grain',
            Thunderstorm: 'flash_on',
            Snow: 'ac_unit',
            Mist: 'foggy'
        };
        return iconMap[main] || 'help';
    }

    // Handle form submission
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const city = cityInput.value.trim();
        if (city) {
            getWeather(city);
        } else {
            getWeather('Guwahati'); // Default to Guwahati if input is empty
        }
        cityInput.value = '';
    });

    // Load default weather for Guwahati on page load
    getWeather('Guwahati');
});
