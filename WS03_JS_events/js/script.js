function showTable() {
    const animal = "Tiikeri";
    const habitat = "Metsä";
    const diet = "Liha";

    const table = `
        <table>
            <tr>
                <th>Eläin</th>
                <th>Elinympäristö</th>
                <th>Ruokavalio</th>
            </tr>
            <tr>
                <td>${animal}</td>
                <td>${habitat}</td>
                <td>${diet}</td>
            </tr>
        </table>
    `;

    document.querySelector("#tableContainer").innerHTML = table;
}


const exercise2 = document.querySelector("#exercise2");

exercise2.addEventListener("mouseover", function() {
    console.log("Stepped over me with a mouse!");
});

const exercise1 = document.querySelector("#exercise1");

exercise1.addEventListener("click", function() {
    exercise1.style.color = "red";
    exercise1.innerHTML = "Bye bye mouse!";
});


const feedback = document.querySelector("#feedback");
const status = document.querySelector("#status");
const charcount = document.querySelector("#charcount");
const preview = document.querySelector("#preview");

feedback.addEventListener("focus", function() {
    status.innerHTML = "Kirjoita palautteesi tähän!";
    feedback.style.backgroundColor = "#f0f0f0";
});

feedback.addEventListener("blur", function() {
    status.innerHTML = "";
    feedback.style.backgroundColor = "";
});

feedback.addEventListener("input", function() {
    charcount.innerHTML = feedback.value.length + "/200";
    preview.innerHTML = feedback.value;
});

const feedbackForm = document.querySelector("#feedbackForm");

feedbackForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const text = feedback.value.trim();

    if (text.length < 10 || text.length > 200) {
        status.innerHTML = "Palautteen tulee olla 10–200 merkkiä pitkä.";
        return;
    }

    feedback.value = "";
    charcount.innerHTML = "0/200";
    preview.innerHTML = "(Esikatselu tulee tähän)";
    status.innerHTML = "Thank you for your feedback!";
});