// ==================== Trial Form Submission ====================
const trialForm = document.getElementById('trial-form');
if (trialForm) {
    trialForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const fullname = document.getElementById('fullname').value;
        const email = document.getElementById('email').value;
        const company = document.getElementById('company').value;
        const plan = document.getElementById('plan').value;

        try {
            const response = await fetch('/api/trial', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullname,
                    email,
                    company,
                    plan
                })
            });

            const data = await response.json();

            if (data.success) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Welcome to Orbitly! Your free trial has started. Check your email for next steps.';
                trialForm.insertAdjacentElement('beforebegin', successMessage);

                // Reset form
                trialForm.reset();

                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            } else {
                throw new Error(data.message || 'Submission failed');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            alert('Failed to submit form. Please try again.');
        }
    });
}
