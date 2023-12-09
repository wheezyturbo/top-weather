// http://api.weatherapi.com/v1/current.json?key=dfecc53d1ca344578de35309230912&q=

//
const giphyKey = '&api_key=CrpHODR2TAesMkW7XQc3ZAV0BcfOvLpk'

const url = 'http://api.giphy.com/v1/gifs/search?q=funny+cat'
import './styles/main.css';
import axios from "axios"
const button = document.getElementById('getWeatherBtn');
const input = document.getElementById('city');
button.addEventListener('click', () => {
    getWeather(input.value);

})

function getWeather(city) {
    const results = document.getElementById('results');
    const result = document.getElementById('result')
    showLoading();
    const url = "http://api.weatherapi.com/v1/current.json?key=dfecc53d1ca344578de35309230912&q=";
    axios.get(url + city).then(res => {
        const search = res.data.current.condition.text;
        document.getElementById('result').textContent = res.data.current.feelslike_c + " deg C";
        const img = document.getElementById('weatherImg');
        img.src = res.data.current.condition.icon;
        fetch(`https://api.giphy.com/v1/gifs/search?api_key=CrpHODR2TAesMkW7XQc3ZAV0BcfOvLpk&q=${search}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`).then(
            res => res.json()).then(data => {
                console.log(data);
                document.body.style.backgroundImage = `url('${data.data[Math.floor(Math.random(10) * 10)].images.fixed_width_small.url}')`;

            })
    }).catch(err => console.log(err))
}

function showLoading() {
    result.textContent = "loading..."
}

// fetch('http://api.weatherapi.com/v1/current.json?key=dfecc53d1ca344578de35309230912&q=' + "mananthavady").then(res => res.json()).then(data => {
//     document.getElementById('results').textContent = JSON.stringify(data)
//     console.log(data)

// }
// )
