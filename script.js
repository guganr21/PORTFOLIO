// DOM Elements
const navLinks = document.querySelector('.nav-links');
const menuToggle = document.querySelector('.menu-toggle');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('form-message');
const projectsContainer = document.getElementById('projects-container');

// GitHub API Configuration
// For demonstration, using 'facebook' to fetch public repositories
const GITHUB_USERNAME = 'guganr21'; // Change this to any GitHub username
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`;

// Toggle mobile menu
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.querySelector('i').classList.toggle('fa-bars');
    menuToggle.querySelector('i').classList.toggle('fa-times');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.querySelector('i').classList.add('fa-bars');
        menuToggle.querySelector('i').classList.remove('fa-times');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});


<!-- FEEDBACK -->
<section id="feedback">
<div class="container card">
<h2 class="section-title">Feedback</h2>

<form class="feedback-form" id="feedbackForm">
<input type="text" id="name" placeholder="Your Name" required>
<input type="email" id="email" placeholder="Your Email" required>
<textarea rows="4" id="message" placeholder="Your Feedback" required></textarea>
<button type="submit">Submit Feedback</button>
</form>

<div class="feedback-status" id="status"></div>
</div>
</section>

<footer style="text-align:center;padding:20px;color:var(--muted)">
© 2026 Gugan R
</footer>

<script>
/* 🔗 SUPABASE CONFIG */
const supabaseUrl = "https://wbnjqitvuhzqycboxnmn.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndibmpxaXR2dWh6cXljYm94bm1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzOTI3OTYsImV4cCI6MjA4Njk2ODc5Nn0.cz1loMqT5Ktin1OifhQ5jWUghoRTGYYW1aKi9TbEAgc";

const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

/* 📨 FEEDBACK SUBMIT */
document.getElementById("feedbackForm").addEventListener("submit", async (e) => {
e.preventDefault();

const status = document.getElementById("status");
status.innerText = "Submitting...";

const name = document.getElementById("name").value;
const email = document.getElementById("email").value;
const message = document.getElementById("message").value;

const { error } = await supabaseClient
.from("feedbacks")
.insert([{ name, email, message }]);

if (error) {
status.innerText = "❌ Error submitting feedback";
status.style.color = "red";
} else {
status.innerText = "✅ Feedback submitted successfully!";
status.style.color = "#00d4ff";
e.target.reset();
}});
</script>

</body>
</html>

// Function to fetch GitHub projects
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
const PROJECT_WEBSITES = {
    "IQ-TEST": "https://iqtest-nu.vercel.app/",
    "Quiz-Website":"https://quizbygugan.vercel.app/",
        "SIP-CALCULATOR": "https://sip---calculator.vercel.app/",

    //add exact repo name
    
};

// Function to create a project card
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
            <a href="${project.html_url}" target="_blank" class="project-link">
    View Project
</a>

${PROJECT_WEBSITES[project.name] ? `
<a href="${PROJECT_WEBSITES[project.name]}" target="_blank" class="project-link">
    Visit Website
</a>
` : ''}

            <div class="project-stats">
                <span><i class="fas fa-star"></i> ${project.stargazers_count}</span>
                <span><i class="fas fa-code-branch"></i> ${project.forks_count}</span>
                <span><i class="far fa-calendar-alt"></i> ${updatedDate}</span>
            </div>
        </div>
    `;
    
    return card;
}

// Function to display sample projects if GitHub API fails
function displaySampleProjects() {
    const sampleProjects = [
        {
            name: "E-Commerce Website",
            description: "A fully responsive e-commerce website with shopping cart and payment integration.",
            html_url: "#",
            stargazers_count: 24,
            forks_count: 8,
            updated_at: new Date().toISOString()
        },
        {
            name: "Task Manager App",
            description: "A productivity app for managing daily tasks with drag-and-drop functionality.",
            html_url: "#",
            stargazers_count: 18,
            forks_count: 5,
            updated_at: new Date().toISOString()
        },
        {
            name: "Weather Dashboard",
            description: "A weather application that displays forecasts for multiple cities using a weather API.",
            html_url: "#",
            stargazers_count: 12,
            forks_count: 3,
            updated_at: new Date().toISOString()
        },
        {
            name: "Portfolio Website",
            description: "A responsive portfolio website with dark/light mode and animated sections.",
            html_url: "#",
            stargazers_count: 8,
            forks_count: 2,
            updated_at: new Date().toISOString()
        },
        {
            name: "Recipe Finder",
            description: "An application that helps users find recipes based on ingredients they have.",
            html_url: "#",
            stargazers_count: 15,
            forks_count: 6,
            updated_at: new Date().toISOString()
        },
        {
            name: "Budget Tracker",
            description: "A financial application for tracking expenses and managing monthly budgets.",
            html_url: "#",
            stargazers_count: 21,
            forks_count: 9,
            updated_at: new Date().toISOString()
        }
    ];
    
    sampleProjects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsContainer.appendChild(projectCard);
    });
    
    // Update links to prevent navigation
    document.querySelectorAll('.project-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            alert('This is a sample project. In a real implementation, this would link to the actual GitHub repository.');
        });
    });
}

// Scroll animation for elements
function animateElements() {
    const elements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}


// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Fetch GitHub projects
    fetchGitHubProjects();
    
    // Add fade-in class to elements for scroll animation
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('fade-in');
    });
    
    // Initial animation trigger
    setTimeout(() => {
        animateElements();
    }, 500);
});
