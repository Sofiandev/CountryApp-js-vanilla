const rangeValue = document.getElementById("rangeValue");
const countriesContainer = document.querySelector(".countries-container");
const inputSearch = document.getElementById("inputSearch");
const inputRange = document.getElementById("inputRange");
const btnSort = document.querySelectorAll(".btnSort");
console.log(btnSort);

const minToMax = document.getElementById("minToMax");
const maxToMin = document.getElementById("maxToMin");
const alpha = document.getElementById("alpha");

console.log(minToMax);
let countriesData = [];
let sortMethod = "alpha";

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
    .sort((a, b) => {
      if (sortMethod === "maxToMin") {
        return b.population - a.population;
      } else if (sortMethod === "minToMax") {
        return a.population - b.population;
      } else if (sortMethod === "alpha") {
        return a.translations.fra.common.localeCompare(
          b.translations.fra.common
        );
      }
    })
    .slice(0, inputRange.value)
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

inputSearch.addEventListener("input", countriesDisplay);
inputRange.addEventListener("input", () => {
  countriesDisplay();
  rangeValue.textContent = inputRange.value;
});

btnSort.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    sortMethod = e.target.id;
    countriesDisplay();
  });
});
window.addEventListener("load", FetchCountries);
