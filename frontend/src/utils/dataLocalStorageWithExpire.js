export function saveDataLocalStorageWithExpireData(name, payload) {
  const expiresIn = new Date().getTime() + 60 * 60 * 1000;
  localStorage.setItem(
    name,
    JSON.stringify({
      value: payload,
      expiresIn: expiresIn,
    }),
  );
}

export function isLocalDataAvailable(name) {
  const data = JSON.parse(localStorage.getItem(name));
  return data && data.expiresIn > new Date().getTime();
}
