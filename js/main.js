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
import { saveLocalStorage, getLocalStorage } from './localStorage.js';

tabs(UI_ELEMENTS);

const SERVER_URL = 'https://api.openweathermap.org/data/2.5/';
const API_KEY = '4a0a2aa638f3b881ecea6eb7d3c9ca4a';
const TIMESTAMPS_NUMBER = 3;
const DEFAULT_CITY = 'moscow';

let favoriteList = getLocalStorage('favorite') || [];

UI_ELEMENTS.FORM.addEventListener('submit', event => {
    event.preventDefault();

    const city = UI_ELEMENTS.CITY_INPUT.value;

    saveLocalStorage('city', city);

    if (!city) return alert('Вы не ввели город');

    renderWeatherData(city);
    clearCityField();
});

UI_ELEMENTS.FAVORITE_ADD_BUTTON.addEventListener('click', () => {
    addToFavoriteList();
    renderFavoriteList(favoriteList);
    deleteFromFavorite();
    onClickFavoriteCity();
    saveLocalStorage('favorite', favoriteList);
});

renderWeatherData(getLocalStorage('city'));
renderFavoriteList(favoriteList);
deleteFromFavorite();
onClickFavoriteCity();

function getForecastData(city) {
    const url = `${SERVER_URL}forecast?q=${city}&appid=${API_KEY}&units=metric&cnt=${TIMESTAMPS_NUMBER}`;
    return getJson(url);
}

function getCityData(city) {
    const url = `${SERVER_URL}weather?q=${city}&appid=${API_KEY}&units=metric`;
    return getJson(url);
}

async function getJson(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Ошибка запроса данных ${response.status} ${response.statusText}`);
        } else {
            const json = await response.json();
            return json;
        }
    } catch (error) {
        alert(error);
    }
}

async function renderWeatherData(city = DEFAULT_CITY) {
    try {
        const data = await getCityData(city);
        showWeatherImg(data.weather[0].icon);
        showResult(data.main.temp, data.name);
        renderWeatherDetails(data);
    } catch (error) {
        alert(error);
    }

    try {
        const data = await getForecastData(city);
        renderWeatherForecast(data);
    } catch (error) {
        alert(error);
    }
}

function deleteFromFavorite() {
    UI_ELEMENTS.DELETE_CITY_BUTTON = document.querySelectorAll('.locations__item-close');

    UI_ELEMENTS.DELETE_CITY_BUTTON.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            favoriteList.splice(i, 1);

            renderFavoriteList(favoriteList);
            onClickFavoriteCity();
            deleteFromFavorite();
            saveLocalStorage('favorite', favoriteList);
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

            saveLocalStorage('city', city);
            renderWeatherData(city);
        });
    });
}
