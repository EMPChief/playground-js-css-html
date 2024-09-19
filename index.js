// Henter prosjekter fra projects.json og viser dem på siden
fetch("projects.json")
  .then((response) => response.json()) // Konverterer data til JSON-format
  .then((projects) => {
    const projectList = document.getElementById("projectList");

    // Løkke som går gjennom hvert prosjekt og lager tilhørende kort
    projects.forEach((project) => {
      const card = document.createElement("div");
      card.className =
        "bg-white p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl";

      // Legger til HTML-innholdet for hvert prosjektkort
      card.innerHTML = `
        <div class="text-center">
            <i class="${project.icon} text-3xl text-indigo-600 mb-4"></i>
            <h5 class="text-xl font-semibold mb-3">${project.name}</h5>
            <a href="${project.link}" class="inline-block bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700">Check it out</a>
        </div>
      `;

      // Legger kortet til i prosjektlisten
      projectList.appendChild(card);
    });
  })
  .catch((error) => {
    console.error("Feil ved henting av prosjektdata:", error); // Logger feilen dersom henting mislykkes
  });
