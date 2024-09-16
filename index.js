const projects = [
  {
    name: "Heart Trail Animation",
    icon: "fas fa-heart",
    link: "project1/index.html",
  },
  {
    name: "Auto Text Effect Animation",
    icon: "fas fa-pen",
    link: "project2/index.html",
  },
  {
    name: "Mini Calender",
    icon: "fas fa-calendar",
    link: "project3/index.html",
  },
  {
    name: "Button Ripple Effect",
    icon: "fas fa-bolt",
    link: "project4/index.html",
  },
  {
    name: "Random Image Generator",
    icon: "fas fa-image",
    link: "project5/index.html",
  },
  {
    name: "Dark Mode",
    icon: "fas fa-moon",
    link: "project6/index.html",
  },
  {
    name: "Background Slider",
    icon: "fas fa-palette",
    link: "project7/index.html",
  },
  {
    name: "Responsive Navigation Menu",
    icon: "fas fa-bars",
    link: "project8/index.html",
  },
  {
    name: "Responsive Sticky Navigation",
    icon: "fas fa-arrow-up",
    link: "project9/index.html",
  },
  {
    name: "Animated Progress Bar",
    icon: "fas fa-chart-bar",
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
