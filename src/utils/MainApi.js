const settingUserApi = {
  baseUrl: "https://api.moviessearch.nomoredomains.work",
  imgUrl: "https://api.nomoreparties.co",
  headers: {
    'Content-Type': 'application/json'
  }
}

class Api {
  constructor(config) {
    this._url = config.baseUrl;
    this._imgUrl = config.imgUrl;
    this._headers = config.headers;
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      const jwt = localStorage.getItem('jwt')
      if (jwt) {
        this._headers.authorization = "Bearer " + jwt;
      }
    }
  }

  async _checkResponse(res) {
    const json = await res.json();
    if (res.ok) {
      return json;
    }
    throw json;
  }

  register = (name, email, password) => {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    })
      .then(this._checkResponse)
  };

  login = (email, password) => {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then(this._checkResponse)
  }

  tokenCheck = (jwt) => {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }).then(this._checkResponse)
  };

  setToken(token) {
    localStorage.setItem("jwt", token);
    this._headers.authorization = "Bearer " + token;
  }


  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  getServerInfo(path) {
    return this._request(`${this._url}${path}`, {headers: this._headers})
  };

  changeStatusMovie(isLiked, movie, idForDelete) {
    if (isLiked) {
      return this.setMovieToSave(movie);
    } else {
      return this.removeMovieFromSave(idForDelete);
    }

  }

  editServerProfileInfo(data) {
    return this._request(`${this._url}/users/me`, {
      method: "PATCH", headers: this._headers, body: JSON.stringify({
        name: data.name, email: data.email,
      })
    })
  };

  removeMovieFromSave(idForDelete) {
    return this._request(`${this._url}/movies/${idForDelete}`, {
      method: "DELETE", headers: this._headers,
    })
  };

  setMovieToSave(movie) {
    return this._request(`${this._url}/movies`, {
      method: "POST", headers: this._headers, body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `${this._imgUrl}${movie.image.url}`,
        trailerLink: movie.trailerLink,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: `${this._imgUrl}${movie.image.url}`,
        movieId: movie.id
      })
    })
  }
}

export const mainApi = new Api(settingUserApi)
