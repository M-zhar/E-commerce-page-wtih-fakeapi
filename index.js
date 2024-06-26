document.addEventListener('DOMContentLoaded', function () {
    const productsContainer = document.getElementById('products-container');
    const loadingElement = document.querySelector('.loading');
    const cartElement = document.getElementById('cart-items');
    const totalItemsElement = document.getElementById('total-items');
    const totalPriceElement = document.getElementById('total-price');
    const cartButton = document.getElementById('cart-button');
    const cartCountElement = document.getElementById('cart-count');
    const searchInput = document.querySelector('.search-container input');
    const cartContainer = document.getElementById('cart');
    const orderNowButton = document.getElementById('order-now-button');
    const paymentMessage = document.getElementById('payment-message');
    const paymentAmount = document.getElementById('payment-amount');
    const confirmPaymentButton = document.getElementById('confirm-payment-button');

    // Initialize cart as empty
    let cart = [];
    let products = [];

    // Function to update cart
    function updateCart() {
        cartElement.innerHTML = '';
        if (cart.length === 0) {
            cartElement.innerHTML = '<p>Cart is empty</p>';
            orderNowButton.style.display = 'none'; // Hide Order Now button if cart is empty
        } else {
            cart.forEach(product => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.textContent = `${product.title} - $${product.price}`;
                cartElement.appendChild(cartItem);
            });
            orderNowButton.style.display = 'block'; // Show Order Now button if cart has items
        }
        // Update cart summary
        const totalItems = cart.length;
        const totalPrice = cart.reduce((total, product) => total + product.price, 0).toFixed(2);

        totalItemsElement.textContent = totalItems;
        totalPriceElement.textContent = totalPrice;
        cartCountElement.textContent = totalItems;
        paymentAmount.textContent = totalPrice; // Update the payment amount
    }

    // Function to display products
    function displayProducts(productsToDisplay) {
        productsContainer.innerHTML = '';
        productsToDisplay.forEach(product => {
            // Create a new div element for each product
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}" class="product-image">
                <h2 class="product-title">${product.title}</h2>
                <p class="product-price">$${product.price}</p>
                <button class="add-to-cart">+</button>
                <button class="remove-from-cart">-</button>
            `;
            // Append the product card to the container
            productsContainer.appendChild(productCard);

            // Add event listeners for add and remove buttons
            const addToCartButton = productCard.querySelector('.add-to-cart');
            const removeFromCartButton = productCard.querySelector('.remove-from-cart');

            addToCartButton.addEventListener('click', () => {
                cart.push(product);
                updateCart();
            });

            removeFromCartButton.addEventListener('click', () => {
                const index = cart.indexOf(product);
                if (index !== -1) {
                    cart.splice(index, 1);
                    updateCart();
                }
            });
        });
    }

    // Fetch data from the Fake Store API
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => {
            loadingElement.style.display = 'none'; // Hide loading text
            products = data.slice(0, 30);
            displayProducts(products);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            loadingElement.textContent = 'Failed to load products.';
        });

    // Search functionality
    searchInput.addEventListener('input', function () {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredProducts = products.filter(product =>
            product.title.toLowerCase().includes(searchTerm)
        );
        displayProducts(filteredProducts);
    });

    // Cart button click event to toggle cart visibility
    cartButton.addEventListener('click', () => {
        cartContainer.classList.toggle('show');
    });

    // Click outside the cart to close it
    document.addEventListener('click', (event) => {
        if (!cartContainer.contains(event.target) && !cartButton.contains(event.target)) {
            cartContainer.classList.remove('show');
        }
    });

    // Order Now button click event to show payment message
    orderNowButton.addEventListener('click', () => {
        paymentMessage.style.display = 'block';
    });

    // Confirm Payment button click event to simulate payment
    confirmPaymentButton.addEventListener('click', () => {
        alert('Payment successful!');
        cart = []; // Clear the cart
        updateCart(); // Update the cart display
        paymentMessage.style.display = 'none'; // Hide payment message
        cartContainer.classList.remove('show'); // Hide cart
    });

    updateCart(); // Initial call to display empty cart
});

//Footer of the html
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const emailMessage = document.getElementById('email-message');

    if (validateEmail(email)) {
        emailMessage.textContent = 'Thank you for subscribing!';
        emailMessage.style.color = 'green';
    } else {
        emailMessage.textContent = 'Please enter a valid email address.';
        emailMessage.style.color = 'red';
    }
});



