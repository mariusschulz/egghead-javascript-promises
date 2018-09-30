// Required to make jQuery work within CodeSandbox
const $ = window.jQuery || require("jquery");

const API_URL = "https://starwars.egghead.training/";

const output = document.getElementById("output");
const spinner = document.getElementById("spinner");

function getFilmTitles(films) {
  return films
    .slice()
    .sort((a, b) => a.episode_id - b.episode_id)
    .map(film => `${film.episode_id}. ${film.title}`)
    .join("\n");
}

Promise.resolve($.ajax(API_URL + "films"))
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
