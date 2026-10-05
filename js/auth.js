// ==================== Auth Page Tab Switching ====================
const loginTab = document.getElementById('login-tab');
const registerTab = document.getElementById('register-tab');
const loginFormContainer = document.getElementById('login-form-container');
const registerFormContainer = document.getElementById('register-form-container');
const switchToRegister = document.getElementById('switch-to-register');
const switchToLogin = document.getElementById('switch-to-login');

function showLogin() {
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
    loginFormContainer.style.display = 'block';
    registerFormContainer.style.display = 'none';

    loginTab.style.color = 'var(--color-violet)';
    loginTab.style.borderBottomColor = 'var(--color-violet)';
    registerTab.style.color = 'var(--text-secondary)';
    registerTab.style.borderBottomColor = 'transparent';
}

function showRegister() {
    registerTab.classList.add('active');
    loginTab.classList.remove('active');
    registerFormContainer.style.display = 'block';
    loginFormContainer.style.display = 'none';

    registerTab.style.color = 'var(--color-violet)';
    registerTab.style.borderBottomColor = 'var(--color-violet)';
    loginTab.style.color = 'var(--text-secondary)';
    loginTab.style.borderBottomColor = 'transparent';
}

if (loginTab) {
    loginTab.addEventListener('click', showLogin);
}

if (registerTab) {
    registerTab.addEventListener('click', showRegister);
}

if (switchToRegister) {
    switchToRegister.addEventListener('click', (e) => {
        e.preventDefault();
        showRegister();
    });
}

if (switchToLogin) {
    switchToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        showLogin();
    });
}

// ==================== Login Form Submission ====================
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        // Show demo message (actual authentication would happen here)
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Login successful! (Demo - no actual authentication)';
        loginForm.insertAdjacentElement('beforebegin', successMessage);

        loginForm.reset();

        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    });
}

// ==================== Register Form Submission ====================
const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const fullname = document.getElementById('register-fullname').value;
        const email = document.getElementById('register-email').value;
        const company = document.getElementById('register-company').value;

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullname,
                    email,
                    company
                })
            });

            const data = await response.json();

            if (data.success) {
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Account created successfully! Welcome to Orbitly.';
                registerForm.insertAdjacentElement('beforebegin', successMessage);

                registerForm.reset();

                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            } else {
                throw new Error(data.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert('Failed to create account. Please try again.');
        }
    });
}

// Initialize active tab styling
if (loginTab) {
    showLogin();
}
