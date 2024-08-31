const getProducts = async () => {
    try {
        const response = await fetch(API, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include' // Para enviar cookies en la petición
        });
        if (!response.ok) {
            throw new Error('Error al cargar los productos');
        }
        const jsonResponse = await response.json();
        const products = jsonResponse.payload;
        const userEmail = getUserEmail(); // Assuming you have a function to fetch the user's email
        productsData = products;

        products.forEach(product => {
            const div = document.createElement("div");
            div.classList.add("card-container");

            // Check if the user's email matches the owner's email
            if (userEmail === product.owner) {
                div.innerHTML = `
                    <div class="actionMenu">
                        <button type="button" class="btn buttonEdit" data-bs-toggle="modal" data-bs-target="#exampleModa2" onclick="editProduct('${product._id}')">
                            <i class="bi bi-pencil-square buttonEdit"></i>
                        </button>

                        <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal3">
                            <i class="bi bi-trash3-fill buttonRemove"></i>
                        </button>
                    </div>
                    <img class="img-card" src="${product.thumbnail}" alt="${product.title}">
                    <h3 class="title-card">${product.title}</h3>
                    <p class="desc-card">${product.description}</p>
                    <p class="price-card">$${product.price}</p>
                    <button class="button-card" id="${product._id}">Add to cart</button>
                `;
            } else {
                div.innerHTML = `
                    `;
            }

            productsContainer.append(div);
        });

    } catch (error) {
        console.log(error);
    }
};





const getProducts = async () => {
    try {
        // ... (resto del código original)

        const userEmail = await getUserEmailFromAPI(); // Llamada a la API para obtener el email del usuario

        products.forEach(product => {
            const div = document.createElement("div");
            div.classList.add("card-container");

            // ... (resto del código original)

            if (userEmail === product.owner) {
                // ... (código para mostrar los botones)
            } else {
                // ... (código para ocultar los botones)
            }
        });

    } catch (error) {
        console.log(error);
    }
};

async function getUserEmailFromAPI() {
    try {
        const response = await fetch('/api/user', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}` // O cualquier otro mecanismo de autenticación
            }
        });
        const data = await response.json();
        return data.email;
    } catch (error) {
        console.error('Error al obtener el email del usuario:', error);
        return null;
    }
}
