
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartTable = document.querySelector('.cart');


function updateCartTable() {
    
    cartTable.querySelectorAll('tr.item-row').forEach(row => row.remove());

   
    let totalPrice = 0;
    cart.forEach((item, index) => {
        const row = document.createElement('tr');
        row.classList.add('item-row');

      
        const nameCell = document.createElement('td');
        nameCell.textContent = item.name;


        const priceCell = document.createElement('td');
        priceCell.textContent = item.price;

     
        const removeCell = document.createElement('td');
        const removeButton = document.createElement('button');
        removeButton.textContent = '-';
        removeButton.onclick = () => removeItemFromCart(index);
        removeCell.appendChild(removeButton);

     
        row.appendChild(nameCell);
        row.appendChild(priceCell);
        row.appendChild(removeCell);

   
        cartTable.appendChild(row);

       
        totalPrice += parseFloat(item.price);
    });

    
    const totalRow = cartTable.querySelector('tr:last-child');
    totalRow.cells[1].textContent = `${totalPrice.toFixed(2)} EGP`;
}


function removeItemFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart)); 
    updateCartTable(); 
}

updateCartTable();
