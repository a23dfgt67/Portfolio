
        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Mobile menu toggle
        const menuBtn = document.querySelector('.menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        menuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when clicking a link
        const navItems = document.querySelectorAll('.nav-links li a');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                navLinks.classList.remove('active');
            });
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Animation on scroll
        const animateOnScroll = function() {
            const elements = document.querySelectorAll('.service-card, .portfolio-item, .blog-card');
            
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementPosition < windowHeight - 100) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        };
        
        // Initialize elements with opacity 0 for animation
        document.querySelectorAll('.service-card, .portfolio-item, .blog-card').forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.5s ease';
        });
        
        window.addEventListener('scroll', animateOnScroll);
        window.addEventListener('load', animateOnScroll);
        // --- Form Submission Feedback ---
const form = document.querySelector('form');
const submitBtn = document.querySelector('.submit-btn');

// Success message element
const successMessage = document.createElement('p');
successMessage.textContent = "✅ Message sent successfully!";
successMessage.style.color = "green";
successMessage.style.marginTop = "15px";
successMessage.style.display = "none";
form.appendChild(successMessage);

form.addEventListener('submit', function (e) {
    e.preventDefault(); // Stop default form submission

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    const formData = new FormData(form);

    fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            successMessage.style.display = "block";
            form.reset();
        } else {
            successMessage.textContent = "❌ Failed to send message.";
            successMessage.style.color = "red";
            successMessage.style.display = "block";
        }
        submitBtn.textContent = "Send Message";
        submitBtn.disabled = false;
    }).catch(error => {
        successMessage.textContent = "❌ Error occurred.";
        successMessage.style.color = "red";
        successMessage.style.display = "block";
        submitBtn.textContent = "Send Message";
        submitBtn.disabled = false;
    });
});


// Expertise section animation
const expertiseObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const cards = document.querySelectorAll('.expertise-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('in-view');
                }, index * 100);
            });
            expertiseObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

const expertiseSection = document.querySelector('.expertise');
if (expertiseSection) {
    expertiseObserver.observe(expertiseSection);
}
