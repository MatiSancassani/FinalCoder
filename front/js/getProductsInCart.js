const cartContainer = document.querySelector('#productsInCart');
const cid = localStorage.getItem('cart_id')
const APIWITHID = `http://localhost:8030/api/carts/${cid}`
let productsInCart = [];

window.addEventListener('DOMContentLoaded', () => {
    getProductsInCart();
})

const getProductsInCart = async () => {
    try {
        const response = await fetch(APIWITHID, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include' // Para enviar cookies en la petición
        });
        if (!response.ok) {
            throw new Error('Error al cargar los productos del carrito')
        }
        const data = await response.json();
        const cartProducts = data.payload.cart.products;
        productsInCart = cartProducts
        // ACA GUARDO LO TRAIDO DE LA BASE DE DATOS EN LA VARIABLE CREADA AL PRINCIPIO, PARA HACER USO GLOBAL LUEGO!!
        // productsInCart = cart;

        cartProducts.forEach(products => {
            const div = document.createElement("div");
            div.classList.add('cartContainer');
            div.innerHTML = `
                <div class="cartCard">
                    <img src="${products.id.thumbnail}" alt="${products.id.title}" class="imgCart">
                    <div class="itemContainer">
                        <h3>Producto:</h3>
                        <small>${products.id.title}</small>
                    </div>
                    <div class="itemContainer">
                        <h3>Description:</h3>
                        <small>${products.id.description}</small>
                    </div>
                    <div class="itemContainer">
                        <h3>Precio:</h3>
                        <small>${products.id.price}</small>
                    </div>
                    <div class="itemContainer">
                        <h3>Cantidad:</h3>
                        <div class="itemCant">
                            <button class="buttonCant">-</button>
                            <small>${products.quantity}</small>
                            <button class="buttonCant">+</button>
                        </div>
                    </div>
                    <div class="itemContainer">
                        <h3>Total:</h3>
                        <small>${products.id.price * products.quantity}</small>
                    </div>
                    <button class="edit-button">
                        <svg class="edit-svgIcon" viewBox="0 0 512 512">
                        <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                        </svg>
                    </button>
                    <button class="button">
                        <svg viewBox="0 0 448 512" class="svgIcon"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
                    </button>
                    </div>
                    `;
            cartContainer.append(div);
        });
        // <a href="" class="buttonAction"><i class="bi bi-x"></i></a>
    } catch (error) {
        console.log(error)
        throw error
    }
}


