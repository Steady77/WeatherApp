import {
    UI_ELEMENTS,
    clearCityField,
    showResult,
    showWeatherImg,
    renderFavoriteList,
    renderWeatherDetails,
    renderWeatherForecast,
} from './view.js';
import { tabs } from './tabs.js';

tabs(UI_ELEMENTS);

const SERVER_URL = 'https://api.openweathermap.org/data/2.5/';
const API_KEY = '4a0a2aa638f3b881ecea6eb7d3c9ca4a';
const TIMESTAMPS_NUMBER = 3;
const DEFAULT_CITY = 'moscow';

let favoriteList = [];

UI_ELEMENTS.FORM.addEventListener('submit', event => {
    event.preventDefault();

    const city = UI_ELEMENTS.CITY_INPUT.value;

    if (!city) return alert('Вы не ввели город');

    renderWeatherData(city);
    clearCityField();
});

UI_ELEMENTS.FAVORITE_ADD_BUTTON.addEventListener('click', () => {
    addToFavoriteList();
    renderFavoriteList(favoriteList);
    deleteFromFavorite();
    onClickFavoriteCity();
});

renderWeatherData();

function getForecastData(city) {
    const url = `${SERVER_URL}forecast?q=${city}&appid=${API_KEY}&units=metric&cnt=${TIMESTAMPS_NUMBER}`;

    return fetch(url)
        .then(response => response.json())
        .catch(alert);
}

function getCityData(city) {
    const url = `${SERVER_URL}weather?q=${city}&appid=${API_KEY}&units=metric`;

    return fetch(url)
        .then(response => response.json())
        .catch(alert);
}

function renderWeatherData(city = DEFAULT_CITY) {
    getCityData(city)
        .then(data => {
            showWeatherImg(data.weather[0].icon);
            showResult(data.main.temp, data.name);
            renderWeatherDetails(data);
        })
        .catch(alert);

    getForecastData(city)
        .then(data => {
            renderWeatherForecast(data);
        })
        .catch(alert);
}

function deleteFromFavorite() {
    UI_ELEMENTS.DELETE_CITY_BUTTON = document.querySelectorAll('.locations__item-close');

    UI_ELEMENTS.DELETE_CITY_BUTTON.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            favoriteList.splice(i, 1);

            renderFavoriteList(favoriteList);
            onClickFavoriteCity();
            deleteFromFavorite();
        });
    });
}

function addToFavoriteList() {
    const city = UI_ELEMENTS.CITY_DISPLAY.textContent;
    const isCityInFavorite = favoriteList.some(item => item === city);

    if (isCityInFavorite) return;
    favoriteList.push(city);
}

function onClickFavoriteCity() {
    UI_ELEMENTS.FAVORITE_CITY_NAME = document.querySelectorAll('.locations__item-text');

    UI_ELEMENTS.FAVORITE_CITY_NAME.forEach(item => {
        item.addEventListener('click', event => {
            const city = event.target.textContent;

            renderWeatherData(city);
        });
    });
}
