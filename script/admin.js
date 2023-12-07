


// Products stored
let clothes = [];

// Constructor function to create items
function item(id, name, description, price, url) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.url = url;
}
let item1 = new item(
    1,
    'Itachi (Naruto) Hoodie',
    'A comfortable and high quality material anime hoodie for all Naruto fans.',
    450.00,
    'https://i.postimg.cc/QCnG9LRS/1.jpg'
);
let item2 = new item(
    2,
    'Scout Regiment (AOT) Hoodie',
    'Perfect hoodie for all Attack on Titan fans',
    450.00,
    'https://i.postimg.cc/dVgCRL2c/scout-regiment-hoodie-japanese-anime-clothing-823.jpg'
);
let item3 = new item(
    3,
    'Fashion Japanese Anime Sweatshirt',
    'High material anime sweatshirt',
    350.00,
    'https://i.postimg.cc/PrwvXtG6/1-1.jpg'
);
let item4 = new item(
    4,
    'One Piece',
    'A beautiful hoodie for all One Piece fans',
    500.00,
    'https://i.postimg.cc/Kv3bCjXY/Summer-men-s-anime-short-sleeved-T-shirt-one-piece-Japanese-fashion-men-s-Harajuku-boys-3-jpg-640x64.jpg'
);
let item5 = new item(
    5,
    'Strawhat (One Piece)',
    'Luffy beloved strawhat',
    120.00,
    'https://i.postimg.cc/qqJR8Cjw/61gaekz-Di-GL-AC-UY1100.jpg'
);
let item6 = new item(
    6,
    'MHA Hoodie',
    'A lovely hoodie for MHA fans',
    440.00,
    'https://i.postimg.cc/BQshWZV0/71bm-Kc-Fa-K3-L-AC-UF1000-1000-QL80.jpg'
);
let item7 = new item(
    7,
    'Berserk Top',
    'High material anime top',
    240.00,
    'https://i.postimg.cc/857nKycn/images.jpg'
);
let item8 = new item(
    8,
    'Chainsaw Man Top',
    'Good quality anime top',
    240.00,
    'https://i.postimg.cc/Pr0ZYSn5/428932bf187d24d036798d28589c581e.jpg'
);

