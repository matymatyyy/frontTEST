// Page loader
window.addEventListener('load', function() {
    const loader = document.getElementById('pageLoader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1000);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button and header effects
window.addEventListener('scroll', function() {
    const scrollTop = document.getElementById('scrollTop');
    const header = document.querySelector('.header');
    
    // Scroll to top button visibility
    if (window.scrollY > 300) {
        scrollTop.classList.add('visible');
    } else {
        scrollTop.classList.remove('visible');
    }
    
    // Header background change on scroll
    if (window.scrollY > 50) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 30px rgba(0,0,0,0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 30px rgba(0,0,0,0.05)';
    }
});

// Intersection Observer for one-time animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const oneTimeObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            // Stop observing once animated
            oneTimeObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply fade-in-once animation to elements
document.querySelectorAll('.fade-in-once').forEach(el => {
    oneTimeObserver.observe(el);
});

// Stats counter animation function
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.innerHTML = current.toLocaleString() + '+';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Stats section animation observer
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true';
            const counters = entry.target.querySelectorAll('h3');
            const values = ["38+", "7", "2013", "1996"];
            
            counters.forEach((counter, index) => {
                if (index === 0) {
                    animateCounter(counter, 0, 38, 2000);
                } else if (index === 1) {
                    animateCounter(counter, 0, 7, 1500);
                } else {
                    counter.style.opacity = '0';
                    counter.innerHTML = values[index];
                    setTimeout(() => {
                        counter.style.transition = 'opacity 1s ease';
                        counter.style.opacity = '1';
                    }, index * 300);
                }
            });
            
            statsObserver.unobserve(entry.target);
        }
    });
});

// Observe stats section for counter animation
const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Hover effects for stat items
document.querySelectorAll('.stat-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Social links hover effects
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.background = 'linear-gradient(135deg, #003366, #0066cc)';
        this.style.transform = 'translateY(-3px)';
    });
    link.addEventListener('mouseleave', function() {
        this.style.background = 'rgba(255,255,255,0.1)';
        this.style.transform = 'translateY(0)';
    });
});

// Footer links hover effects
document.querySelectorAll('.footer-section ul li a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.color = '#0066cc';
        this.style.paddingLeft = '10px';
        this.style.transition = 'all 0.3s ease';
    });
    link.addEventListener('mouseleave', function() {
        this.style.color = '#a0aec0';
        this.style.paddingLeft = '0';
    });
});