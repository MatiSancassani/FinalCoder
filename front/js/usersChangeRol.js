const API = 'http://localhost:8030/api/users';

document.addEventListener('DOMContentLoaded', async () => {
    const usuarios = document.querySelector('#usuarios');
    try {
        const response = await fetch(API, {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Error al obtener la lista de usuarios');
        }

        const users = await response.json();
        users.forEach(user => {
            const userDiv = document.createElement('div');
            userDiv.classList.add('user');

            userDiv.innerHTML = `
                <h3>${user.name}</h3>
                <select data-user-id="${user._id}">
                    <option value="admin" ${user.rol === 'admin' ? 'selected' : ''}>Admin</option>
                    <option value="user" ${user.rol === 'user' ? 'selected' : ''}>User</option>
                    <option value="premium" ${user.rol === 'premium' ? 'selected' : ''}>Premium</option>
                </select>
                <button class="change-role-btn">Cambiar Rol</button>
            `;

            usuarios.appendChild(userDiv);
        });

        document.querySelectorAll('.change-role-btn').forEach(button => {
            button.addEventListener('click', async (event) => {
                const select = event.target.previousElementSibling;
                const userId = select.getAttribute('data-user-id');
                const newRole = select.value;

                // Llamada al backend para actualizar el rol
                try {
                    const response = await fetch(`${API}/${userId}/role`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ rol: newRole }),
                        credentials: 'include'
                    });

                    if (!response.ok) {
                        throw new Error('Error al actualizar el rol');
                    }

                    alert('Rol actualizado correctamente');
                } catch (error) {
                    console.error('Error al cambiar el rol:', error);
                }
            });
        });
    } catch (error) {
        console.error('Error al cargar los usuarios:', error);
    }
})