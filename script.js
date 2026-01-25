// DOM Elements
const navLinks = document.querySelector('.nav-links');
const menuToggle = document.querySelector('.menu-toggle');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('form-message');
const projectsContainer = document.getElementById('projects-container');

// GitHub API Configuration
const GITHUB_USERNAME = 'guganr21'; // Change this to any GitHub username
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`;

// Toggle mobile menu
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.querySelector('i').classList.toggle('fa-bars');
    menuToggle.querySelector('i').classList.toggle('fa-times');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.querySelector('i').classList.add('fa-bars');
        menuToggle.querySelector('i').classList.remove('fa-times');
    });
});
// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Contact form
contactForm.addEventListener('submit', e => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        showFormMessage('Please fill in all fields.', 'error');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
    }

    showFormMessage("Thank you for your message! I'll get back to you soon.", 'success');
    contactForm.reset();
});

function showFormMessage(text, type) {
    formMessage.textContent = text;
    formMessage.style.color = type === 'success' ? '#27ae60' : '#e74c3c';
    setTimeout(() => (formMessage.textContent = ''), 5000);
}

// Fetch GitHub Projects
async function fetchGitHubProjects() {
    try {
        const response = await fetch(GITHUB_API_URL);
        
        if(!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const projects = await response.json();
        
        // Clear loading message
        projectsContainer.innerHTML = '';
        
        // Display projects
        projects.forEach(project => {
            const projectCard = createProjectCard(project);
            projectsContainer.appendChild(projectCard);
        });
        
        // Add animation to project cards
        animateElements();
    } catch (error) {
        console.error('Error fetching GitHub projects:', error);
        projectsContainer.innerHTML = `
            <div class="error-message">
                <p>Unable to load projects from GitHub. Please check the username or try again later.</p>
                <p>Error: ${error.message}</p>
                <p>Displaying sample projects instead.</p>
            </div>
        `;
        
        // Display sample projects if API fails
        displaySampleProjects();

        }
}

// Create Project Card (UPDATED)
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card fade-in';
    
    // Format description (limit to 120 characters)
    let description = project.description || 'No description available.';
    if(description.length > 120) {
        description = description.substring(0, 120) + '...';
    }
    
    // Format date
    const updatedDate = new Date(project.updated_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    
    card.innerHTML = `
        <div class="project-header">
            <h3 class="project-name">${project.name}</h3>
            <p class="project-description">${description}</p>
        </div>
        <div class="project-footer">
            <a href="${project.html_url}" target="_blank" class="project-link">View Project</a>
            <div class="project-stats">
                <span><i class="fas fa-star"></i> ${project.stargazers_count}</span>
                <span><i class="fas fa-code-branch"></i> ${project.forks_count}</span>
                <span><i class="far fa-calendar-alt"></i> ${updatedDate}</span>
            </div>
        </div>
    `;
    
    return card;
}

// Sample projects fallback
function displaySampleProjects() {
    projectsContainer.innerHTML = '<p style="color:red">Unable to load GitHub projects.</p>';
}

// Scroll animation
function animateElements() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('visible'));
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    navbar.style.background =
        window.scrollY > 100 ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.95)';
});

// Init
document.addEventListener('DOMContentLoaded', () => {
    fetchGitHubProjects();
});
