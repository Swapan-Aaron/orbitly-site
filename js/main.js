// ==================== Theme Toggle ====================
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
});

// ==================== Mobile Menu Toggle ====================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-content')) {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });
}

// ==================== Smooth Scroll ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ==================== Scroll Animations ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// ==================== Pricing Toggle (for pricing page) ====================
const pricingToggle = document.getElementById('pricing-toggle');
if (pricingToggle) {
    const monthlyPrices = {
        solo: 9,
        team: 19
    };

    const yearlyPrices = {
        solo: 90,
        team: 190
    };

    pricingToggle.addEventListener('change', () => {
        const isYearly = pricingToggle.checked;
        const prices = isYearly ? yearlyPrices : monthlyPrices;

        // Update Solo price
        const soloAmount = document.querySelector('[data-plan="solo"] .price-amount');
        const soloPeriod = document.querySelector('[data-plan="solo"] .price-period');
        if (soloAmount && soloPeriod) {
            soloAmount.textContent = prices.solo;
            soloPeriod.textContent = isYearly ? '/year' : '/month';
        }

        // Update Team price
        const teamAmount = document.querySelector('[data-plan="team"] .price-amount');
        const teamPeriod = document.querySelector('[data-plan="team"] .price-period');
        if (teamAmount && teamPeriod) {
            teamAmount.textContent = prices.team;
            teamPeriod.textContent = isYearly ? '/user/year' : '/user/month';
        }
    });
}

// ==================== Form Validation (for contact page) ====================
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form fields
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');

        // Simple validation
        let isValid = true;

        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));

        // Validate name
        if (name.value.trim() === '') {
            showError(name, 'Please enter your name');
            isValid = false;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        }

        // Validate subject
        if (subject.value.trim() === '') {
            showError(subject, 'Please enter a subject');
            isValid = false;
        }

        // Validate message
        if (message.value.trim() === '') {
            showError(message, 'Please enter a message');
            isValid = false;
        }

        if (isValid) {
            try {
                // Send to backend API
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: name.value,
                        email: email.value,
                        subject: subject.value,
                        message: message.value
                    })
                });

                const data = await response.json();

                if (data.success) {
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.textContent = 'Thank you! Your message has been sent. We\'ll get back to you soon.';
                    contactForm.insertAdjacentElement('beforebegin', successMessage);

                    // Reset form
                    contactForm.reset();

                    // Remove success message after 5 seconds
                    setTimeout(() => {
                        successMessage.remove();
                    }, 5000);
                } else {
                    throw new Error(data.message || 'Submission failed');
                }
            } catch (error) {
                console.error('Form submission error:', error);
                showError(message, 'Failed to send message. Please try again.');
            }
        }
    });
}

function showError(input, message) {
    input.classList.add('input-error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    input.parentElement.appendChild(errorDiv);
}

// ==================== Navbar Scroll Effect ====================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
    } else {
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});
