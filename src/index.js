const giphyKey = '&api_key=CrpHODR2TAesMkW7XQc3ZAV0BcfOvLpk'

import './styles/main.css';
import axios from "axios"
const button = document.getElementById('getWeatherBtn');
const coordsBtn = document.getElementById('coords');
const input = document.getElementById('city');
const results = document.getElementById('results');
const result = document.getElementById('result');
const weatherImg = document.getElementById('weatherImg');

button.addEventListener('click', () => {
    getWeather(input.value);
});

coordsBtn.addEventListener('click',()=>{
    getWeatherFromCoords();
})


function getWeather(city) {
    const d = document.querySelector('.details');
    const c = document.querySelector('.condition');
    console.log(c, d);
    if (d) d.remove()
    if (c) c.remove();
    weatherImg.src = "";
    showLoading();
    const url = `https://api.weatherapi.com/v1/current.json?key=dfecc53d1ca344578de35309230912&q=${city}`;

    axios.get(url)
        .then(res => {
            document.querySelector('.loading').remove();
            const weatherData = res.data.current;

            // Update temperature and condition .
            result.textContent = `${weatherData.temp_c}°C`;
            weatherImg.src = weatherData.condition.icon;

            // Create elements for additional details
            const details = document.createElement('div');
            details.classList.add('details');

            const farenheit = document.createElement('h5');
            farenheit.textContent = `${weatherData.temp_f}°F`;

            const humidity = document.createElement('p');
            humidity.textContent = `Humidity: ${weatherData.humidity}%`;

            const wind = document.createElement('p');
            wind.textContent = `Wind: ${weatherData.wind_kph} km/h, ${weatherData.wind_dir}`;

            const condition = document.createElement('p');
            condition.classList.add('condition');
            condition.textContent = weatherData.condition.text;

            // Append details to the card
            details.appendChild(farenheit);
            details.appendChild(humidity);
            details.appendChild(wind);
            results.appendChild(details);
            document.querySelector('.weatherBox').appendChild(condition);

            // Update background based on weather condition
            const searchTerm = weatherData.condition.text;
            fetch(`https://api.giphy.com/v1/gifs/search?${giphyKey}&q=${searchTerm}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`)
                .then(res => res.json())
                .then(data => {
                    document.body.style.backgroundImage = `url('${data.data[0].images.fixed_width_small.url}')`;
                });
        })
        .catch(err => {
            result.textContent = 'Error fetching weather data';
            console.error(err);
        });
}

function getWeatherFromCoords() {
    let latitude, longitude;
    navigator.geolocation.getCurrentPosition(pos => {
        const { coords } = pos;
        console.log(coords);
        latitude = coords.latitude;
        longitude = coords.longitude;
        
        const url = `https://api.weatherapi.com/v1/current.json?key=dfecc53d1ca344578de35309230912&q=${latitude},${longitude}`;
        const d = document.querySelector('.details');
        const c = document.querySelector('.condition');
        if (d) d.remove()
        if (c) c.remove();
        weatherImg.src = "";
        showLoading();
    
        axios.get(url)
            .then(res => {
                input.value = res.data.location.name;
                document.querySelector('.loading').remove();
                const weatherData = res.data.current;
    
                // Update temperature and condition .
                result.textContent = `${weatherData.temp_c}°C`;
                weatherImg.src = weatherData.condition.icon;
    
                // Create elements for additional details
                const details = document.createElement('div');
                details.classList.add('details');
    
                const farenheit = document.createElement('h5');
                farenheit.textContent = `${weatherData.temp_f}°F`;
    
                const humidity = document.createElement('p');
                humidity.textContent = `Humidity: ${weatherData.humidity}%`;
    
                const wind = document.createElement('p');
                wind.textContent = `Wind: ${weatherData.wind_kph} km/h, ${weatherData.wind_dir}`;
    
                const condition = document.createElement('p');
                condition.classList.add('condition');
                condition.textContent = weatherData.condition.text;
    
                // Append details to the card
                details.appendChild(farenheit);
                details.appendChild(humidity);
                details.appendChild(wind);
                results.appendChild(details);
                document.querySelector('.weatherBox').appendChild(condition);
    
                // Update background based on weather condition
                const searchTerm = weatherData.condition.text;
                fetch(`https://api.giphy.com/v1/gifs/search?${giphyKey}&q=${searchTerm}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`)
                    .then(res => res.json())
                    .then(data => {
                        document.body.style.backgroundImage = `url('${data.data[0].images.fixed_width_small.url}')`;
                    });
            })
            .catch(err => {
                result.textContent = 'Error fetching weather data';
                console.error(err);
            });
    })

}

function showLoading() {
    const animation = document.createElement('div');
    animation.classList.add('loading');
    result.textContent = '';
    result.appendChild(animation);
}
