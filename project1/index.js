// Velger body-elementet i dokumentet
const bodyElement = document.querySelector("body");

// Legger til en hendelse som skjer når musen beveger seg over body-elementet
bodyElement.addEventListener("mousemove", (event) => {
  // Henter musens X- og Y-posisjon
  const xPosition = event.clientX;
  const yPosition = event.clientY;

  // Oppretter et nytt span-element
  const spanElement = document.createElement("span");

  // Plasserer span-elementet på musens posisjon
  spanElement.style.left = `${xPosition}px`;
  spanElement.style.top = `${yPosition}px`;

  // Setter en tilfeldig størrelse for span-elementet
  const size = Math.random() * 100;
  spanElement.style.width = `${size}px`;
  spanElement.style.height = `${size}px`;

  // Legger span-elementet til i body
  bodyElement.appendChild(spanElement);

  // Fjerner span-elementet etter 3 sekunder
  setTimeout(() => {
    spanElement.remove();
  }, 3000);
});
