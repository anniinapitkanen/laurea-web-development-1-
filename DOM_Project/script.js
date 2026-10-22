const form = document.querySelector("#todo-form");
const input = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const counter = document.querySelector("#task-counter");
const errorMessage = document.querySelector("#error-message");
const emptyMessage = document.querySelector("#empty-message");
const filterButtons = document.querySelectorAll(".filter-button");
const clearCompletedButton = document.querySelector("#clear-completed");

const STORAGE_KEY = "ennen-koulua-tehtavat";

let tasks = loadTasks();
let currentFilter = "all";

// Ladataan tehtävät selaimen muistista.
function loadTasks() {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY);

    if (!savedTasks) {
      return [];
    }

    const parsedTasks = JSON.parse(savedTasks);

    if (!Array.isArray(parsedTasks)) {
      return [];
    }

    // Tarkistetaan myös tallennetun tiedon rakenne.
    return parsedTasks.filter(
      (task) =>
        task &&
        typeof task.id === "string" &&
        typeof task.text === "string" &&
        typeof task.completed === "boolean",
    );
  } catch (error) {
    console.error("Tehtävien lataaminen epäonnistui:", error);
    return [];
  }
}

// Tallennetaan tehtävät localStorageen.
function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Tehtävien tallentaminen epäonnistui:", error);
    showError("Tallennus epäonnistui. Tarkista selaimen tallennustila.");
  }
}

// Näytetään virheilmoitus ja korostetaan kenttä.
function showError(message) {
  errorMessage.textContent = message;
  input.classList.add("invalid");
  input.setAttribute("aria-invalid", "true");
}

// Poistetaan virheilmoitus.
function clearError() {
  errorMessage.textContent = "";
  input.classList.remove("invalid");
  input.removeAttribute("aria-invalid");
}

// Lomakkeen lähetys ja tehtävän lisääminen.
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = input.value.trim();

  if (text.length === 0) {
    showError("Kirjoita tehtävä ennen lisäämistä.");
    input.focus();
    return;
  }

  if (text.length < 3) {
    showError("Tehtävän tulee sisältää vähintään 3 merkkiä.");
    input.focus();
    return;
  }

  clearError();

  const newTask = {
    id: createId(),
    text: text,
    completed: false,
  };

  tasks.push(newTask);
  saveTasks();

  // Näytetään uusi tehtävä myös Kaikki-suodattimessa.
  currentFilter = "all";
  updateFilterButtons();
  renderTasks();

  input.value = "";
  input.focus();
});

// Luodaan tehtävälle yksilöllinen tunniste.
function createId() {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return Date.now().toString() + Math.random().toString(36).slice(2);
}

// Päivitetään koko tehtävälista.
function renderTasks() {
  taskList.replaceChildren();

  const visibleTasks = tasks.filter((task) => {
    if (currentFilter === "active") {
      return !task.completed;
    }

    if (currentFilter === "completed") {
      return task.completed;
    }

    return true;
  });

  visibleTasks.forEach((task) => {
    const item = document.createElement("li");
    item.className = "task-item";

    if (task.completed) {
      item.classList.add("completed");
    }

    // Valintaruutu tehtävän kuittaamiseen.
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute(
      "aria-label",
      `Merkitse tehtävä tehdyksi: ${task.text}`,
    );

    checkbox.addEventListener("change", function () {
      task.completed = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    // Tehtävän teksti lisätään turvallisesti textContentilla.
    const text = document.createElement("span");
    text.className = "task-text";
    text.textContent = task.text;

    // Poistopainike.
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-button";
    deleteButton.textContent = "×";
    deleteButton.setAttribute("aria-label", `Poista tehtävä: ${task.text}`);
    deleteButton.title = "Poista tehtävä";

    deleteButton.addEventListener("click", function () {
      tasks = tasks.filter((item) => item.id !== task.id);
      saveTasks();
      renderTasks();
    });

    item.append(checkbox, text, deleteButton);
    taskList.appendChild(item);
  });

  // Lasketaan vain keskeneräiset tehtävät.
  const remaining = tasks.filter((task) => !task.completed).length;

  if (remaining === 0 && tasks.length > 0) {
    counter.textContent = "Hienoa! Kaikki tehtävät on tehty!";
  } else if (remaining === 1) {
    counter.textContent = "Vain 1 tehtävä jäljellä!";
  } else {
    counter.textContent = `${remaining} tehtävää jäljellä.`;
  }

  emptyMessage.hidden = visibleTasks.length > 0;

  if (visibleTasks.length === 0) {
    if (currentFilter === "active" && tasks.length > 0) {
      emptyMessage.textContent = "Kaikki tehtävät on tehty!";
    } else if (currentFilter === "completed" && tasks.length > 0) {
      emptyMessage.textContent = "Valmiita tehtäviä ei vielä ole.";
    } else {
      emptyMessage.textContent = "Ei tehtäviä näytettävänä.";
    }
  }

  clearCompletedButton.disabled = !tasks.some((task) => task.completed);
  clearCompletedButton.style.opacity = clearCompletedButton.disabled
    ? "0.45"
    : "1";
}

// Suodattimet: kaikki, keskeneräiset ja tehdyt.
filterButtons.forEach((button) => {
  button.addEventListener("click", function () {
    currentFilter = button.dataset.filter;
    updateFilterButtons();
    renderTasks();
  });
});

// Päivitetään suodattimien ulkoasu ja saavutettavuustiedot.
function updateFilterButtons() {
  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === currentFilter;

    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

// Poistetaan kaikki valmiiksi merkityt tehtävät.
clearCompletedButton.addEventListener("click", function () {
  tasks = tasks.filter((task) => !task.completed);
  saveTasks();
  renderTasks();
});

// Virheilmoitus poistuu, kun käyttäjä alkaa korjata syötettä.
input.addEventListener("input", clearError);

// Näytetään tallennetut tehtävät heti sivun avautuessa.
updateFilterButtons();
renderTasks();
