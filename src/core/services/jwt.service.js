const AUTH_KEY = "AUTH_OBJECT_KEY";

export const getAuth = () => {
  let auth = window.localStorage.getItem(AUTH_KEY);
  if (typeof auth === "string") {
    return JSON.parse(auth);
  }
  return null;
};

export const saveAuth = auth => {
  window.localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
};

export const destroyAuth = () => {
  window.localStorage.removeItem(AUTH_KEY);
};

export default {
  getAuth: getAuth,
  saveAuth: saveAuth,
  destroyAuth: destroyAuth
};
