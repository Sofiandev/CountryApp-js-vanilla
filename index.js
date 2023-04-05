const countriesContainer = document.querySelector(".countries-container");
const inputSearch = document.getElementById("inputSearch");
let countriesData = [];

async function FetchCountries() {
  await fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => (countriesData = data));

  console.log(countriesData);
  countriesDisplay();
}
function countriesDisplay() {
  countriesContainer.innerHTML = countriesData
    .filter((country) =>
      country.translations.fra.common
        .toLowerCase()
        .includes(inputSearch.value.toLowerCase())
    )
    .map(
      (country) =>
        `
    <div class="card">
    <img src="${country.flags.png}" alt="drapeau ${
          country.translations.fra.common
        }"/>
    <h2>${country.translations.fra.common}</h2>
    <h4> Capitale  : ${country.capital}</h4>
    <p> Population : ${country.population.toLocaleString()} d'hab</p>
    </div>
    `
    )
    .join("");
}

//Input value
inputSearch.addEventListener("input", countriesDisplay);

window.addEventListener("load", FetchCountries);

// 2 - Créer une fonction pour "fetcher" les données, afficher les données dans la console.

// 3 - Passer les données à une variable

// 4 - Créer une fonction d'affichage, et paramétrer l'affichage des cartes de chaque pays grace à la méthode MAP

// 5 - Récupérer ce qui est tapé dans l'input et filtrer (avant le map) les données
// coutry.name.includes(inputSearch.value);

// 6 - Avec la méthode Slice gérer le nombre de pays affichés (inputRange.value)

// 7 - Gérer les 3 boutons pour trier (méthode sort()) les pays
