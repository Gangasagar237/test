const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const currentWeatherItemsEl = document.getElementById("current weather items");
const timeZone = document.getElementById("time-zone");
const counteryEl = document.getElementById("countery");
const weatherForecastEl = document.getElementById("weather-forecast");
const currentTempEl = document.getElementById("current-temp");

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const API_KEY = "215a455f9ba74fb815de4837989069a5";

setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour;
  const minutes = time.getMinutes();
  const ampm = hour >= 12 ? "PM" : "AM";

  timeEl.innerHTML =
    (hoursIn12HrFormat < 10? '0' +hoursIn12HrFormat : hoursIn12HrFormat) + ":" + (minutes < 10? '0' +minutes: minutes)+ " " + `<span id="am-pm">${ampm}</span>`;

  dateEl.innerHTML = days[day] + ", " + date + " " + months[month];
}, 1000);

getweatherData();
function getweatherData() {
  navigator.geolocation.getCurrentPosition((success) => {
    console.log(success);

    let { latitude, longitude } = success.coords;
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        showWeatherData(data);
      });
  });
}
function showWeatherData(data) {
  let { humidity, pressure, sunrise, sunset, wind_speed } = data.current;

  timeZone.innerHTML = data.timezone;
  counteryEl.innerHTML = sata.lat + 'N ' + data.Ion+'E'

  currentWeatherItemsEl.innerHTML = `
  <div class="weather-item">
  <div>Humidity</div>
  <div>${humidity}%</div>
  </div>
  <div class="weather-item">
  <div>Presure</div>
  <div>${pressure} </div>
  </div>
  <div class="weather-item">
  <div>wind speed</div>
  <div>${wind_speed} </div>
  </div>
  <div class="weather-item">
  <div>Sunrise</div>
  <div>${window.moment(sunrise * 1000).format("HH:mm a")} </div>
  </div>
  <div class="weather-item">
  <div>Sunset</div>
  <div>${window.moment(sunset * 1000).format("HH:mm a")} </div>`;

  let otherDayForecast = "";
  data.daily.forEach((day, idx) => {
    if (idx == 0) {
      currentTempEl.innerHTML = `<img
      src="http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png"
      alt="weather-icon"
      class="w-icon"
    />
    <div class="other">
      <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
      <div class="temp">Night - ${day.temp.night}&#176; C</div>
      <div class="temp">Day - ${day.temp.day}&#176; C</div>`
    } else {
      otherDayForecast += `<div class="weather-forecast-item">
<div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
<img
  src="http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png"
  alt="weather-icon"
  class="w-icon"
/>
<div class="temp">Night - ${day.temp.night} #176; C</div>
<div class="temp">Day - ${day.temp.day}#176; C</div>
</div>`;
    }
  });

  weatherForecastEl.innerHTML = otherDayForecast;
}