// Putting clothes in an array
clothes.push(item1, item2, item3, item4, item5, item6, item7, item8);
function store() {
    // Setting array to local storage
    localStorage.setItem('clothes', JSON.stringify(clothes));
}
function SENPAI() {
    let table = document.querySelector('table');
    let clothing = clothes.map(function (item, index) {
        return `<tr>
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>R${item.price.toFixed(2)}</td>
        <td>${item.description}</td>
        <td><img src="${item.url}" alt="${item.name}"></img></td>
        <td><button class="edit">Edit</button></td>
        <td><button class="delete" value="${index}">Delete</button></td>
        </tr>`;
    });
    table.innerHTML = clothing.join('');
    let deleteButtons = document.querySelectorAll('.delete');
    deleteButtons.forEach((button) => {
        button.addEventListener('click', function () {
            remove(button.value, SENPAI);
        });
    });
}
function remove(position, callback) {
    clothes.splice(position, 1);
    store();
    callback();
}
store();
SENPAI();   
 // Function to open the edit form
 function openEditForm(item) {
    const editNameInput = document.getElementById('editName');
    const editDescriptionInput = document.getElementById('editDescription');
    const editPriceInput = document.getElementById('editPrice');
    const editImageInput = document.getElementById('editImage');
    const editForm = document.getElementById('editForm');
    if (item) {
        editNameInput.value = item.name;
        editDescriptionInput.value = item.description;
        editPriceInput.value = item.price;
        editImageInput.value = item.url;
    }
    editForm.style.display = 'block';
}
// Function to close the edit form
function closeEditForm() {
    document.getElementById('editForm').style.display = 'none';
}
// Event listener for the "Edit" button
document.querySelector('table').addEventListener('click', function (event) {
    if (event.target.tagName === 'BUTTON' && event.target.textContent === 'Edit') {
        const selectedItem = clothes[event.target.parentElement.parentElement.rowIndex];
        openEditForm(selectedItem);
    }
});
// Event listener for the "Save" button in the edit form
document.getElementById('saveEdit').addEventListener('click', function () {
    // Update the selected clothes with the edited values
    const selectedItem = clothes[event.target.parentElement.parentElement.rowIndex - 1];
    selectedItem.name = document.getElementById('editName').value;
    selectedItem.description = document.getElementById('editDescription').value;
    selectedItem.price = parseFloat(document.getElementById('editPrice').value);
    selectedItem.url = document.getElementById('editImage').value;
    // Update the table and close the edit form
    SENPAI();
    closeEditForm();
});
// Event listener for the "Cancel" button in the edit form
document.getElementById('cancelEdit').addEventListener('click', function () {
    closeEditForm();
});
document.addEventListener('DOMContentLoaded', function () {
    function addProduct() {
        const newName = document.getElementById('newName');
        const newImg = document.getElementById('newImg');
        const newDes = document.getElementById('newDes');
        const newPrice = document.getElementById('newPrice');
        const resultElement = document.getElementById('result');
        // Clear previous results
        resultElement.innerHTML = "";
        event.preventDefault();
        if (newName.value === '' || newImg.value === '' || newDes.value === '' || newPrice.value === '') {
            alert('Please fill in all fields to add a new product!');
        } else {
            clothes.push(new Item(
                clothes.length + 1,
                newName.value,
                newDes.value,
                parseFloat(newPrice.value),
                newImg.value
            ));
            // Clear input fields
            newName.value = '';
            newImg.value = '';
            newDes.value = '';
            newPrice.value = '';
            // Update storage and display
            store();
            SENPAI();
        }
    }
    // Connects the addProduct function to a button or an event listener
    document.getElementById('addProductButton').addEventListener('click', addProduct);
});
document.addEventListener('DOMContentLoaded', function () {
    function addProduct() {
        const newName = document.getElementById('newName');
        const newImg = document.getElementById('newImg');
        const newDes = document.getElementById('newDes');
        const newPrice = document.getElementById('newPrice');
        const resultElement = document.getElementById('result');
        const spinner = document.getElementById('spinner');
        // Show the spinner
        spinner.style.display = 'block';
        // Clear previous results
        resultElement.innerHTML = "";
        event.preventDefault();
        if (!newName || !newImg || !newDes || !newPrice) {
            console.error('One or more input elements not found.');
            return;
        }
        if (newName.value === '' || newImg.value === '' || newDes.value === '' || newPrice.value === '') {
            alert('Please fill in all fields to add a new product!');
        } else {
            // Simulating an asynchronous operation (e.g., an API call)
            setTimeout(function () {
                clothes.push(new Item(
                    clothes.length + 1,
                    newName.value,
                    newDes.value,
                    parseFloat(newPrice.value),
                    newImg.value
                ));
                // Clear input fields
                newName.value = '';
                newImg.value = '';
                newDes.value = '';
                newPrice.value = '';
                // Update storage and display
                store();
                SENPAI();
                // Hide the spinner after 5 seconds
                setTimeout(function () {
                    spinner.style.display = 'none';
                }, 5000);
            }, 1000); // Simulating a delay of 1 second (adjust as needed)
        }
    }
    // Connects the addProduct function to a button or an event listener
    document.getElementById('addProductButton').addEventListener('click', addProduct);
});

document.querySelector('table').addEventListener('click', function (event) {
    if (event.target.classList.contains('edit')) {
        const selectedItem = clothes[event.target.dataset.index];
        openEditForm(selectedItem);
    }
});

function openEditForm(item) {
    const editNameInput = document.getElementById('editName');
    const editDescriptionInput = document.getElementById('editDescription');
    const editPriceInput = document.getElementById('editPrice');
    const editImageInput = document.getElementById('editImage');
    const editForm = document.getElementById('editForm');

    editNameInput.value = item.name;
    editDescriptionInput.value = item.description;
    editPriceInput.value = item.price;
    editImageInput.value = item.url;

    // Save the index of the item being edited
    editForm.dataset.index = clothes.indexOf(item);

    editForm.style.display = 'block';
}

document.getElementById('saveEdit').addEventListener('click', function () {
    // Get the index from the dataset
    const index = parseInt(document.getElementById('editForm').dataset.index);
    
    if (!isNaN(index) && index >= 0 && index < clothes.length) {
        // Update the selected clothes with the edited values
        clothes[index].name = document.getElementById('editName').value;
        clothes[index].description = document.getElementById('editDescription').value;
        clothes[index].price = parseFloat(document.getElementById('editPrice').value);
        clothes[index].url = document.getElementById('editImage').value;
        
        // Update the table and close the edit form
        SENPAI();
        closeEditForm();
    } else {
        console.error('Invalid index.');
    }
});

