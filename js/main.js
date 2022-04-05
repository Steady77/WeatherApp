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
const API_KEY = 'c177a9d1bbe8b48fe6ca8e58a30379da';
const TIMESTAMPS_NUMBER = 5;
const DEFAULT_CITY = 'moscow';

const setOfFavoriteCities = new Set(getLocalStorage('favorite'));

UI_ELEMENTS.FORM.addEventListener('submit', (event) => {
    event.preventDefault();

    const city = UI_ELEMENTS.CITY_INPUT.value;

    saveLocalStorage('city', city);

    if (!city) return alert('Вы не ввели город');

    renderWeatherData(city);
    clearCityField();
});

UI_ELEMENTS.FAVORITE_ADD_BUTTON.addEventListener('click', () => {
    addToFavoriteList();
    renderFavoriteList(setOfFavoriteCities);
    deleteFromFavorite();
    onClickFavoriteCity();
    saveLocalStorage('favorite', [...setOfFavoriteCities]);
});

localStorage.city ? renderWeatherData(getLocalStorage('city')) : renderWeatherData();

renderFavoriteList(setOfFavoriteCities);
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

    UI_ELEMENTS.DELETE_CITY_BUTTON.forEach((btn) => {
        btn.addEventListener('click', () => {
            const city = btn.previousElementSibling.textContent;
            setOfFavoriteCities.delete(city);

            renderFavoriteList(setOfFavoriteCities);
            onClickFavoriteCity();
            deleteFromFavorite();
            saveLocalStorage('favorite', [...setOfFavoriteCities]);
        });
    });
}

function addToFavoriteList() {
    const city = UI_ELEMENTS.CITY_DISPLAY.textContent;
    setOfFavoriteCities.add(city);
}

function onClickFavoriteCity() {
    UI_ELEMENTS.FAVORITE_CITY_NAME = document.querySelectorAll('.locations__item-text');

    UI_ELEMENTS.FAVORITE_CITY_NAME.forEach((item) => {
        item.addEventListener('click', (event) => {
            const city = event.target.textContent;

            saveLocalStorage('city', city);
            renderWeatherData(city);
        });
    });
}
