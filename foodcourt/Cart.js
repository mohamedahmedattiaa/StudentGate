let cart = []; // Initialize cart as an empty array

// Fetch the cart items from the database
function loadCartFromDatabase() {
    fetch('ViewCart.php') // Replace 'ViewCart.php' with your actual PHP file URL
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Error:', data.error); // Log if there is an error from the backend
            } else {
                // Replace the local cart with the data from the database
                cart = data;
                updateCartTable();  // Update the frontend cart table
            }
        })
        .catch(error => {
            console.error('Error fetching cart items:', error);  // Log any fetch errors
        });
}

// Update the cart table on the frontend
// Update the cart table on the frontend
function updateCartTable() {
    const cartTable = document.querySelector('.cart');  // Get the cart table element

    // Remove existing rows in the table (clear all rows first)
    cartTable.querySelectorAll('tr').forEach(row => row.remove());

    let totalPrice = 0;

    // If cart is not empty, add rows for each item
    if (cart.length > 0) {
        cart.forEach((item, index) => {
            const row = document.createElement('tr');
            row.classList.add('item-row');  // Add a class for styling

            // Create a cell for the item name
            const nameCell = document.createElement('td');
            nameCell.textContent = item.name;

            // Create a cell for the item price
            const priceCell = document.createElement('td');
            priceCell.textContent = item.price;

            // Create a cell for the remove button
            const removeCell = document.createElement('td');
            const removeButton = document.createElement('button');
            removeButton.textContent = '-';
            removeButton.onclick = () => removeItemFromCart(index);  // Call remove function on click
            removeCell.appendChild(removeButton);

            // Append cells to the row
            row.appendChild(nameCell);
            row.appendChild(priceCell);
            row.appendChild(removeCell);

            // Append the row to the table
            cartTable.appendChild(row);

            // Calculate the total price
            totalPrice += parseFloat(item.price);
        });

        // Add total row
        const totalRow = document.createElement('tr');
        const totalCell = document.createElement('td');
        totalCell.textContent = 'Total';
        const totalPriceCell = document.createElement('td');
        totalPriceCell.textContent = `${totalPrice.toFixed(2)} EGP`;
        totalRow.appendChild(totalCell);
        totalRow.appendChild(totalPriceCell);
        cartTable.appendChild(totalRow);
    } else {
        // If cart is empty, display a single "Cart is empty" row
        const emptyRow = document.createElement('tr');
        const emptyCell = document.createElement('td');
        emptyCell.textContent = 'Cart is empty';
        totalPrice = 0;
        emptyCell.colSpan = 2;  // Span across both columns
        emptyRow.appendChild(emptyCell);
        cartTable.appendChild(emptyRow);

        // Ensure the total is displayed as 0
        const totalRow = document.createElement('tr');
        const totalCell = document.createElement('td');
        totalCell.textContent = 'Total';
        const totalPriceCell = document.createElement('td');
        totalPriceCell.textContent = `${totalPrice.toFixed(2)} EGP`;
        totalRow.appendChild(totalCell);
        totalRow.appendChild(totalPriceCell);
        cartTable.appendChild(totalRow);
    }
}

// Clear the cart on frontend and backend (for both Clear Cart button and logout)
function clearCart() {
    fetch('ClearCart.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'clear' })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Clear the cart array on the frontend and update the table
            cart = [];
            updateCartTable();  // Update the cart table after clearing
        } else {
            console.error('Failed to clear cart:', data.message);
        }
    })
    .catch(error => {
        console.error('Error clearing cart:', error);
    });
}


// Remove item from the cart (both frontend and backend)
function removeItemFromCart(index) {
    const item = cart[index];

    // Update the database to reflect the removal
    fetch('ClearCart.php', {  // Replace with your actual PHP file URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Remove the item from the cart array
            cart.splice(index, 1);
            updateCartTable();  
        } else {
            console.error('Failed to remove item from cart:', data.message);  // Log any error
        }
    })
    .catch(error => {
        console.error('Error removing item from cart:', error);  // Log fetch errors
    });
}

// Logout function: clear the cart and redirect to login page
function logout() {
    clearCart();  // Clear cart for logout action

    // Redirect to login page
    window.location.href = 'login.html';  // Replace with actual redirect URL
}

// Add event listener to the "Clear Cart" button
document.getElementById('clear-cart').addEventListener('click', clearCart);

// Load the cart items when the page loads
loadCartFromDatabase();
