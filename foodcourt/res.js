// Function to add an item to the cart and send it to the server
function addToCart(itemName, itemPrice) {
    const item = { name: itemName, price: itemPrice }; // Only send name and price

    fetch('AddToCart.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(`تمت إضافة ${itemName} إلى السلة!`);
            } else {
                console.error('Error:', data.message); // Log server response
                alert(data.message); // Show error message from server
            }
        })
        .catch(error => {
            console.error('Fetch Error:', error);
            alert('حدث خطأ أثناء الاتصال بالخادم.');
        });
}

// Attach event listeners to all menu buttons
document.querySelectorAll('.menu button').forEach((button) => {
    button.addEventListener('click', () => {
        const row = button.closest('tr'); // Get the row
        const itemName = row.cells[0].textContent; // Get item name from the first cell
        const itemPrice = row.cells[1].textContent; // Get item price from the second cell

        addToCart(itemName, itemPrice); // Add item to cart and send it to the backend
    });
});
