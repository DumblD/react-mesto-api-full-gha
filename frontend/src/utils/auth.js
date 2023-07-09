export const BASE_URL = 'http://mesto-project.nomoreparties.sbs';

function checkServerResponseState(res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
}

function request(endpoint, options) {
  const url = `${BASE_URL}${endpoint}`;
  return fetch(url, options).then(checkServerResponseState)
}

export const register = (registerData) => {
  return request('/signup', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(registerData)
  })
};

export const authorize = (loginData) => {
  return request('/signin', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginData)
  })
  .then((data) => {
    if (data.message === 'Аутентификация прошла успешна') {
      localStorage.setItem('isAuthorized', true);
    }
  })
};

export const checkToken = () => {
  return request('/users/me', {
    method: 'GET',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json"
    }
  })
}
