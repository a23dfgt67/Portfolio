
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

// 3D Gallery Functionality with Modal
const imageData = [
    {
        url: 's1.png',
        title: 'Graphic Designs',
        desc: '🎨 I create modern and eye-catching graphic designs tailored to your brand.✨ From logos to social media posts, I deliver designs that stand out.⚡ Fast delivery with unlimited creativity.📈 Designs that attract, engage, and convert your audience.💼 Professional, unique, and 100% original work guaranteed.'
    },
    {
        url: 's2.png',
        title: 'SEO',
        desc: '🚀 I provide powerful SEO strategies to boost your website ranking.🔍 Keyword research & on-page optimization for maximum visibility.📊 High-quality backlinks to increase domain authority.📈 Drive organic traffic that converts into sales.💼 Proven SEO techniques with measurable results.'
    },
    {
        url: 's3.png',
        title: 'Digital Marketing',
        desc: '📢 I create result-driven digital marketing strategies for your business.📈 Social media, SEO, and ads to grow your online presence.🎯 Targeted campaigns to reach the right audience.💡 Creative content that engages and converts.💼 Professional service with measurable growth results.'
    },
    {
        url: 's4.png',
        title: 'Video Editing',
        desc: '🎬 I provide professional and cinematic video editing for all platforms.✨ Smooth transitions, effects, and color grading for a polished look.🎶 Perfect sound sync, background music, and subtitles included.⚡ Fast delivery with top-quality results.💼 Engaging edits that tell your story and boost your brand.'
    },
    {
        url: 's5.png',
        title: 'Instagram & Facebook ad campaigns',
        desc: '📢 I create high-converting Instagram & Facebook ad campaigns.🎯 Targeted audience research to maximize ROI.📊 Eye-catching ad creatives & compelling copy.⚡ Optimized campaigns for sales, leads, and engagement.💼 Data-driven strategies with measurable results.'
    },
    {
        url: 's6.png',
        title: 'Web Development',
        desc: '💻 I design and develop modern, responsive, and user-friendly websites.⚡ From business sites to eCommerce stores, I build it all.🎨 Clean design with smooth functionality for the best user experience.📈 SEO-friendly and fully optimized for speed & performance.💼 Professional websites that grow your brand and business.'
    }
];

function initGallery() {
    const galleryTrack = document.getElementById('galleryTrack');
    const previewPanel = document.getElementById('previewPanel');
    const previewImg = document.getElementById('previewImg');
    const previewTitle = document.getElementById('previewTitle');
    const previewDesc = document.getElementById('previewDesc');
    const pauseBtn = document.getElementById('pauseBtn');
    const resumeBtn = document.getElementById('resumeBtn');
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modalImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const closeBtn = document.getElementById('closeBtn');

    // Create gallery items
    const angleIncrement = (Math.PI * 2) / imageData.length;
    
    imageData.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        
        // Position items in a circle
        const angle = angleIncrement * index;
        const radius = Math.min(window.innerWidth, window.innerHeight) * 0.3;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        galleryItem.style.transform = `translate(-50%, -50%) translateX(${x}px) translateZ(${z}px) rotateY(${-angle * (180/Math.PI)}deg)`;
        
        // Create image element
        const img = document.createElement('img');
        img.className = 'gallery-img';
        img.src = item.url;
        img.alt = item.title;
        
        // Add hover event to show side preview
        galleryItem.addEventListener('mouseenter', () => {
            showPreview(item);
        });
        
        // Add click event to show modal
        galleryItem.addEventListener('click', () => {
            showModal(item);
        });
        
        galleryItem.appendChild(img);
        galleryTrack.appendChild(galleryItem);
    });
    
    // Show side preview panel
    function showPreview(item) {
        previewImg.src = item.url;
        previewTitle.textContent = item.title;
        previewDesc.textContent = item.desc;
        previewPanel.classList.add('active');
        galleryTrack.style.animationPlayState = 'paused';
    }
    
    // Hide side preview panel
    function hidePreview() {
        previewPanel.classList.remove('active');
        galleryTrack.style.animationPlayState = 'running';
    }
    
    // Show modal preview
    function showModal(item) {
        modalImg.src = item.url;
        modalTitle.textContent = item.title;
        modalDesc.textContent = item.desc;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Pause gallery rotation when modal is open
        galleryTrack.style.animationPlayState = 'paused';
    }
    
    // Hide modal preview
    function hideModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Resume gallery rotation when modal is closed
        if (!previewPanel.classList.contains('active')) {
            galleryTrack.style.animationPlayState = 'running';
        }
    }
    
    // Event listeners
    pauseBtn.addEventListener('click', () => {
        galleryTrack.style.animationPlayState = 'paused';
    });
    
    resumeBtn.addEventListener('click', () => {
        galleryTrack.style.animationPlayState = 'running';
    });
    
    closeBtn.addEventListener('click', hideModal);
    
    // Close modal when clicking outside content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModal();
        }
    });
    
    // Hide preview when mouse leaves gallery track
    galleryTrack.addEventListener('mouseleave', hidePreview);
    
    // Responsive adjustments
    window.addEventListener('resize', () => {
        const galleryItems = document.querySelectorAll('.gallery-item');
        const angleIncrement = (Math.PI * 2) / galleryItems.length;
        const radius = Math.min(window.innerWidth, window.innerHeight) * 0.3;
        
        galleryItems.forEach((item, index) => {
            const angle = angleIncrement * index;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            
            item.style.transform = `translate(-50%, -50%) translateX(${x}px) translateZ(${z}px) rotateY(${-angle * (180/Math.PI)}deg)`;
        });
    });
    
    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            hideModal();
        }
    });
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', initGallery);


document.addEventListener('DOMContentLoaded', function() {
    const heroImage = document.querySelector('.hero-image img');
    const heroSection = document.querySelector('.hero');

    let isZoomed = false;

    // 🟢 Default tilt
    heroImage.style.transform = 'perspective(1000px) rotateY(50deg) rotateX(50deg) scale(1)';

    // Hero section hover → straight ho jaye (no tilt)
    heroSection.addEventListener('mouseenter', function() {
        const zoom = isZoomed ? 1.05 : 1;
        heroImage.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) scale(${zoom})`;
    });

    heroSection.addEventListener('mouseleave', function() {
        isZoomed = false;
        heroImage.style.transform = 'perspective(1000px) rotateY(50deg) rotateX(50deg) scale(1)';
    });

    // Sirf image par hover → thoda zoom
    heroImage.addEventListener('mouseenter', function() {
        isZoomed = true;
        heroImage.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1.05)'; // zoom value adjust karo
    });

    heroImage.addEventListener('mouseleave', function() {
        isZoomed = false;
        heroImage.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)'; 
    });
});

function showProject(projectId) {
            // Hide all project details first
            document.querySelectorAll('.project-detail').forEach(project => {
                project.style.display = 'none';
            });
            
            // Show the selected project
            document.getElementById(projectId).style.display = 'block';
            
            // Scroll to the project detail section
            document.getElementById(projectId).scrollIntoView({behavior: 'smooth'});
        }
        
        function hideProject(projectId) {
            // Hide the project detail
            document.getElementById(projectId).style.display = 'none';
            
            // Scroll back to the portfolio section
            document.getElementById('portfolio').scrollIntoView({behavior: 'smooth'});
}

    const backToTopBtn = document.getElementById("backToTopBtn");

    // Click par smooth scroll top
    backToTopBtn.querySelector(".button").addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Scroll check: 300px ke baad button dikhayega
    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    });
