/**
 * Footer Module
 * Handles footer injection
 */

function injectFooter() {
    const footerContainer = document.getElementById('footer-container');
    if (!footerContainer) return;
    
    // Footer HTML
    const footerHTML = `
        <footer class="footer py-4">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-md-4 text-center text-md-start">
                        <span class="copyright">© ${new Date().getFullYear()} Bjørn-Magne Kristensen</span>
                    </div>
                    <div class="col-md-4 text-center">
                        <ul class="social-buttons list-inline mb-0">
                            <li class="list-inline-item">
                                <a href="https://github.com/empchief" class="btn btn-outline-light btn-social">
                                    <i class="bi bi-github"></i>
                                </a>
                            </li>
                            <li class="list-inline-item">
                                <a href="https://www.linkedin.com/in/bj%C3%B8rn-magne-kristensen-884b2a225/" class="btn btn-outline-light btn-social">
                                    <i class="bi bi-linkedin"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="col-md-4 text-center text-md-end">
                        <p>
                            <small>Industrial Professional & Developer</small>
                        </p>
                        <a href="../index.html" class="text-white text-decoration-none">
                            <small><i class="bi bi-arrow-left"></i> Return to Main Portfolio</small>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    `;
    
    footerContainer.innerHTML = footerHTML;
}
