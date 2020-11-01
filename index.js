const key = "5f9f25b9231ba42851b4a04d";
const endpoint = "https://stefflr-0d51.restdb.io/rest/superheroes";
_GET();

function _GET() {
  fetch(endpoint, {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": key,
      "cache-control": "no-cache",
    },
  })
    .then((e) => e.json())
    .then(showHeroes)
    .catch(function(error) {  
    console.log('Request failed', error)  
  });
}

function _POST(data) {
  const postData = JSON.stringify(data);
  fetch(endpoint, {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": key,
      "cache-control": "no-cache",
    },
    body: postData,
  })
    .then((res) => res.json())
    .then((data) => {
      _GET(data);
    });
}

function _DELETE(id) {
  fetch(`${endpoint}/${id}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": key,
      "cache-control": "no-cache",
    },
  })
    .then((d) => d.json())
    .then((t) => get());
}

function _PUT(id) {
  let data = {
    real_name: "Dannie Vinther",
    hero_name: "El Puritan",
    age: 18,
  };
  let postData = JSON.stringify(data);

  fetch(`${endpoint}/${id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": key,
      "cache-control": "no-cache",
    },
    body: postData,
  })
    .then((d) => d.json())
    .then((t) => get());
}

function showHeroes(list) {
  console.log(list);
}

document.querySelectorAll("button.main-btn").forEach(el => el.addEventListener("click", doNextSection));
document.querySelectorAll("button.sec-btn").forEach(el => el.addEventListener("click", doPreviousSection));

function doNextSection(){
  this.parentElement.parentElement.classList.add("hidden");
  this.parentElement.parentElement.nextElementSibling.classList.toggle("hidden");

  if(this.parentElement.parentElement.nextElementSibling.id == "section-2"){
    updateDetails();
  }
}

function doPreviousSection(){
  this.parentElement.parentElement.classList.add("hidden");
  console.log(this.parentElement.parentElement);
  this.parentElement.parentElement.previousElementSibling.classList.toggle("hidden");
}

function updateDetails(){
  const details = document.querySelector(".details-wrapper");
  const detailsRight = document.querySelectorAll(".details-wrapper .right p");
  console.log(form.elements);
  detailsRight[0].textContent = form.elements.hero_name.value;
  detailsRight[1].textContent = form.elements.real_name.value;
  detailsRight[2].textContent = form.elements.age.value;
  detailsRight[3].textContent = form.elements.gender.value;
  detailsRight[4].textContent = form.elements.home_planet.value;
  // detailsRight[5].textContent = form.elements.strengths.value;
  detailsRight[6].textContent = form.elements.weaknesses.value;
  detailsRight[7].textContent = form.elements.team.value;
}



const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const filteredCheckboxes = Array.from(form.elements.team).filter((cb) => cb.checked);
  const mappedCheckboxes = filteredCheckboxes.map((cb) => cb.value);

  const superheroData = {
    real_name: form.elements.real_name.value,
    hero_name: form.elements.hero_name.value,
    home_planet: form.elements.home_planet.value,
    age: form.elements.age.value,
    gender: form.elements.gender.value,
    team: mappedCheckboxes,
  };

  _POST(superheroData);
});
