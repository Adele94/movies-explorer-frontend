class MoviesApi {

  constructor(options) {
    this.url = options.baseUrl;
    this.headers = options.headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status} ${res.message}`);
    }
    return res.json();
  }

  //получение массива карточек 
  getInitialCards() {
    return fetch(this.url + '/beatfilm-movies', {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

    //получение массива карточек 
  search(searchQuery) {
    return fetch(this.url + '/beatfilm-movies?nameRU='+searchQuery, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }
}

const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co',
});

export default moviesApi;