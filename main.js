getDogs();

// Selectors

let dogsContainer = document.querySelector("#dogs-container");
let idInput = document.querySelector("#id-input");
let nameInput = document.querySelector("#name-input");
let breedInput = document.querySelector("#breed-input");
let ageInput = document.querySelector("#age-input");
let addDogBtn = document.querySelector("#add-dog-btn");

// Event listeners

addDogBtn.addEventListener("click", addDog);

// Functions

// Add a dog to the "db" by sending it to the API
function addDog() {
  let newDog = {
    id: Number(idInput.value),
    name: nameInput.value,
    breed: breedInput.value,
    age: Number(ageInput.value),
  };

  fetch("https://localhost:7026/v1/Dogs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newDog),
  }).then((res) => {
    if (res.ok) {
      getDogs();
    } else {
      console.warn("Something is wrong with the API!");
    }
  });
}

// Gets all dogs from the API and puts them into the dogs container
function getDogs() {
  fetch("https://localhost:7026/v1/Dogs")
    .then((res) => res.json())
    .then((data) => displayDogs(data));
}

function displayDogs(dogs) {
  dogsContainer.innerHTML = "";

  dogs.forEach((d) => {
    dogsContainer.innerHTML += `<h2>${d.name}</h2>`;
  });
}
