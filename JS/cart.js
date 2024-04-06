
const linkElement = document.createElement('link');
linkElement.href = '/CSS/cart.css'; // Đường dẫn đến tập tin CSS của bạn

// Hàm hiển thị các sản phẩm trong giỏ hàng
function displayCartItems() {
    const cartContainer = document.querySelector('.cart-items');
    cartContainer.innerHTML = '';

    // Lấy thông tin giỏ hàng từ localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-items');

        cartItemDiv.innerHTML = `
            <img src="image/zx10rneu.png" alt="Product Image">
            <div class="item-details">
                <p class="item-name">${item.name}</p>
                <p class="item-price">${formatPrice(item.price)}</p> <!-- Sử dụng hàm formatPrice -->
                <div class="item-quantity">
                    <button class="quantity-btn minus" onclick="decreaseQuantity('${item.name}')">-</button>
                    <input type="text" class="quantity-input" value="${item.quantity}" disabled>
                    <button class="quantity-btn plus" onclick="increaseQuantity('${item.name}')">+</button>
                </div>
                <button class="remove-btn" onclick="removeItem('${item.name}')">Remove</button>
            </div>
        `;

        cartContainer.appendChild(cartItemDiv);
    });

    // Tính tổng giá trị của giỏ hàng
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalElement = document.querySelector('.total-price');
    totalElement.textContent = `$${totalPrice.toFixed(2)}`;
}

// Hàm formatPrice để xử lý giá trị price không phải là số
function formatPrice(price) {
    // Kiểm tra xem price có phải là số không
    if (typeof price !== 'number') {
        return 'Price not available';
    }

    // Nếu là số, thì sử dụng toFixed để làm tròn đến 2 chữ số thập phân
    return `$${price.toFixed(2)}`;
}

// Hàm xóa sản phẩm khỏi giỏ hàng
function removeItem(name) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.name !== name);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}

// Hàm tăng số lượng sản phẩm
function increaseQuantity(name) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity++;
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
    }
}

// Hàm giảm số lượng sản phẩm
function decreaseQuantity(name) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.name === name);
    if (item && item.quantity > 1) {
        item.quantity--;
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
    }
}

// Hàm thêm sản phẩm vào giỏ hàng
function addToCart(name, price, image) {
    // Lấy thông tin giỏ hàng từ localStorage (nếu có)
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Tạo một sản phẩm mới
    const newItem = {
        
        name: name,
        price: price,
        image: image,
        quantity: 1
    };

    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
    const existingItem = cart.find(item => item.name === newItem.name);

    if (existingItem) {
        // Nếu đã tồn tại, tăng số lượng lên 1
        existingItem.quantity++;
    } else {
        // Nếu chưa tồn tại, thêm sản phẩm mới vào giỏ hàng
        cart.push(newItem);
    }

    // Lưu thông tin giỏ hàng vào localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Hiển thị giỏ hàng
    displayCartItems();
}

// Gọi hàm hiển thị giỏ hàng khi trang web được tải lần đầu
displayCartItems();





