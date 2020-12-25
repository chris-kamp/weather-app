const locationInput = document.createElement('input');
locationInput.placeholder = 'Location';
const submitButton = document.createElement('button');
submitButton.textContent = 'Submit';
const formContainer = document.getElementById('formContainer');
formContainer.appendChild(locationInput);
formContainer.appendChild(submitButton);
const weatherSpan = document.getElementById('weatherSpan');
const loadingSpan = document.getElementById('loadingSpan');

const getWeather = async function getWeatherLoc(location) {
  const weather = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=b830c03ce7aa94245ce4a1384d87b46d`,
    { mode: 'cors' }
  );
  if (weather.status === 200) {
    return weather;
  }
  throw new Error(`Http error: ${weather.status}`);
};

const jsonWeather = async function jsonifyWeather(weather) {
  const response = await weather.json();
  return response;
};

const startTimer = function startTimer() {
  return new Date();
};
const endTimer = function endTimer(start) {
  const end = new Date();
  return (end - start) / 1000;
};

submitButton.addEventListener('click', function () {
  const start = startTimer();
  getWeather(locationInput.value)
    .then(jsonWeather)
    .then(function (response) {
      const loadTime = endTimer(start);
      const location = response.name;
      const temperature = response.main.temp;
      const feelslike = response.main.feels_like;
      const { description } = response.weather[0];
      weatherSpan.textContent = `Location: ${location} | Temperature: ${temperature} | Feels like: ${feelslike} | Description: ${description}`;
      loadingSpan.textContent = `Load time: ${loadTime} seconds`;
    })
    .catch((e) => {
      console.log(e);
    });
});
