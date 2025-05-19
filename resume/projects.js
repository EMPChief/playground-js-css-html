// Project data structure
const projects = [
  {
    id: 1,
    title: "Upload Picture",
    description:
      "This is a simple web application that allows users to upload pictures to a database and display them on a page, it's a simple project that i made to try laravel and vue for the first time.",
    category: "web",
    images: [
      "./logo/projects/vuefront1.png",
      "./logo/projects/vuefront2.png",
      "./logo/projects/vuefront3.png",
      "./logo/projects/vuefront4.png",
      "./logo/projects/vuefront5.png",
      "./logo/projects/vuefront6.png",
      "./logo/projects/vuefront7.png",
    ],
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "API Integration",
      "Vue",
      "Laravel",
      "MySQL",
    ],
    liveDemo: "https://vuefrontendup.bjornmagne.tech/login",
    githubRepo: "none",
  },
  {
    id: 2,
    title: "Task Manager",
    description:
      "This is a terminal based task manager that uses json for storage, it has a login system and multilanguage support that i made to try out designing and coding an application from scratch so it's a bit over engineered.",
    category: "terminal",
    images: [
      "./logo/projects/taskmanager1.png",
      "./logo/projects/taskmanager2.png",
      "./logo/projects/taskmanager3.png",
      "./logo/projects/taskmanager4.png",
      "./logo/projects/taskmanager05.png",
      "./logo/projects/taskmanager5.png",
      "./logo/projects/taskmanager6.png",
      "./logo/projects/taskmanager7.png",
      "./logo/projects/taskmanager8.png",
      "./logo/projects/taskmanager9.png",
      "./logo/projects/taskmanager10.png",
    ],
    technologies: ["Python", "Terminal", "JSON", "Multilanguage"],
    liveDemo: "none",
    githubRepo: "https://github.com/EMPChief/MyProject/tree/main/tasks",
  },
  {
    id: 3,
    title: "Playing with LLM",
    description:
      "A simple python that is a chatbot gui i made when i got a bit intrested in llm and wanted to try to play with tkinter and openai api, it is a simple chatbot that uses the openai api to generate responses and show it in a gui.",
    category: "terminal",
    images: ["./logo/projects/playing-with-llm.png"],
    technologies: ["Python", "Tkinter", "OpenAI"],
    liveDemo: "none",
    githubRepo: "https://github.com/EMPChief/Python-Playing-With-LLM",
  },
];

// Function to create project card HTML
function createProjectCard(project) {
  return `
        <div class="col-md-6 col-lg-4" data-category="${project.category}">
            <div class="card h-100 project-card">
                <div class="project-image-container" style="position: relative; cursor: pointer;" 
                     onclick="openImageModal(${project.id})">
                    <img src="${project.images[0]}" class="card-img-top" alt="${
    project.title
  }" 
                         onerror="this.src='https://via.placeholder.com/300x200?text=Project+Image'">
                    <div class="image-overlay">
                        <div class="d-flex flex-column align-items-center">
                            <i class="bi bi-images"></i>
                            <small class="text-white mt-2">${
                              project.images.length
                            } images</small>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${project.title}</h5>
                    <div class="project-description">
                        <p class="card-text description-text">${
                          project.description
                        }</p>
                        <button class="btn btn-link btn-sm show-more-btn p-0" onclick="toggleDescription(this)" style="display: none;">
                            Show More
                        </button>
                    </div>
                    <div class="mb-3">
                        ${project.technologies
                          .map(
                            (tech) =>
                              `<span class="badge bg-primary me-1">${tech}</span>`
                          )
                          .join("")}
                    </div>
                    <div class="d-flex justify-content-center gap-2">
                        ${
                          project.liveDemo && project.liveDemo !== "none"
                            ? `
                            <a href="${project.liveDemo}" class="btn btn-primary" target="_blank">
                                <i class="bi bi-link-45deg"></i> Live Demo
                            </a>
                        `
                            : ""
                        }
                        ${
                          project.githubRepo && project.githubRepo !== "none"
                            ? `
                            <a href="${project.githubRepo}" class="btn btn-outline-primary" target="_blank">
                                <i class="bi bi-github"></i> GitHub
                            </a>
                        `
                            : ""
                        }
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Function to create image modal HTML
function createImageModal() {
  const modalHTML = `
        <div class="modal fade" id="imageModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Project Images</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div id="imageCarousel" class="carousel slide" data-bs-ride="carousel">
                            <div class="carousel-inner">
                                <!-- Images will be inserted here -->
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#imageCarousel" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#imageCarousel" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                        <div class="carousel-indicators-container mt-3">
                            <!-- Indicators will be inserted here -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
  document.body.insertAdjacentHTML("beforeend", modalHTML);
}

