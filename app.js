const countriesElem = document.querySelector(".countries");
const dropDown = document.querySelector(".dropDown");
const dropElem = document.querySelector(".drop");
const region = document.querySelectorAll(".region");
const search = document.querySelector(".search");

const allCountries = (()=>{
    fetch("https://restcountries.com/v3.1/all")
    .then((response)=>{
        return response.json();
    }).then((response)=>{
        response.forEach((data)=>{
            showCountry(data)
        })
    }).catch((err)=>{
        console.log(err)
    })
})

allCountries();
function showCountry(data) {
  const country = document.createElement("div");
  country.classList.add("country");
  country.innerHTML = `
   
    <div class="country-img">
        <img src=${data.flags.svg} alt="landon"> 
    </div>
    <div class="country-info">
        <h5 class="countryName">${data.name.common}</h5>
        <p><strong>Population:</strong>${data.population}</p>
        <p class="regionName"><strong>Region:</strong>${data.region}</p>
        <p><strong>capital:</strong>${data.capital}</p>
    </div>

    `;
  countriesElem.appendChild(country);
}

dropDown.addEventListener("click", () => {
  dropElem.classList.toggle("showDropDown");
});
const regionName = document.getElementsByClassName("regionName");
const countryName = document.getElementsByClassName("countryName");

region.forEach((element) => {
  element.addEventListener("click", () => {
    if (element.innerText == "All") {
      countriesElem.innerHTML = "";
      allCountries();
    } else {
      fetch(
        `https://restcountries.com/v3.1/region/${element.innerText.toLowerCase()}`
      )
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          countriesElem.innerHTML = "";
          data.forEach((element) => {
            showCountry(element);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
});
search.addEventListener("input", () => {
  Array.from(countryName).forEach((elem) => {
    if (elem.innerText.toLowerCase().includes(search.value.toLowerCase())) {
      elem.parentElement.parentElement.style.display = "grid";
    } else {
      elem.parentElement.parentElement.style.display = "none";
    }
  });
});
