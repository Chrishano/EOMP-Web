// Retrieve cart data from local storage or initialize an empty array
let unique = JSON.parse(localStorage.getItem('cart')) || [];

// Select the table, total amount element, and pay button in the document
let table = document.querySelector('.master');
let totalAmountElement = document.getElementById('totalAmount');
let payButton = document.getElementById('payButton');

// Remove an item from the cart based on the provided index
function removeItem(index) {
    unique.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(unique));
    calculateTotalAmount();
}

// Listen for input changes in the table and update total amount accordingly
table.addEventListener('input', function(event) {
    if (event.target.classList.contains('quantity-input')) {
        calculateTotalAmount();
    }
});

// Listen for clicks on delete buttons in the table and remove the corresponding item
table.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
        const index = event.target.dataset.index;
        removeItem(index);
    }
});

// Calculate and display the total amount based on the items and quantities in the cart
function calculateTotalAmount() {
    let totalAmount = unique.reduce((total, item, index) => {
        const quantity = document.querySelector(`.quantity-input[data-index="${index}"]`).value;
        return total + item.price * quantity;
    }, 0).toFixed(2);
    totalAmountElement.textContent = `Total Amount: R${totalAmount}`;
}

// Populate the table with rows representing each unique item in the cart
table.querySelector('tbody').innerHTML = unique.map((item, index) => {
    return `
    <tr>
        <td>${index + 1}</td>
        <td><img src="${item.url}" alt="${item.name}" style="max-width: 50px;"></td>
        <td>${item.name}</td>
        <td>${item.description}</td>
        <td>R${item.price.toFixed(2)}</td>
        <td>
            <input type="number" class="quantity-input" placeholder="Qty" min="1" value="0" data-index=${index}>
        </td>
        <td>
            <button class="delete-btn" data-index=${index}>Delete</button>
        </td>
    </tr>`;
}).join('');

// Listen for input changes in the table and handle payment accordingly
table.addEventListener('input', function(event) {
    if (event.target.classList.contains('quantity-input')) {
        handlePayment(event.target.dataset.index, event.target.value);
        calculateTotalAmount();
    }
});

// Listen for clicks on the pay button and display a payment completion alert
payButton.addEventListener('click', function() {
    alert('Payment completed. Thank you for your purchase!');
});

// Handle the payment for an item at the given index and with the chosen quantity
function handlePayment(index, quantity) {
    alert(`You have selected ${quantity} ${quantity > 1 ? 'items' : 'item'} of ${unique[index].name}.`);
}

// Add the selected item to the cart with the appropriate quantity
function add(index) {
    const existingItemIndex = unique.findIndex(item => item.description === unique[index].description);

    if (existingItemIndex !== -1) {
        unique[existingItemIndex].quantity += 1;
    } else {
        unique.push({ ...unique[index], quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(unique));
}

// Listen for clicks on the main element and add items to the cart
main.addEventListener('click', function(event) {
    if (event.target.hasAttribute('data-add')) {
        add(event.target.value);
        renderItems(unique);
    }
});

