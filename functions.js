// Load products from LocalStorage and display them as cards.
function loadProductCards() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productsList = document.getElementById('productsList');
    productsList.innerHTML = '';

    if (products.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.className = 'emptyMessage';
        emptyMessage.textContent = 'Aún no hay productos. Agrega uno con el formulario.';
        productsList.appendChild(emptyMessage);
        return;
    }

    products.forEach(product => {
        const card = document.createElement('article');
        card.className = 'productCard';

        const productId = document.createElement('span');
        productId.className = 'productId';
        productId.textContent = `Producto #${product.id}`;

        const productName = document.createElement('h2');
        productName.className = 'productName';
        productName.textContent = product.name;

        const productPrice = document.createElement('p');
        productPrice.className = 'productPrice';
        productPrice.textContent = `$${product.price}`;

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-btn';
        deleteButton.dataset.id = product.id;
        deleteButton.textContent = 'Eliminar';
        deleteButton.addEventListener('click', deleteProduct);

        card.append(productId, productName, productPrice, deleteButton);
        productsList.appendChild(card);
    });
}

// Function to add a new product
function addProduct() {
    const name = document.getElementById('name').value.trim();
    const price = parseFloat(document.getElementById('price').value);

    // Validate inputs
    if (!name || isNaN(price) || price <= 0) {
        alert("Ingresa un nombre y un precio válidos.");
        return;
    }

    //Create the new product with unique ID
    let products = JSON.parse(localStorage.getItem('products')) || []; // || [] is used to provide a default value in case the first part (localStorage.getItem('products')) returns null or undefined
    const newProduct = {
        id: products.length > 0 ? products[products.length - 1].id + 1 : 1, // Assign an incremental ID
        name: name,
        price: price
    };

    //Add the new product to the products array
    products.push(newProduct);

    //Save the updated array (products) to LocalStorage
    localStorage.setItem('products', JSON.stringify(products));

    //Clear the form fields
    document.getElementById('name').value = '';
    document.getElementById('price').value = '';

    // Update the product cards.
    loadProductCards();
}

//Function to delete a product
function deleteProduct(event) {
    const productId = parseInt(event.target.getAttribute('data-id')); // Get the product ID from the button's data attribute
    let products = JSON.parse(localStorage.getItem('products')) || [];

    //Filter out the product with the corresponding ID
    products = products.filter(product => product.id !== productId);

    // Save the updated list back to LocalStorage
    localStorage.setItem('products', JSON.stringify(products));

    // Reload the product cards to reflect changes.
    loadProductCards();
}

// Submit the form with the button or the Enter key.
document.getElementById('productForm').addEventListener('submit', event => {
    event.preventDefault();
    addProduct();
});

// Load products when the page loads.
loadProductCards();
