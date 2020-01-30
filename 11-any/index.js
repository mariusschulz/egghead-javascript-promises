const API_URL_1 = "https://starwars.egghead.training/";
const API_URL_2 = "https://swapi.mariusschulz.com/";

const output = document.getElementById("output");
const spinner = document.getElementById("spinner");

function query(rootURL, endpoint) {
  return fetch(rootURL + endpoint).then(response => {
    return response.ok
      ? response.json()
      : Promise.reject(Error("Unsuccessful response"));
  });
}

function queryAPI(endpoint) {
  return Promise.any([
    query(API_URL_1, endpoint),
    query(API_URL_2, endpoint)
  ]).catch(() => {
    return Promise.reject(
      Error(`Failed to fetch endpoint "${endpoint}"`)
    );
  });
}

function getFilmTitles(films) {
  return films
    .slice()
    .sort((a, b) => a.episode_id - b.episode_id)
    .map(film => `${film.episode_id}. ${film.title}`)
    .join("\n");
}

queryAPI("films")
  .then(films => {
    output.innerText = getFilmTitles(films);
  })
  .catch(error => {
    console.warn(error);
    output.innerText = ":(";
  })
  .finally(() => {
    spinner.remove();
  });
