// Manage variables on the cart items and clothes
try {
    const localStorageKeyCart = 'cart';  // Key for storing cart data in local storage
    let cart = JSON.parse(localStorage.getItem(localStorageKeyCart)) || [];  // Retrieve cart data or initialize an empty array
    let main = document.querySelector('main');  // Reference to the main content area
    let clothes = JSON.parse(localStorage.getItem('clothes')) || [];  // Retrieve clothes data or initialize an empty array

    // Function to display list of items, image, name, description, price, and an "Add to Cart" button
    // If no items are present, it displays a loading spinner; otherwise, it renders the items.
    function renderItems(items) {
        console.log(items);
        if (items.length === 0) {
            spin.innerHTML = `<div class="spinner-border m-5" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>`;  // Display a loading spinner if no items are present
        } else {
            main.innerHTML = items.map(function (item, index) {
                return `
                <div class="item">
                    <img class="item-image" src="${item.url}" alt="${item.name}">
                    <h2 class="item-name">${item.name}</h2>
                    <p class="item-description">${item.description}</p>
                    <p class="item-price">R${item.price.toFixed(2)}</p>
                    <button class="add-to-cart" value="${index}" data-add>Add to Cart</button>
                    </div>`;  // Render item details and "Add to Cart" button
            }).join('');
        }
    }

    renderItems(clothes);

    // Function to add the selected clothing item to the cart and store it in local storage
    function add(index) {
        try {
            cart.push(clothes[index]);
            localStorage.setItem(localStorageKeyCart, JSON.stringify(cart));
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    }

    // Event listener for "Add to Cart" button clicks
    main.addEventListener('click', function (event) {
        try {
            if (event.target.hasAttribute('data-add')) {
                add(event.target.value);
            }
        } catch (error) {
            console.error('Error handling "Add to Cart" button click:', error);
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
    // Function to filter and sort items based on search bar input and sort options
    function searchAndSort() {
        try {
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
        } catch (error) {
            console.error('Error in search and sort:', error);
        }
    }

    // Event listeners for search bar input and sort options change
    document.getElementById('searchBar').addEventListener('input', searchAndSort);
    document.getElementById('sortOptions').addEventListener('change', searchAndSort);
} catch (error) {
    console.error('Error in main try block:', error);
}