// Function to open image modal
function openImageModal(projectId) {
  const project = projects.find((p) => p.id === projectId);
  if (!project) return;

  const carouselInner = document.querySelector(
    "#imageCarousel .carousel-inner"
  );
  const indicatorsContainer = document.querySelector(
    ".carousel-indicators-container"
  );

  // Create carousel items
  carouselInner.innerHTML = project.images
    .map(
      (image, index) => `
        <div class="carousel-item ${index === 0 ? "active" : ""}">
            <img src="${image}" class="d-block w-100" alt="${
        project.title
      } - Image ${index + 1}"
                 onerror="this.src='https://via.placeholder.com/800x400?text=Project+Image'">
        </div>
    `
    )
    .join("");

  // Create indicators
  indicatorsContainer.innerHTML = project.images
    .map(
      (_, index) => `
        <button type="button" 
                data-bs-target="#imageCarousel" 
                data-bs-slide-to="${index}" 
                class="btn btn-sm btn-outline-primary mx-1 ${
                  index === 0 ? "active" : ""
                }"
                aria-label="Slide ${index + 1}">
            ${index + 1}
        </button>
    `
    )
    .join("");

  const modal = new bootstrap.Modal(document.getElementById("imageModal"));
  modal.show();
}

// Function to render projects
function renderProjects(filter = "all") {
  const projectsGrid = document.getElementById("projectsGrid");
  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  projectsGrid.innerHTML = filteredProjects
    .map((project) => createProjectCard(project))
    .join("");
}

// Function to handle filter clicks
function setupFilters() {
  const filterButtons = document.querySelectorAll("#projectFilters button");
  filterButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      e.target.classList.add("active");
      renderProjects(e.target.dataset.filter);
    });
  });
}

// Function to add a new project
function addProject(project) {
  projects.push(project);
  renderProjects();
}

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  createImageModal();
  renderProjects();
  setupFilters();
  setTimeout(checkTextOverflow, 100);
});

// Example of how to add a new project:
/*
addProject({
    id: 4,
    title: "New Project",
    description: "Description of the new project",
    category: "web",
    image: "assets/new-project.jpg",
    technologies: ["React", "Node.js"],
    liveDemo: "https://new-project-demo.com",
    githubRepo: "https://github.com/yourusername/new-project"
});
*/

// Add this new function to handle the show more/less toggle
function toggleDescription(button) {
  const descriptionText = button.previousElementSibling;
  const isExpanded = descriptionText.classList.contains("expanded");

  if (isExpanded) {
    descriptionText.classList.remove("expanded");
    button.textContent = "Show More";
  } else {
    descriptionText.classList.add("expanded");
    button.textContent = "Show Less";
  }
}

// Function to check if text is overflowing and show/hide the button accordingly
function checkTextOverflow() {
  const descriptions = document.querySelectorAll(".description-text");
  descriptions.forEach((description) => {
    const button = description.nextElementSibling;
    if (description.scrollHeight > description.clientHeight) {
      button.style.display = "inline-block";
    } else {
      button.style.display = "none";
    }
  });
}
