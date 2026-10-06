// Get the form elements.
const form = document.getElementById('loginForm');
const username = document.getElementById('username');
const password = document.getElementById('password');
const errorMessage = document.getElementById('error-message');
const togglePassword = document.getElementById('togglePassword');

// Validate the form before showing the demo success message.
function validateForm(event) {
    event.preventDefault();

    if (username.value.trim() === '' || password.value === '') {
        errorMessage.style.display = 'block';
        errorMessage.style.color = 'red';
        errorMessage.innerText = 'Please fill in both fields!';
        return;
    }

    errorMessage.style.display = 'none';
    alert('Login successful!'); // Replace with authentication when a backend is available.
}

form.addEventListener('submit', validateForm);

togglePassword.addEventListener('click', () => {
    const shouldShowPassword = password.type === 'password';
    password.type = shouldShowPassword ? 'text' : 'password';
    togglePassword.textContent = shouldShowPassword ? 'Hide password' : 'Show password';
    togglePassword.setAttribute('aria-pressed', String(shouldShowPassword));
});

// Animate the inputs on focus.
for (const input of [username, password]) {
    input.addEventListener('focus', () => {
        input.style.transform = 'scale(1.05)';
        input.style.transition = 'transform 0.3s ease';
    });

    input.addEventListener('blur', () => {
        input.style.transform = 'scale(1)';
    });
}
