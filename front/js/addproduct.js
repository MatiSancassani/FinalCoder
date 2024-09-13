const API = 'http://localhost:8030/api/products';
const createProduct = async () => {
    try {

        const form = new FormData(document.querySelector('#product-form'));

        // const product = {
        //     title: form.get('title'),
        //     description: form.get('description'),
        //     price: form.get('price'),
        //     stock: form.get('stock'),
        //     category: form.get('category')
        // }

        const response = await fetch(API, {
            method: 'POST',
            body: form,
            credentials: 'include' // Para enviar cookies en la petición
        });
        const addproduct = await response.json();
        console.log('Producto agregado:', addproduct);
    } catch (error) {
        console.log('Algo salio mal en POST')
    }
}

const addproductButton = document.querySelector('#addproduct');
addproductButton.addEventListener('click', createProduct);