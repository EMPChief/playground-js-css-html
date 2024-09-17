const buttonElement = document.querySelector(".btn");
buttonElement.addEventListener("mouseover", (event) => {
  const xPos = event.pageX - buttonElement.offsetLeft;
  const yPos = event.pageY - buttonElement.offsetTop;
  buttonElement.style.setProperty("--xPos", xPos + "px");
  buttonElement.style.setProperty("--yPos", yPos + "px");
});
