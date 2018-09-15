const API_URL = "https://starwars.egghead.training/";

const output = document.getElementById("output");
const spinner = document.getElementById("spinner");

function queryAPI(endpoint) {
  return fetch(API_URL + endpoint).then(response => {
    return response.ok
      ? response.json()
      : Promise.reject(Error("Unsuccessful response"));
  });
}

Promise.all([
  queryAPI("films"),
  queryAPI("planets"),
  queryAPI("species")
])
  .then(([films, planets, species]) => {
    output.innerText =
      `${films.length} films, ` +
      `${planets.length} planets, ` +
      `${species.length} species`;
  })
  .catch(error => {
    console.warn(error);
    output.innerText = ":(";
  })
  .finally(() => {
    spinner.remove();
  });
