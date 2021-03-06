import decode from 'jwt-decode';

const AUTH_TOKEN_KEY = 'auth_token';
const USER_ID_KEY = 'user_id';

export function getAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function getUserId() {
  return localStorage.getItem(USER_ID_KEY);
}

export function setAuthToken(token) {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function setUserId(id) {
  localStorage.setItem(USER_ID_KEY, id);
}

export function clearAuthToken() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

export function clearUserId(id) {
  localStorage.removeItem(USER_ID_KEY);
}

export function isLoggedIn() {
  const authToken = getAuthToken();
  return !!authToken && !isTokenExpired(authToken);
}

function getTokenExpirationDate(encodedToken) {
  const token = decode(encodedToken);
  if (!token.exp) { return null; }

  const date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}
