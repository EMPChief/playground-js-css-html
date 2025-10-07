/**
 * Navbar Module
 * Handles navbar injection and scroll behavior
 */

function injectNavbar() {
    const navbarContainer = document.getElementById('navbar-container');
    if (!navbarContainer) return;
    
    // Get current page to highlight active nav link
    const currentPage = window.location.pathname.split('/').pop();
    
    // Navbar HTML
    const navbarHTML = `
        <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
            <div class="container">
                <a class="navbar-brand" href="index.html">
                    <img src="logo/favicon-32x32.png" alt="Logo" width="32" height="32" class="d-inline-block align-text-top me-2">
                    Professional Portfolio
                </a>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <a class="nav-link ${currentPage === 'index.html' || currentPage === '' ? 'active' : ''}" href="index.html">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link ${currentPage === 'about.html' ? 'active' : ''}" href="about.html">About</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link ${currentPage === 'javaplay.html' ? 'active' : ''}" href="javaplay.html">Local Projects</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link ${currentPage === 'projects.html' ? 'active' : ''}" href="projects.html">Projects</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link ${currentPage === 'resume.html' ? 'active' : ''}" href="resume.html">Resume</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link ${currentPage === 'contact.html' ? 'active' : ''}" href="contact.html">Contact</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="../index.html"><i class="bi bi-arrow-left"></i> Back to Main</a>
                        </li>
                        <li class="nav-item">
                            <button class="btn btn-sm btn-outline-light ms-2" id="darkModeToggle">
                                <i class="bi bi-moon-stars"></i>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    `;
    
    navbarContainer.innerHTML = navbarHTML;
}

function initializeNavbarScroll() {
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
}
