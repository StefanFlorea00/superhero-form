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
    .catch(function (error) {
      console.log("Request failed", error);
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

document.querySelectorAll("button.main-btn").forEach((el) => el.addEventListener("click", doNextSection));
document.querySelectorAll("button.sec-btn").forEach((el) => el.addEventListener("click", doPreviousSection));
document.querySelector("input[type=submit]").addEventListener("click", doSubmit);
const form = document.querySelector("form");
let activeSection = "#section-0";
let activeSectionNode = document.querySelector(activeSection);

function changeSection(newSection) {
  console.log(activeSection);
  activeSectionNode = document.querySelector(activeSection);
  activeSectionNode.classList.add("hidden");
  if (newSection) {
    newSection.classList.toggle("hidden");
  } else {
    activeSection = "#section-0";
    document.querySelector(activeSection).classList.toggle("hidden");
  }
  activeSection = "#" + newSection.id;
}

function doNextSection() {
  changeSection(this.parentElement.parentElement.nextElementSibling);

  if (this.parentElement.parentElement.nextElementSibling.id == "section-2") {
    updateDetails();
  }
}

function doSubmit() {
  if (form.checkValidity()) {
    changeSection(this.parentElement.parentElement.nextElementSibling);
  } else {
    changeSection(document.querySelector("#section-0"));
  }

  document.querySelectorAll("input").forEach((el) => (el.value = ""));
}

function doPreviousSection() {
  changeSection(this.parentElement.parentElement.previousElementSibling);
}

function updateDetails() {
  const details = document.querySelector(".details-wrapper");
  const detailsRight = document.querySelectorAll(".details-wrapper .right p");
  console.log(form.elements);

  changeDetails("hero_name", form.elements.age.value);
  changeDetails("real_name", form.elements.real_name.value);
  changeDetails("age", form.elements.age.value);
  changeDetails("gender", form.elements.gender.value);
  changeDetails("home_planet", form.elements.home_planet.value);
  changeDetails("strengths", form.elements.strengths.value);
  changeDetails("weaknesses", form.elements.weaknesses.value);
  changeDetails("team", form.elements.team.value);
}

function changeDetails(datafield, text) {
  if (text == "") {
    document.querySelector(`[data-field=${datafield}]`).textContent = "-";
  } else document.querySelector(`[data-field=${datafield}]`).textContent = text;
}

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
