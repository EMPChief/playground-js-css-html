const imageContainerElement = document.querySelector(".image-container"); // Velger elementet som inneholder bildene
const buttonElement = document.querySelector(".btn"); // Velger knappen

buttonElement.addEventListener("click", () => {
  let imageNumber = 4; // Antall nye bilder som skal legges til
  addNewImages(imageNumber); // Kaller funksjonen for å legge til nye bilder
});

function addNewImages(imageNumber) {
  for (let index = 0; index < imageNumber; index++) {
    const newImageElement = document.createElement("img"); // Lager et nytt bildelement
    newImageElement.src = `https://picsum.photos/300?random=${Math.floor(
      Math.random() * 3000
    )}`; // Setter kilden til bildet med en tilfeldig URL
    imageContainerElement.appendChild(newImageElement); // Legger til det nye bildelementet i containeren
  }
}
