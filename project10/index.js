const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const inputButton = document.getElementById("input-button");

// Funksjon for legg til elementer i listen
function addTask() {
  // Sjekker at inputfelt ikke er tomt
  if (inputBox.value === "") {
    alert("You must write something!");
  } else {
    // Legger til element i listen
    let li = document.createElement("li");
    li.classList.add("todo-item");
    li.innerHTML = inputBox.value;
    // Legger til en span for å fjerne elementet
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    span.classList.add("spancss");
    // Legger til elementet i listen
    li.appendChild(span);
    listContainer.appendChild(li);
    inputBox.value = "";

    // Lagrer listen i localStorage
    saveData();
  }
}

// Event listener for clicks on the list container
listContainer.addEventListener("click", function (e) {
  // Sjekker om elementet er en li eller en span
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("completed");
    // Lagrer listen i localStorage
    saveData();
  } else if (e.target.tagName === "SPAN") {
    // Fjerner elementet
    e.target.parentElement.remove();
    // Lagrer listen i localStorage
    saveData();
  }
});

// Funksjon for lagring av listen i localStorage
function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

// Funksjon for visning av listen i localStorage
function showData() {
  listContainer.innerHTML = localStorage.getItem("data");
}
// Viser listen i localStorage når siden lastes inn
showData();
