// Mendapatkan elemen HTML
const form = document.getElementById('loginForm');
const username = document.getElementById('username');
const password = document.getElementById('password');
const errorMessage = document.getElementById('error-message');
const loginButton = document.getElementById('loginButton');

// Function untuk validasi
function validateForm(event) {
    event.preventDefault(); // Mencegah form dikirim sebelum validasi
    if (username.value === "" || password.value === "") {
        // Tampilkan pesan error
        errorMessage.style.display = "block";
        errorMessage.style.color = "red";
        errorMessage.innerText = "Please fill in both fields!";
    } else {
        // Jika valid, tampilkan pesan sukses atau redirect ke halaman lain
        errorMessage.style.display = "none";
        alert("Login successful!"); // Kamu bisa mengganti ini dengan logic lain, seperti redirect
    }
}

// Event listener untuk validasi saat klik tombol login
form.addEventListener('submit', validateForm);

// Animasi untuk input fields saat di klik
username.addEventListener('focus', () => {
    username.style.transform = "scale(1.05)";
    username.style.transition = "transform 0.3s ease";
});

username.addEventListener('blur', () => {
    username.style.transform = "scale(1)";
});

password.addEventListener('focus', () => {
    password.style.transform = "scale(1.05)";
    password.style.transition = "transform 0.3s ease";
});

password.addEventListener('blur', () => {
    password.style.transform = "scale(1)";
});
