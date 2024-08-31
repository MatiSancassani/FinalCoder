document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value
    const lastName = document.getElementById('lastName').value
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    const response = await fetch('http://localhost:8030/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, lastName, email, password })
    });

    const data = await response.json();
    if (data.success) {
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
    } else {
        alert(data.message);
    }
});