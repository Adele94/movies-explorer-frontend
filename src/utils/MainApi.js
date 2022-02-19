// duckAuth.js

import moviesApi from "./MoviesApi";

export const BASE_URL = 'https://api.movies.adelnabiullina.nomoredomains.rocks';

const _getResponseData = (res) =>{
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status} ${res.message}`);
  }
  return res.json();
}

export const register = ({ name, email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({
      name,
      email,
      password
    })
  })
    .then((res) => {
      if (res.status === 400) {
        return Promise.reject("Некорректно заполнено одно из полей ");
      }
      return _getResponseData(res);
    })
};


export const authorize = ({ password, email }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({
      password,
      email,
    })
  })
    .then((res) => {
      if (res.status === 400) {
        return Promise.reject("Не передано одно из полей");
      }
      if (res.status === 401) {
        return Promise.reject("Пользователь с email не найден");
      }
      return _getResponseData(res);
    })
};
export const getProfile = () => {
  return fetch(`${BASE_URL}/users/me`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    method: 'GET',
    credentials: 'include'
  })
    .then(res => {
      return _getResponseData(res);
    });
}

export const updateProfile = ({ name, email }) => {
  return fetch(`${BASE_URL}/users/me`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    method: 'PATCH', 
    body: JSON.stringify({
      name,
      email,
    })
  })
    .then(res => {
      return _getResponseData(res);
    });
}

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    credentials: 'include'
  })
    .then((res) => {
      if (res.status === 400) {
        return Promise.reject("Токен не передан или передан не в том формате");
      }
      if (res.status === 401) {
        return Promise.reject("Переданный токен некорректен");
      }
      return _getResponseData(res);
    })
};

export const addSavedMovie = (movie) => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    credentials: 'include',
    body: JSON.stringify({
      "country": movie.country,
      "director": movie.director,
      "duration": movie.duration,
      "year": movie.year,
      "description": movie.description,
      "image": moviesApi.url+movie.image.url,
      "trailer": movie.trailerLink,
      "thumbnail":  moviesApi.url+movie.image.formats.thumbnail.url,
      "movieId": movie.id,
      "nameRU": movie.nameRU,
      "nameEN": movie.nameEN
    })
  })
    .then((res) => {
      return _getResponseData(res);
    })
};

export const getSavedMovies = () => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    credentials: 'include',
  })
    .then((res) => {
      return _getResponseData(res);
    })
};

export const deleteSavedMovie = (movie) => {
  return fetch(`${BASE_URL}/movies/${movie._id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    credentials: 'include',
  })
    .then((res) => {
      return _getResponseData(res);
    })
};