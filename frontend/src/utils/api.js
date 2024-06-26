class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  _checkServerResponseState(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then((res) => this._checkServerResponseState(res));
  }

  getInitialCards() {
    return this._request(this._url, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    });
  }

  addNewCard(data) {
    return this._request(this._url, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(data),
    });
  }

  deleteCard(cardId) {
    return this._request(this._url + `/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    });
  }

  getUserInfo() {
    return this._request(this._url.slice(0,-5) + "users/me", {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    });
  }

  updateUserInfo(name, about) {
    return this._request(this._url.slice(0,-5) + "users/me", {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    });
  }

  updateUserAvatar(avatarLink) {
    return this._request(this._url.slice(0,-5) + "users/me/avatar", {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLink
      })
    });
  }

  setLike(cardId) {
    return this._request(this._url + `/${cardId}/likes`, {
      method: 'PUT',
      credentials: 'include',
      headers: this._headers,
    });
  }

  deleteLike(cardId) {
    return this._request(this._url + `/${cardId}/likes`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    return isLiked? this.deleteLike(cardId) : this.setLike(cardId);
  }
}

export const api = new Api({
  baseUrl: 'https://api.mesto-project.xyz/cards',
  headers: {
    'Content-Type': 'application/json'
  }
});
