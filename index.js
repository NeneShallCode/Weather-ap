function showTemp(response){
  console.log(response.data)
  let tempEl = document.querySelector("#temp");
  let cityEl = document.querySelector("#city");
  let weatherEl = document.querySelector("#describe");
  let humidEl = document.querySelector("#humidity");
  let windEl = document.querySelector("#wind");
  tempEl.innerHTML = Math.round(response.data.main.temp);
  cityEl.innerHTML = response.data.name;
  weatherEl.innerHTML = response.data.weather[0].description;
  humidEl.innerHTML = response.data.main.humidity;
  windEl.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey="514a1ffade9078bc9c2d40d114f61a0b";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemp);