const productsContainer = document.querySelector('#productsContainer');
let buttonCard = document.querySelectorAll("#button-card");
const detailProduct = document.querySelector('#detailProduct');
const API = 'http://localhost:8030/api/products';
let productsData = [];

window.addEventListener('DOMContentLoaded', () => {
    getProducts();
})

// OBTENER LISTA DE PRODUCTOS CON METODO GET
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
            throw new Error('Error al cargar los productos')
        }
        const jsonResponse = await response.json();
        const products = jsonResponse.payload;
        // ACA GUARDO LO TRAIDO DE LA BASE DE DATOS EN LA VARIABLE CREADA AL PRINCIPIO, PARA HACER USO GLOBAL LUEGO!!
        productsData = products

        products.forEach(product => {
            const div = document.createElement("div");
            div.classList.add("card-container");
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
            productsContainer.append(div);
        })

    } catch (error) {
        console.log(error)
    }

};

// ENVIAR FORM CON METODO POST

const createProduct = async () => {
    try {

        const form = new FormData(document.querySelector('#product-form'));

        const product = {
            title: form.get('title'),
            description: form.get('description'),
            price: form.get('price'),
            stock: form.get('stock'),
            category: form.get('category')
        }

        const response = await fetch(API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product),
            credentials: 'include' // Para enviar cookies en la petición
        });
        const addproduct = await response.json();
        productsContainer.innerHTML = '';
        getProducts();
    } catch (error) {
        console.log('Algo salio mal en POST')
    }
}

const addproductButton = document.querySelector('#addproduct');
addproductButton.addEventListener('click', createProduct);



// EDITAR FORM CON METODO PUT

const editProduct = (productId) => {

    let product = productsData.find(p => p._id === productId);
    if (product) {
        console.log('Producto seleccionado:', product);
    } else {
        console.log('Producto no encontrado');
    }
    document.querySelector('#edit-title').value = product.title;
    document.querySelector('#edit-description').value = product.description;
    document.querySelector('#edit-price').value = product.price;
    document.querySelector('#edit-stock').value = product.stock;
    document.querySelector('#edit-category').value = product.category;
    document.querySelector('#edit-ID').value = productId;
}

const updateProduct = async () => {
    try {
        const API2 = `http://localhost:8030/api/products/${document.querySelector('#edit-ID').value}`
        // Creo un nuevo producto asignandole los nuevos valores a las propiedades de la DB
        const productUpdated = {
            title: document.querySelector('#edit-title').value,
            description: document.querySelector('#edit-description').value,
            price: document.querySelector('#edit-price').value,
            stock: document.querySelector('#edit-stock').value,
            category: document.querySelector('#edit-category').value
        };

        if (!productUpdated.title || !productUpdated.description || !productUpdated.price || !productUpdated.stock || !productUpdated.category) {
            console.log('Error, faltan campos por completar')
            return
        };
        const response = await fetch(API2, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productUpdated),
            credentials: 'include' // Para enviar cookies en la petición
        });
        const jsonResponse = await response.json();
    } catch (error) {
        console.log('Algo salio mal en PUT:', error)
    }
}
const confirmEditButton = document.querySelector('#confirmEditButton');
confirmEditButton.addEventListener('click', updateProduct);



