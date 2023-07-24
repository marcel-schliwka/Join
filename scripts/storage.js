const STORAGE_TOKEN = "H008M2YASL1GFSNW0JS2OI128KHFJ5NOTPN6FWMY";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";

async function setItem(key, value) {
  const PAYLOAD = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(PAYLOAD),
  }).then((res) => res.json());
}

async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return fetch(url)
    .then((res) => res.json())
    .then((res) => {
      // Verbesserter code
      if (res.data) {
        return JSON.parse(res.data.value);
      }
      throw `Could not find data with key "${key}".`;
    });
}
