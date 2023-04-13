const settingUserApi = {
  baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    'Content-Type': 'application/json'
  }
}

class MoviesApi {
  constructor(config) {
    this._url = config.baseUrl;
    this._headers = config.headers;
  }

  async _checkResponse(res) {
    const json = await res.json();
    if (res.ok) {
      return json;
    }
    throw json;
  }

  getMovies() {
    return fetch(`${this._url}`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse)
  }
}

export const moviesApi = new MoviesApi(settingUserApi)
