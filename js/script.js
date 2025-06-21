document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('show');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.header')) {
            if (navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
            }
        }
    });
    
    // Handle smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
            }
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Skip if it's just "#"
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Add some offset to account for the fixed header
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Accordion functionality
    const accordions = document.querySelectorAll('.accordion');
    
    accordions.forEach(accordion => {
        const header = accordion.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            // Check if this accordion is already active
            const isActive = accordion.classList.contains('active');
            
            // Close all accordions
            accordions.forEach(item => {
                item.classList.remove('active');
            });
            
            // If the clicked accordion wasn't active, make it active
            if (!isActive) {
                accordion.classList.add('active');
            }
        });
    });
    
    // Copy contract address functionality
    const copyBtn = document.querySelector('.copy-btn');
    const addressEl = document.querySelector('.address');
    
    if (copyBtn && addressEl) {
        copyBtn.addEventListener('click', function() {
            const address = addressEl.textContent;
            navigator.clipboard.writeText(address)
                .then(() => {
                    // Change button text temporarily
                    const originalText = copyBtn.textContent;
                    copyBtn.textContent = 'Copied!';
                    
                    setTimeout(() => {
                        copyBtn.textContent = originalText;
                    }, 2000);
                })
                .catch(err => {
                    console.error('Failed to copy:', err);
                });
        });
    }
    
    // Animated entrance for elements when they come into view
    const observerOptions = {
        threshold: 0.25
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Once the animation has played, no need to observe anymore
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Elements to animate
    const animateElements = document.querySelectorAll('.card, .roadmap-card, .step-card, .social-card, .section-title, .story-card');
    
    animateElements.forEach(element => {
        // Add the animation class
        element.classList.add('animate-on-scroll');
        // Start observing the element
        observer.observe(element);
    });
    
    // Add animation classes for different elements
    document.querySelectorAll('.card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    document.querySelectorAll('.roadmap-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Handle the marquee for small screens
    function handleMarquee() {
        const marqueeContent = document.querySelector('.marquee-content');
        if (marqueeContent) {
            const firstSpan = marqueeContent.querySelector('span');
            if (firstSpan) {
                // Calculate how many spans needed to fill the screen
                const spanWidth = firstSpan.offsetWidth;
                const screenWidth = window.innerWidth;
                const spansNeeded = Math.ceil(screenWidth / spanWidth) * 2; // Multiply by 2 for better coverage
                
                // Clear existing spans
                marqueeContent.innerHTML = '';
                
                // Add the required number of spans
                for (let i = 0; i < spansNeeded; i++) {
                    const span = document.createElement('span');
                    span.innerHTML = 'GET EMERSON&nbsp;';
                    marqueeContent.appendChild(span);
                }
            }
        }
    }
    
    // Handle marquee on load and resize
    handleMarquee();
    window.addEventListener('resize', handleMarquee);
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        
        .animate-on-scroll.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        @keyframes fadeSlideUp {
            from {
                opacity: 0;
                transform: translateY(40px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}); 