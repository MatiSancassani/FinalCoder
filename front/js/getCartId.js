const API = 'http://localhost:8030/api/carts';

export const getCartId = async () => {
    try {
        const response = await fetch(API, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include' // Para enviar cookies en la petición
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud getCartId')
        }
        const data = await response.json();
        const cartId = data.payload;
        if (cartId) {
            localStorage.setItem('cart_id', cartId);
            return cartId;
        } else {
            console.error("Error al obtener el cartId:", data.error);
            return null;
        }

    } catch (error) {
        console.error("Error en fetchCartId:", error);
        return null;
    }
}
