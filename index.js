const projects = [
  {
    name: "01. Heart Trail Animation",
    icon: "fas fa-heart",
    link: "project01/index.html",
  },
  {
    name: "02. Auto Text Effect Animation",
    icon: "fas fa-pen",
    link: "project02/index.html",
  },
  {
    name: "03. Mini Calender",
    icon: "fas fa-calendar",
    link: "project03/index.html",
  },
  {
    name: "04. Button Ripple Effect",
    icon: "fas fa-bolt",
    link: "project04/index.html",
  },
  {
    name: "05. Random Image Generator",
    icon: "fas fa-image",
    link: "project05/index.html",
  },
  {
    name: "06. Dark Mode",
    icon: "fas fa-moon",
    link: "project06/index.html",
  },
  {
    name: "07. Dad Jokes Generator",
    icon: "fas fa-quote-right",
    link: "project07/index.html",
  },
  {
    name: "08. Feedback UI",
    icon: "fas fa-comments",
    link: "project08/index.html",
  },
  {
    name: "09. Weather App",
    icon: "fas fa-sun",
    link: "project09/index.html",
  },
  {
    name: "10. Todo List",
    icon: "fas fa-list",
    link: "project10/index.html",
  },
];

const projectList = document.getElementById("projectList");

projects.forEach((project) => {
  const card = document.createElement("div");
  card.className = "col-md-6 col-lg-4 mb-4";
  card.innerHTML = `
        <div class="card project-card h-100">
            <div class="card-body text-center">
                <i class="${project.icon} project-icon"></i>
                <h5 class="card-title">${project.name}</h5>
                <a href="${project.link}" class="btn btn-primary">View Project</a>
            </div>
        </div>
    `;
  projectList.appendChild(card);
});
