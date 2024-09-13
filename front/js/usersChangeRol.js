const API = 'http://localhost:8030/api/auth/users';

document.addEventListener('DOMContentLoaded', function () {
    const roleSelects = document.querySelectorAll('.role-select');

    roleSelects.forEach(select => {
        select.addEventListener('change', async function () {
            const userId = this.getAttribute('data-user-id');
            const newRole = this.value;

            try {
                const response = await fetch(`/users/${userId}/role`, {
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

                const result = await response.json();
                alert('Rol actualizado correctamente');
            } catch (error) {
                alert('Hubo un problema al actualizar el rol: ' + error.message);
            }
        });
    });
});