import Cookies from 'js-cookie';

export function saveLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setCookie(key, value) {
  Cookies.set(key, value, { expires: 1 / 48, secure: true });
}

export function getCookie(key) {
  return Cookies.get(key);
}
