/* 存储/获取 user token */

const KEY = "USER_TOKEN";

export function setToken(token: string) {
  return localStorage.setItem(KEY, token);
}

export function getToken() {
  return localStorage.getItem(KEY) || "";
}

export function removeToken() {
  return localStorage.removeItem(KEY);
}
