// Manage variables on the cart items and clothes

const spin = document.querySelector("#spin")
console.log("HI")
const localStorageKeyCart = 'cart';
let cart = JSON.parse(localStorage.getItem(localStorageKeyCart)) || [];
let main = document.querySelector('main');
let clothes = JSON.parse(localStorage.getItem('clothes')) || [];

// Function to display list of items, image, name, description, price, and an "Add to Cart" button
//  If no items are present, it displays a message indicating "No items found."

function renderItems(items) {
    console.log(items)
    if (items.length === 0) {
        spin.innerHTML = `<div class="spinner-border m-5" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>`
    ;
    } else {
        main.innerHTML = items.map(function (item, index) {
            return `
            <div class="item">
                <img class="item-image" src="${item.url}" alt="${item.name}">
                <h2 class="item-name">${item.name}</h2>
                <p class="item-description">${item.description}</p>
                <p class="item-price">R${item.price.toFixed(2)}</p>
                <button class="add-to-cart" value="${index}" data-add>Add to Cart</button>
                </div>`;
            }).join('');
        }
    }

    renderItems(clothes)
// It adds the selected clothing item to a list of things that have been cart
// Stores in the local storage

    function add(index) {
        cart.push(clothes[index]);
        localStorage.setItem(localStorageKeyCart, JSON.stringify(cart));
    }

// Adds the data to make sure that the chosen item gets added to your list of cart items.
    main.addEventListener('click', function (event) {
        if (event.target.hasAttribute('data-add')) {
            add(event.target.value);
        }
});


// Spinner

// Check if all data is deleted and display a spinner
if (clothes.join('').length == 0) {
    main.innerHTML = '<div id="spinner" class="spinner" style="display: none;"><i class="fas fa-spinner fa-spin"></i></div>';
} else {
    // Initial rendering
    renderItems(clothes);
}

// Sort & Search
function searchAndSort() {
    let searchBar = document.getElementById('searchBar').value.toLowerCase();
    let sortOption = document.getElementById('sortOptions').value;
    let filteredItems = clothes.filter(item => {
        return item.name.toLowerCase().includes(searchBar);
    });
    if (sortOption === 'low') {
        filteredItems.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'high') {
        filteredItems.sort((a, b) => b.price - a.price);
    }
    renderItems(filteredItems);
}

document.getElementById('searchBar').addEventListener('input', searchAndSort);
document.getElementById('sortOptions').addEventListener('change', searchAndSort);

