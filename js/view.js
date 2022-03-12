export const UI_ELEMENTS = {
    TAB_BUTTONS_WRAPPER: document.querySelector('.tabs__items'),
    TAB_BUTTONS: document.querySelectorAll('.tabs__item'),
    TAB_CONTENT: document.querySelectorAll('.tabs__content'),
    FORM: document.querySelector('.form'),
    CITY_INPUT: document.querySelector('.header__search'),
    CITY_SEARCH_BUTTON: document.querySelector('.header__search-btn'),
    TEMPERATURE_DISPLAY: document.querySelector('.info__now-tepmerature'),
    CITY_DISPLAY: document.querySelector('.info__now-city'),
    WEATHER_IMG: document.querySelector('.info__now-img'),
    FAVORITE_LIST: document.querySelector('.locations__list'),
    FAVORITE_ADD_BUTTON: document.querySelector('.info__now-favorite'),
    WEATHER_DETAILS: document.querySelector('.info__details'),
    WEATHER_FORECAST: document.querySelector('.forecast-box__boxes'),
    FORECAST_CITY_NAME: document.querySelector('.info__forecast-city'),
    FORECAST_IMG: document.querySelector('.forecast-box__img'),
};

export function clearCityField() {
    UI_ELEMENTS.CITY_INPUT.value = '';
}

export function showResult(temp, city) {
    UI_ELEMENTS.TEMPERATURE_DISPLAY.textContent = Math.round(temp);
    UI_ELEMENTS.CITY_DISPLAY.textContent = city;
}

export function showWeatherImg(iconName) {
    UI_ELEMENTS.WEATHER_IMG.src = `http://openweathermap.org/img/wn/${iconName}@4x.png`;
}

function formatTime(seconds) {
    const milliseconds = seconds * 1000;
    const date = new Date(milliseconds);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
}

function formatDate(string) {
    const date = new Date(string);
    const options = { day: 'numeric', month: 'short' };

    return date.toLocaleDateString('en-GB', options);
}

export function renderWeatherDetails(data) {
    UI_ELEMENTS.WEATHER_DETAILS.innerHTML = `
        <h4 class="info__details-city">${data.name}</h4>
        <ul class="info__details-list">
            <li class="info__details-item">Temperature: ${Math.round(data.main.temp)}°</li>
            <li class="info__details-item">Feels like: ${Math.round(data.main.feels_like)}°</li>
            <li class="info__details-item">Weather: ${data.weather[0].main}</li>
            <li class="info__details-item">Sunrise: ${formatTime(data.sys.sunrise)}</li>
            <li class="info__details-item">Sunset: ${formatTime(data.sys.sunset)}</li>
        </ul> 
    `;
}

export function renderWeatherForecast({ city, list }) {
    UI_ELEMENTS.FORECAST_CITY_NAME.textContent = city.name;
    UI_ELEMENTS.WEATHER_FORECAST.innerHTML = '';

    list.forEach(item => {
        UI_ELEMENTS.WEATHER_FORECAST.innerHTML += `
            <div class="info__forecast-box forecast-box">
                <div class="forecast-box__date">
                    <p class="forecast-box__day">${formatDate(item.dt_txt)}</p>
                    <p class="forecast-box__time">${formatTime(item.dt)}</p>
                </div>
                <div class="forecast-box__bottom">
                    <ul class="forecast-box__list">
                        <li class="forecast-box__item">Temperature: ${Math.round(item.main.temp)}°</li>
                        <li class="forecast-box__item">Feels like: ${Math.round(item.main.feels_like)}°</li>
                    </ul>
                    <div class="forecast-box__weather">
                        <p class="forecast-box__text">${item.weather[0].main}</p>
                        <img class="forecast-box__img" src="http://openweathermap.org/img/wn/${
                            item.weather[0].icon
                        }@2x.png" alt="icon">
                    </div>
                </div>
            </div>
        `;
    });
}

export function renderFavoriteList(cityList) {
    UI_ELEMENTS.FAVORITE_LIST.innerHTML = '';

    cityList.forEach(cityName => {
        UI_ELEMENTS.FAVORITE_LIST.innerHTML += `
            <li class="locations__item">
                <span class="locations__item-text">${cityName}</span>         
                <button class="locations__item-close"></button>
            </li>
        `;
    });
}
