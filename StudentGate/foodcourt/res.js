
let cart = [];

// تحديث الميثود addToCart
function addToCart(itemName, itemPrice) {
    const item = { name: itemName, price: itemPrice };

    // جلب السلة الحالية من Local Storage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // إضافة العنصر الجديد
    cart.push(item);

    // تخزين السلة المحدثة في Local Storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // إشعار المستخدم
    alert(`تمت إضافة ${itemName} إلى السلة!`);
}



document.querySelectorAll('.menu button').forEach((button, index) => { // we access all the menu buttons  
    button.addEventListener('click', () => { 
        const row = button.closest('tr');   // when we access a button we search for the closest parent called tr to get the row element
        const itemName = row.cells[0].textContent; 
        const itemPrice = row.cells[1].textContent; 

        
        addToCart(itemName, itemPrice);
    });
});
