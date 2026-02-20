
let searchBtn = document.querySelector(".search-btn");
let cityInput = document.getElementById("city");

let temp = document.querySelector(".temp");
let cityName = document.querySelector(".city");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");

//addeventlister on the search btn
searchBtn.addEventListener("click", () => {
    let searchValue = cityInput.value.trim();

    if(searchValue == ""){
        alert("Please Enter The City..");
        return;
    }

    getCoordinates(searchValue);
});


//get coordinates
async function getCoordinates(city) {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}`;
    let res = await fetch(geoUrl);
    let data = await res.json();
    
    if(!data.results || data.results.length === 0){
        alert("City Not Found..");
        return;
    }
    
    let lat = data.results[0].latitude;
    let lon = data.results[0].longitude;

    getWeather(lat, lon, city);
}

//get weather data
async function getWeather(lat, lon, city) {
    const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relativehumidity_2m`;

    let res = await fetch(API_URL);
    let data = await res.json();
    
    // Store weather data
    let temperature = data.current_weather.temperature;
    let windspeed = data.current_weather.windspeed;

    // Update UI
    temp.innerText = temperature + "°C";
    cityName.innerText = city;
    humidity.innerText = data.hourly.relativehumidity_2m[0] + "%"; 
    wind.innerText = windspeed + " km/h";
}

    