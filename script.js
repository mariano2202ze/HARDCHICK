// Variables para el carrito de compras
let cartItems = []; // Almacena los productos agregados al carrito con su cantidad
let cartTotal = 0.0; // Almacena el total del carrito

// Función para agregar productos al carrito
function addToCart(productName, productPrice) {
    // Buscar si el producto ya está en el carrito
    const existingProduct = cartItems.find(item => item.name === productName);
    
    if (existingProduct) {
        // Si ya está, incrementa la cantidad y actualiza el precio
        existingProduct.quantity += 1;
        existingProduct.totalPrice += productPrice;
    } else {
        // Si no está, añade un nuevo producto con cantidad 1
        cartItems.push({ name: productName, price: productPrice, quantity: 1, totalPrice: productPrice });
    }
    
    // Sumar el precio del producto al total del carrito
    cartTotal += productPrice;
    
    // Actualizar la visualización del carrito
    updateCartDisplay();
}

// Función para actualizar la visualización del carrito
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalElement = document.getElementById("cart-total");

    // Limpiar el contenedor de los productos antes de actualizarlo
    cartItemsContainer.innerHTML = "";

    // Mostrar cada artículo en el carrito
    cartItems.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = `${item.name} x ${item.quantity} = $${item.totalPrice.toFixed(3)}`;
        
        // Crear botón para eliminar artículos individuales
        const removeButton = document.createElement("button");
        removeButton.textContent = "X";
        removeButton.classList.add("remove-btn");
        removeButton.onclick = () => removeFromCart(index, item.price);

        // Añadir el botón al elemento de la lista
        li.appendChild(removeButton);
        cartItemsContainer.appendChild(li);
    });

    // Mostrar el total
    cartTotalElement.textContent = cartTotal.toFixed(3);
}

// Función para eliminar un producto específico del carrito
function removeFromCart(index, productPrice) {
    const product = cartItems[index];

    // Si la cantidad es mayor a 1, solo resta uno, sino elimina el producto del carrito
    if (product.quantity > 1) {
        product.quantity -= 1;
        product.totalPrice -= productPrice;
        cartTotal -= productPrice;
    } else {
        // Eliminar el producto de cartItems y restar el precio al total
        cartTotal -= product.totalPrice;
        cartItems.splice(index, 1);
    }

    // Actualizar la visualización del carrito
    updateCartDisplay();
}

// Función para vaciar el carrito completamente
function clearCart() {
    cartItems = [];
    cartTotal = 0.0;
    updateCartDisplay();
}
// Alternar visibilidad del carrito
function toggleCartVisibility() {
    const cartContainer = document.getElementById("cart-container");
    cartContainer.classList.toggle("visible");
}