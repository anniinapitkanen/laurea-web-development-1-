// TEHTÄVÄ 1 – SISÄLLÖN MUUTTAMINEN

const changeHeadingButton = document.querySelector("#changeHeadingButton");
const changeStyleButton = document.querySelector("#changeStyleButton");
const changeTextButton = document.querySelector("#changeTextButton");

const taskOneHeading = document.querySelector("#taskOneHeading");
const animalText = document.querySelector("#animalText");


changeHeadingButton.addEventListener("click", function () {
    taskOneHeading.textContent = "Muokattu otsikko!";
});


changeStyleButton.addEventListener("click", function () {
    taskOneHeading.classList.toggle("highlight");
});



changeTextButton.addEventListener("click", function () {
    animalText.textContent =
        "Elefantit ovat älykkäitä ja sosiaalisia eläimiä.";
});



const animalButton = document.querySelector("#animalButton");
const animalTable = document.querySelector("#animalTable");

animalButton.addEventListener("click", function () {
    animalTable.hidden = !animalTable.hidden;
});



// TEHTÄVÄ 2 – ELEMENTTIEN LUOMINEN JAVASCRIPTILLÄ


const animalContent = document.querySelector("#animalContent");

const animalHeading = document.createElement("h3");
animalHeading.textContent = "Päivän eläin";
animalHeading.classList.add("animal-heading");

const animalParagraph = document.createElement("p");
animalParagraph.textContent =
    "Elefantti on suuri nisäkäs, joka elää Afrikassa ja Aasiassa.";

const animalContentImage = document.createElement("img");
animalContentImage.src = "images/elephant.png";
animalContentImage.alt = "Elefantti";

animalContent.append(
    animalHeading,
    animalParagraph,
    animalContentImage
);


const hideAnimalButton = document.querySelector("#hideAnimalButton");

hideAnimalButton.addEventListener("click", function () {
    animalContent.hidden = true;
});


// Näytä eläin
const showAnimalButton = document.querySelector("#showAnimalButton");

showAnimalButton.addEventListener("click", function () {
    animalContent.hidden = false;
});


// TEHTÄVÄ 3 – ELÄIMEN VALITSEMINEN

const animalSelect = document.querySelector("#animalSelect");
const animalName = document.querySelector("#animalName");
const animalImage = document.querySelector("#animalImage");
const animalDescription = document.querySelector("#animalDescription");


// Eläinten tiedot
const animals = {
    elephant: {
        name: "Elefantti",
        image: "images/elephant.png",
        description:
            "Elefantit ovat maailman suurimpia maaeläimiä."
    },

    tiger: {
        name: "Tiikeri",
        image: "images/tiger.png",
        description:
            "Tiikeri on suuri kissaeläin ja taitava metsästäjä."
    },

    penguin: {
        name: "Pingviini",
        image: "images/penguin.png",
        description:
            "Pingviinit ovat lentokyvyttömiä lintuja, jotka ovat taitavia uimareita."
    },

    panda: {
        name: "Panda",
        image: "images/panda.png",
        description:
            "Panda tunnetaan erityisesti bambun syömisestä."
    }
};


animalSelect.addEventListener("change", function () {

    const selectedAnimal = animalSelect.value;

    const animal = animals[selectedAnimal];

    animalName.textContent = animal.name;

    animalImage.src = animal.image;

    animalImage.alt = animal.name;

    animalDescription.textContent = animal.description;
});


animalImage.addEventListener("mouseenter", function () {
    animalImage.classList.add("image-highlight");
});


animalImage.addEventListener("mouseleave", function () {
    animalImage.classList.remove("image-highlight");
});


// TEHTÄVÄ 4 – ELÄINHAVAINTOJEN LISÄÄMINEN

// Haetaan lomake
const animalForm = document.querySelector("#animalForm");

// Haetaan lomakkeen kentät
const observationAnimal = document.querySelector("#observationAnimal");
const observationLocation = document.querySelector("#observationLocation");
const observationDate = document.querySelector("#observationDate");

// Haetaan taulukon tbody
const observationTableBody = document.querySelector("#observationTableBody");


// Kun lomake lähetetään
animalForm.addEventListener("submit", function (event) {

    // Estetään sivun uudelleenlataus
    event.preventDefault();

    // Haetaan käyttäjän kirjoittamat arvot
    const animal = observationAnimal.value.trim();
    const location = observationLocation.value.trim();
    const date = observationDate.value;

    // Tarkistetaan, ettei mikään kenttä ole tyhjä
    if (animal === "" || location === "" || date === "") {
        alert("Täytä kaikki kentät.");
        return;
    }

    // Luodaan uusi taulukkorivi
    const newRow = document.createElement("tr");

    // Luodaan ensimmäinen solu
    const animalCell = document.createElement("td");
    animalCell.textContent = animal;

    // Luodaan toinen solu
    const locationCell = document.createElement("td");
    locationCell.textContent = location;

    // Luodaan kolmas solu
    const dateCell = document.createElement("td");
    dateCell.textContent = date;

    // Lisätään solut riville
    newRow.append(
        animalCell,
        locationCell,
        dateCell
    );

    // Lisätään uusi rivi taulukkoon
    observationTableBody.append(newRow);

    // Tyhjennetään lomake
    animalForm.reset();
});