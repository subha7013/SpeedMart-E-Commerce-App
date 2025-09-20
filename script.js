// Data for categories
const categories = [
    { name: 'Charger', products: [
        { id: 'charger1', name: 'Dual Port Adapter', price: 199, image: 'assets/charger1.jpg' },
        { id: 'charger2', name: 'Samsung Adapter', price: 249, image: 'assets/charger2.jpg' },
        { id: 'charger3', name: 'Apple Adapter', price: 1499, image: 'assets/charger3.jpg' },
    ]},
    { name: 'Earbuds', products: [
        { id: 'earbuds1', name: 'Realme buds Q', price: 1999, image: 'assets/earbuds1.jpg' },
        { id: 'earbuds2', name: 'Boult earbuds', price: 899, image: 'assets/earbuds2.jpg' },
        { id: 'earbuds3', name: 'Boat Airdoped 311', price: 1299, image: 'assets/earbuds3.jpg' },
    ]},
    { name: 'Headset', products: [
        { id: 'headset1', name: 'Headset', price: 2599, image: 'assets/headset1.jpg' },
        { id: 'headset2', name: 'Sony', price: 2999, image: 'assets/headset2.jpg' },
    ]},
    { name: 'Neckband', products: [
        { id: 'neckband1', name: 'Boat 235 V2', price: 899, image: 'assets/neckband1.jpg' },
    ]},
    { name: 'Accessories', products: [
        { id: 'keyboard1', name: 'Keyboard', price: 1499, image: 'assets/keyboard1.jpg' },
        { id: 'mouse1', name: 'Mouse', price: 599, image: 'assets/mouse1.jpg' },
    ]},
    { name: 'Powerbank', products: [
        { id: 'powerbank1', name: 'Mi 10000mah Powerbank', price: 699, image: 'assets/powerbank1.jpg' },
        { id: 'powerbank2', name: 'Oneplus 20000mah Powerbank', price: 1799, image: 'assets/powerbank2.jpg' },
    ]},
    { name: 'Soundbar', products: [
        { id: 'soundbar1', name: 'JBL Base Pro', price: 2000, image: 'assets/soundbar1.jpg' },
        { id: 'soundbar2', name: 'JBL Super Bass', price: 1299, image: 'assets/soundbar2.jpg' },
        { id: 'soundbar3', name: 'Boat Stone Pro', price: 799, image: 'assets/soundbar3.jpg' },
    ]},
    
];

// App State
let cart = [];
let wishlist = [];

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('main section').forEach(sec => sec.style.display = 'none');

    // Show the selected one
    document.getElementById(sectionId).style.display = 'block';

    // Footer handling
    const footer = document.getElementById('footer');
    if (sectionId === 'wishlistPage' || sectionId === 'cartPage' || sectionId==='categoriesPage' || sectionId==='productsPage') {
        footer.style.display = 'none';
    } else {
        footer.style.display = 'block';
    }

}
function showHome() {
    document.getElementById('home').style.display = 'block';
    document.getElementById('categoriesPage').style.display = 'none';
    document.getElementById('productsPage').style.display = 'none';
    document.getElementById('home').style.display='flex';
    document.getElementById('wishlistPage').style.display='none';
    document.getElementById('cartPage').style.display='none';
    document.getElementById('footer').style.display='flex';
}

// Show Categories
function showCategories() {
    showSection('categoriesPage');
    const container = document.getElementById('categoriesList');
    container.innerHTML = '';
    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.textContent = cat.name;
        btn.onclick = () => showProducts(cat);
        container.appendChild(btn);
    });
}

// Show Products
function showProducts(category) {
    showSection('productsPage');
    document.getElementById('categoryTitle').textContent = category.name;

    const container = document.getElementById('productsList');
    container.innerHTML = '';

    category.products.forEach(p => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product-card';
        productDiv.innerHTML = `
            <img src="${p.image}" alt="${p.name}" width="120">
            <p>${p.name}</p>
            <p>Rs ${p.price}</p>
            <div>
                <button onclick="decreaseCart('${p.id}')">-</button>
                <span id="qty-${p.id}">0</span>
                <button onclick="increaseCart('${p.id}', '${p.name}', ${p.price})">+</button>
            </div>
            <button onclick="addToWishlist('${p.id}', '${p.name}', ${p.price}, '${p.image}')">❤ Wishlist</button>
        `;
        container.appendChild(productDiv);
    });
    document.getElementById('categoriesPage').style.display = 'none';
}

function backToCategories() {
    showSection('categoriesPage');
}

// Cart Functions
function increaseCart(id, name, price) {
    let item = cart.find(i => i.id === id);
    if (!item) {
        item = { id, name, price, qty: 1 };
        cart.push(item);
    } else {
        item.qty++;
    }
    document.getElementById(`qty-${id}`).textContent = item.qty;
}

function decreaseCart(id) {
    let item = cart.find(i => i.id === id);
    if (item && item.qty > 0) {
        item.qty--;
        document.getElementById(`qty-${id}`).textContent = item.qty;
    }
}

// Wishlist Functions

function addToWishlist(id, name, price, image) {
    if (!wishlist.find(w => w.id === id)) {
        wishlist.push({ id, name, price, image });
        alert(name + ' added to wishlist!');
    }
}

// Show Wishlist Page

function showWishlist() {
    showSection('wishlistPage');
    const container = document.getElementById('wishlistList');
    container.innerHTML = '';
    wishlist.forEach(item => {
        const div = document.createElement('div');
        div.className = 'product-card';
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}" width="100">
            <p>${item.name}</p>
            <p>Rs ${item.price}</p>
        `;
        container.appendChild(div);
    });
    document.getElementById('categoriesPage').style.display='none';
    document.getElementById('remove').removeAttribute('product-list');
}

function clearWishlist() {
    if (wishlist.length === 0) {
        alert("Your wishlist is already empty!");
        return;
    }

    if (confirm("Are you sure you want to clear your wishlist?")) {
        wishlist = [];
        showWishlist();
    }
}


// Show Cart Page
function showCart() {
    showSection('cartPage');
    const container = document.getElementById('cartList');
    container.innerHTML = '';
    let total = 0;

    // Remove empty items first
    cart = cart.filter(item => item.qty > 0);

    cart.forEach(item => {
        total += item.qty * item.price;
        const div = document.createElement('div');
        div.className = 'product-card';
        div.innerHTML = `
            <p>${item.name}</p>
            <p>Qty: ${item.qty}</p>
            <p>Rs ${item.qty * item.price}</p>
        `;
        container.appendChild(div);
    });

    document.getElementById('categoriesPage').style.display='none';
    document.getElementById('cartTotal').textContent = "Total: Rs " + total;
}


function placeOrder() {
    // Check if cart has items
    if (cart.length === 0) {
        alert("Your cart is empty. Add items before checkout!");
        return;
    }

    let total = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

    if (total === 0) {
        alert("Your cart total is 0. Add some items before placing an order!");
        return;
    }

    alert("Order placed successfully!");

    // Clear the cart after order
    cart = [];
    showCart();
}

