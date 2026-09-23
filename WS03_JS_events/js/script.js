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