// Smooth Scroll Animation Observer
document.addEventListener("DOMContentLoaded", function() {
    const animatedElements = document.querySelectorAll(".animated");

    const observerOptions = {
        root: null,
        rootMargin: "0px 0px -100px 0px",
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));
});

// Smooth Scroll Navigation
document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const offset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Dynamic Island Navbar Effect
document.addEventListener("DOMContentLoaded", function() {
    const navbar = document.querySelector('.navbar');
    const homeSection = document.querySelector('#home');
    let isHovering = false;

    // Set initial state
    navbar.classList.add('expanded');

    // Track hover state
    navbar.addEventListener('mouseenter', () => {
        isHovering = true;
        navbar.classList.remove('collapsed');
        navbar.classList.add('expanded');
    });

    navbar.addEventListener('mouseleave', () => {
        isHovering = false;
        checkNavbarState();
    });

    // Check navbar state on scroll
    function checkNavbarState() {
        if (isHovering) return;

        const homeRect = homeSection.getBoundingClientRect();
        const isInHome = homeRect.bottom > 100;

        if (isInHome) {
            navbar.classList.remove('collapsed');
            navbar.classList.add('expanded');
        } else {
            navbar.classList.remove('expanded');
            navbar.classList.add('collapsed');
        }
    }

    // Listen to scroll
    window.addEventListener('scroll', checkNavbarState);
    
    // Initial check
    checkNavbarState();
});

// Mouse Movement Parallax Effect for Cards (excluding profile card)
document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll('.card:not(.profile-card)');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 25;
            const rotateY = (centerX - x) / 25;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
});

// Cursor Glow Effect
document.addEventListener("DOMContentLoaded", function() {
    const cursorGlow = document.createElement('div');
    cursorGlow.style.cssText = `
        position: fixed;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%);
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s ease;
        opacity: 0;
    `;
    document.body.appendChild(cursorGlow);

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorGlow.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
    });

    function animateGlow() {
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;

        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top = glowY + 'px';

        requestAnimationFrame(animateGlow);
    }

    animateGlow();
});

// Form Validation and Submit Animation
document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitButton = this.querySelector('.btn-primary');
            const originalText = submitButton.textContent;

            submitButton.textContent = 'Đang gửi...';
            submitButton.style.opacity = '0.7';
            submitButton.style.pointerEvents = 'none';

            setTimeout(() => {
                submitButton.textContent = '✓ Đã gửi!';
                submitButton.style.background = 'linear-gradient(135deg, #10b981 0%, #34d399 100%)';

                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.style.opacity = '1';
                    submitButton.style.pointerEvents = 'auto';
                    submitButton.style.background = 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)';
                    contactForm.reset();
                }, 2000);
            }, 1500);
        });
    }
});

// Skill Cards Stagger Animation
document.addEventListener("DOMContentLoaded", function() {
    const skillCards = document.querySelectorAll('.skill-card');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1
    });

    skillCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        skillObserver.observe(card);
    });
});

// Profile Image - Remove Parallax Effect
// Parallax effect removed for profile image

// Add Loading Animation for Images
document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll('img');

    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';

        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });

        if (img.complete) {
            img.style.opacity = '1';
        }
    });
});

// Dynamic Text Gradient Animation
document.addEventListener("DOMContentLoaded", function() {
    const gradientTexts = document.querySelectorAll('.section-title, #home h1');

    gradientTexts.forEach(text => {
        let hue = 0;

        setInterval(() => {
            hue = (hue + 1) % 360;
            // Subtle hue shift for a more dynamic feel
        }, 50);
    });
});

// Console Easter Egg
console.log('%c🎨 Portfolio Design by Gia Bao', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cLooking for something? Check out the source code! 👨‍💻', 'color: #8b5cf6; font-size: 14px;');