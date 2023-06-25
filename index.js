function formatDate(timestamp){
 let date = new Date(timestamp);
 let hours = date.getHours();
 let min = date.getMinutes();
 let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
 let day = days[date.getDay()];
 if (min < 10){
    min=`0${min}`
 }
 return `${day}, ${hours}:${min}`
}

function displayForecast(){
  let forecastEl = document.querySelector("#week-days")
  let forecastHTML = `<div class="row">`;
  let days = ["Mon","Tues","Wed","Thurs","Fri"]
  days.forEach(function(day){
  forecastHTML =  forecastHTML + `
    <div class="col-2 mon">
      <div class="weather-fore-date">
         ${day}
      </div>
      <br>
      <img src = "http://openweathermap.org/img/wn/50d@2x.png" width="60">
      <br>
      <div class="weather-fore-temp">
        <span class="weather-fore-max">18</span> 
        <span class="weather-fore-min">12</span>
      </div>
    </div>
  `;
  })

  
forecastHTML = forecastHTML + `</div>`

  forecastEl.innerHTML = forecastHTML;
}

function getFore (coordinates){
  console.log(coordinates)
  let apiKey = "514a1ffade9078bc9c2d40d114f61a0b"
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=&appid=${apiKey}&units=metric`
  console.log(apiUrl)
}

function showTemp(response){
  let tempEl = document.querySelector("#temp");
  let cityEl = document.querySelector("#city");
  let weatherEl = document.querySelector("#describe");
  let humidEl = document.querySelector("#humidity");
  let windEl = document.querySelector("#wind");
  let dateEl = document.querySelector("#time");
  let iconEl=document.querySelector("#icon");

  celciusTemp = response.data.main.temp

  tempEl.innerHTML = Math.round(celciusTemp);
  cityEl.innerHTML = response.data.name;
  weatherEl.innerHTML = response.data.weather[0].description;
  humidEl.innerHTML = response.data.main.humidity;
  windEl.innerHTML = Math.round(response.data.wind.speed);
  dateEl.innerHTML = formatDate(response.data.dt * 1000);
  iconEl.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  getFore(response.data.coord)
}

function search(city){
  let apiKey="514a1ffade9078bc9c2d40d114f61a0b";
  let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function handleSubmit(event){
    event.preventDefault();
    let cityInputEl = document.querySelector("#city-input");
    search(cityInputEl.value)
}

function showFarenheit(event){
    event.preventDefault()
      let tempEl = document.querySelector("#temp");
    let farenheitTemp = celciusTemp
    tempEl.innerHTML = Math.round(farenheitTemp)
}

function showCelsius(event){
    event.preventDefault()
    let tempEl = document.querySelector("#temp");
    let celciusTem = (celciusTemp*9)/5+32;
    tempEl.innerHTML = Math.round(celciusTem)
}

let celciusTemp = null;

let form = document.querySelector("#city-search")
form.addEventListener("submit", handleSubmit)

let farenheitLink = document.querySelector("#farenheit-link")
farenheitLink.addEventListener("click", showFarenheit)

let celsiusLink = document.querySelector("#celsius-link")
celsiusLink.addEventListener("click", showCelsius)
displayForecast()