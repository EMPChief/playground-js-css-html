// Cache DOM elements
const projectList = document.getElementById('projectList');
const projectTemplate = document.getElementById('projectTemplate');
const difficultyFilter = document.getElementById('difficultyFilter');
const technologyFilter = document.getElementById('technologyFilter');
const searchInput = document.getElementById('searchInput');

// Store all projects and filters
let allProjects = [];
let activeFilters = {
  difficulty: '',
  technology: '',
  search: ''
};

// Fetch and initialize projects
async function initializeProjects() {
  try {
    const response = await fetch('projects.json');
    const data = await response.json();
    allProjects = data.projects;
    
    // Initialize technology filter options
    const technologies = new Set();
    allProjects.forEach(project => {
      project.technologies.forEach(tech => technologies.add(tech));
    });
    
    technologies.forEach(tech => {
      const option = document.createElement('option');
      option.value = tech;
      option.textContent = tech;
      technologyFilter.appendChild(option);
    });
    
    renderProjects();
  } catch (error) {
    console.error('Error loading projects:', error);
    projectList.innerHTML = '<p class="text-center text-red-600">Error loading projects. Please try again later.</p>';
  }
}

// Filter projects based on active filters
function filterProjects() {
  return allProjects.filter(project => {
    const matchesDifficulty = !activeFilters.difficulty || project.difficulty === activeFilters.difficulty;
    const matchesTechnology = !activeFilters.technology || project.technologies.includes(activeFilters.technology);
    const matchesSearch = !activeFilters.search || 
      project.name.toLowerCase().includes(activeFilters.search.toLowerCase()) ||
      project.description.toLowerCase().includes(activeFilters.search.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(activeFilters.search.toLowerCase()));
    
    return matchesDifficulty && matchesTechnology && matchesSearch;
  });
}

// Create a tag element
function createTag(text) {
  const tag = document.createElement('span');
  tag.className = 'tag';
  tag.textContent = text;
  return tag;
}

// Render filtered projects
function renderProjects() {
  const filteredProjects = filterProjects();
  projectList.innerHTML = '';
  
  if (filteredProjects.length === 0) {
    projectList.innerHTML = '<p class="text-center text-gray-600 col-span-full">No projects match your filters.</p>';
    return;
  }
  
  filteredProjects.forEach(project => {
    const projectCard = projectTemplate.content.cloneNode(true);
    
    // Set project details
    const icon = projectCard.querySelector('.project-icon');
    icon.className = `${project.icon} project-icon`;
    
    const title = projectCard.querySelector('h2');
    title.textContent = project.name;
    
    const description = projectCard.querySelector('p');
    description.textContent = project.description;
    
    // Add tags
    const tagsContainer = projectCard.querySelector('.flex.flex-wrap');
    project.tags.forEach(tag => {
      tagsContainer.appendChild(createTag(tag));
    });
    
    // Set difficulty badge
    const difficultySpan = projectCard.querySelector('.difficulty');
    difficultySpan.textContent = project.difficulty.charAt(0).toUpperCase() + project.difficulty.slice(1);
    difficultySpan.classList.add(project.difficulty);

    // Set technologies
    const techSpan = projectCard.querySelector('.technologies');
    techSpan.textContent = project.technologies.join(', ');
    
    // Set link
    const link = projectCard.querySelector('a');
    link.href = project.link;
    
    projectList.appendChild(projectCard);
    });
}

// Event listeners for filters
difficultyFilter.addEventListener('change', (e) => {
  activeFilters.difficulty = e.target.value;
  renderProjects();
});

technologyFilter.addEventListener('change', (e) => {
  activeFilters.technology = e.target.value;
  renderProjects();
});

searchInput.addEventListener('input', debounce((e) => {
  activeFilters.search = e.target.value;
  renderProjects();
}, 300));

// Debounce function for search input
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Initialize the application
document.addEventListener('DOMContentLoaded', initializeProjects);