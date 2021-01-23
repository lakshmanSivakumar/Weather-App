const form = document.querySelector('form');
const dayOrNightImg = document.querySelector('.dayOrNight');
const details = document.querySelector('.details');
const icon = document.querySelector('.icon');
const forecast = new Forecast();

form.addEventListener('submit', city);

function updateUI(data) {
    const {cityDetails, weather} = data;

    details.innerHTML = `<h3>${cityDetails.EnglishName}</h3>
                         <h3>${weather.WeatherText}</h3>
                         <h3>${weather.Temperature.Metric.Value} &deg; C</h3>`;

    
    const iconSrc = `./images/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);
    
    let dayOrNight = null;
    if(weather.IsDayTime) {
        dayOrNight = './images/day.svg';
    } else {
        dayOrNight = './images/night.svg';
    }

    dayOrNightImg.setAttribute('src', dayOrNight);
        
}

function city(e) {
    e.preventDefault();
    let cityValue = form.city.value.trim();
    form.city.value = '';

    forecast.updateCity(cityValue)
        .then( data => updateUI(data))
        .catch( err => console.log(err));
    
    //local storage 
    localStorage.setItem('city', cityValue);
}

if(localStorage.getItem('city')) {
    forecast.updateCity(localStorage.getItem('city'))
        .then( data => updateUI(data))
        .catch( err => console.log(err)); 
}