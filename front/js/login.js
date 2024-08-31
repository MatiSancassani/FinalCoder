import { getCartId } from "./getCartId.js";

document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe de la manera tradicional

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:8030/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password }),
        credentials: 'include'
    })
        .then(response => response.json())
        .then(data => {
            const resultDiv = document.getElementById('result');
            if (data.success) {
                resultDiv.innerHTML = `<p>${data.message}</p>`;
                getCartId().then(cartId => {
                    if (cartId) {
                        // console.log('Cart ID obtenido y guardado: ', cartId);
                        setTimeout(() => {
                            window.location.href = 'index.html'; // Redirigir a index.html después de 1 segundo
                        }, 1000);
                    } else {
                        console.error('No se pudo obtener el cartId.');
                        resultDiv.innerHTML = `<p>Error al obtener el carrito. Inténtalo de nuevo.</p>`;
                    }
                });
            } else {
                const errorMessage = data.message || "Ocurrió un error inesperado. Inténtalo de nuevo.";
                resultDiv.innerHTML = `<p>Error: ${errorMessage}</p>`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('result').innerHTML = `<p>Error de conexión con el servidor.</p>`;
        });
});
