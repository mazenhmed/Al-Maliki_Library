// Get products from localStorage or use defaults
function getProducts() {
    const stored = localStorage.getItem('stationeryProducts');
    if (stored) {
        return JSON.parse(stored);
    }
    
    const defaultProducts = [
        { id: 1, name: 'قلم رصاص HB', price: 50, category: 'أقلام', rating: 4.5, image: '✏️' },
        { id: 2, name: 'قلم حبر أزرق', price: 100, category: 'أقلام', rating: 4.8, image: '🖊️' },
        { id: 3, name: 'دفتر 100 ورقة', price: 250, category: 'دفاتر', rating: 4.7, image: '📓' },
        { id: 4, name: 'دفتر رسم A4', price: 400, category: 'دفاتر', rating: 4.6, image: '📒' },
        { id: 5, name: 'علبة ألوان خشبية', price: 800, category: 'أدوات رسم', rating: 4.9, image: '🎨' },
        { id: 6, name: 'ألوان مائية', price: 600, category: 'أدوات رسم', rating: 4.8, image: '🖌️' },
        { id: 7, name: 'مقص مدرسي', price: 300, category: 'أدوات قص', rating: 4.5, image: '✂️' },
        { id: 8, name: 'مقص احترافي', price: 500, category: 'أدوات قص', rating: 4.7, image: '✂️' },
        { id: 9, name: 'حقيبة مدرسية كبيرة', price: 3000, category: 'حقائب', rating: 4.8, image: '🎒' },
        { id: 10, name: 'حقيبة صغيرة', price: 1500, category: 'حقائب', rating: 4.6, image: '👜' },
        { id: 11, name: 'طباعة ورقة A4', price: 20, category: 'طباعة وتصوير', rating: 4.9, image: '🖨️' },
        { id: 12, name: 'تصوير ورقة', price: 15, category: 'طباعة وتصوير', rating: 4.8, image: '📄' },
        { id: 13, name: 'ممحاة بيضاء', price: 30, category: 'أقلام', rating: 4.3, image: '📝' },
        { id: 14, name: 'براية معدنية', price: 80, category: 'أقلام', rating: 4.4, image: '✏️' },
        { id: 15, name: 'مسطرة 30 سم', price: 150, category: 'أدوات رسم', rating: 4.6, image: '📏' },
        { id: 16, name: 'دفتر ملاحظات جلد', price: 700, category: 'دفاتر', rating: 4.8, image: '📔' },
    ];
    
    localStorage.setItem('stationeryProducts', JSON.stringify(defaultProducts));
    return defaultProducts;
}

// Cart State
let cart = [];
let currentCategory = 'الكل';
let products = getProducts();

// Get categories
function getCategories() {
    const stored = localStorage.getItem('stationeryCategories');
    if (stored) {
        return JSON.parse(stored);
    }
    
    const defaultCategories = [
        { name: 'أقلام', icon: '✏️' },
        { name: 'دفاتر', icon: '📓' },
        { name: 'أدوات رسم', icon: '🎨' },
        { name: 'أدوات قص', icon: '✂️' },
        { name: 'حقائب', icon: '🎒' },
        { name: 'طباعة وتصوير', icon: '🖨️' }
    ];
    
    localStorage.setItem('stationeryCategories', JSON.stringify(defaultCategories));
    return defaultCategories;
}

// Load category buttons
function loadCategoryButtons() {
    const categories = getCategories();
    const categoriesGrid = document.querySelector('.categories-grid');
    
    if (!categoriesGrid) return;
    
    categoriesGrid.innerHTML = `
        <button class="category-btn active" onclick="filterProducts('الكل')">الكل</button>
        ${categories.map(cat => 
            `<button class="category-btn" onclick="filterProducts('${cat.name}')">${cat.icon} ${cat.name}</button>`
        ).join('')}
    `;
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadAds();
    loadOffers();
    loadCategoryButtons();
    displayProducts(products);
});

// Display Products
function displayProducts(productsToShow) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';

    productsToShow.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        // Display image
        let imageDisplay = '';
        if (product.image) {
            if (product.image.startsWith('http') || product.image.startsWith('data:image') || product.image.startsWith('logo.')) {
                imageDisplay = `<img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: contain;" onerror="this.outerHTML='<span style=\\'font-size: 4rem;\\'>📚</span>'">`;
            } else {
                imageDisplay = product.image;
            }
        } else {
            imageDisplay = '📚';
        }
        
        card.innerHTML = `
            <div class="product-image">${imageDisplay}</div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-footer">
                    <span class="product-price">${product.price} ريال</span>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">🛒</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Filter Products
function filterProducts(category) {
    currentCategory = category;
    products = getProducts(); // Reload from localStorage
    
    // Update active button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Filter and display
    const filtered = category === 'الكل' 
        ? products 
        : products.filter(p => p.category === category);
    
    displayProducts(filtered);
    
    // Update title
    const title = category === 'الكل' ? 'جميع المنتجات' : `منتجات ${category}`;
    document.getElementById('productsTitle').textContent = title;
}

// Load advertisements
function loadAds() {
    const ads = getAds();
    const adsSlider = document.getElementById('adsSlider');
    
    if (!adsSlider) return;
    
    if (ads.length === 0) {
        adsSlider.innerHTML = '<p style="text-align: center; color: #64748b;">لا توجد إعلانات حالياً</p>';
        return;
    }
    
    adsSlider.innerHTML = ads.map(ad => {
        // Display image
        let imageDisplay = '';
        if (ad.icon) {
            if (ad.icon.startsWith('http') || ad.icon.startsWith('data:image') || ad.icon.startsWith('logo.')) {
                imageDisplay = `<img src="${ad.icon}" alt="${ad.title}" onerror="this.outerHTML='<span style=\\'font-size: 15rem;\\'>🎉</span>'">`;
            } else {
                imageDisplay = ad.icon;
            }
        } else {
            imageDisplay = '🎉';
        }
        
        return `
            <div class="ad-card">
                <div class="ad-icon">${imageDisplay}</div>
                <h3>${ad.title}</h3>
                <p>${ad.description}</p>
            </div>
        `;
    }).join('');
}

// Get ads from localStorage
function getAds() {
    const stored = localStorage.getItem('stationeryAds');
    if (stored) {
        return JSON.parse(stored);
    }
    
    const defaultAds = [
        { icon: '🎉', title: 'افتتاح فرع جديد', description: 'تشرفنا بزيارتكم في فرعنا الجديد' },
        { icon: '🎓', title: 'العودة للمدارس', description: 'خصومات تصل إلى 30% على جميع الأدوات المدرسية' }
    ];
    
    localStorage.setItem('stationeryAds', JSON.stringify(defaultAds));
    return defaultAds;
}

// Load offers
function loadOffers() {
    const offers = getOffers();
    const offersGrid = document.getElementById('offersGrid');
    
    if (!offersGrid) return;
    
    if (offers.length === 0) {
        offersGrid.innerHTML = '<p style="text-align: center; color: #64748b;">لا توجد عروض حالياً</p>';
        return;
    }
    
    // Render offers using the same card structure as ads so appearance matches
    offersGrid.innerHTML = offers.map(offer => {
        let imageDisplay = '';
        if (offer.icon) {
            if (offer.icon.startsWith('http') || offer.icon.startsWith('data:image') || offer.icon.startsWith('logo.')) {
                imageDisplay = `<img src="${offer.icon}" alt="${offer.title}" onerror="this.outerHTML='<span style=\\'font-size: 12rem;\\'>🎁</span>'">`;
            } else {
                imageDisplay = offer.icon;
            }
        } else {
            imageDisplay = '🎁';
        }

        return `
            <div class="ad-card">
                <div class="ad-icon">${imageDisplay}</div>
                <h3>${offer.title}</h3>
                <p>${offer.discount}</p>
            </div>
        `;
    }).join('');
}

// Get offers from localStorage
function getOffers() {
    const stored = localStorage.getItem('stationeryOffers');
    if (stored) {
        return JSON.parse(stored);
    }
    
    const defaultOffers = [
        { icon: '🎁', title: 'عرض خاص', discount: 'خصم 20% على الأقلام' },
        { icon: '💼', title: 'عرض الحقائب', discount: 'اشتري 2 واحصل على الثالثة مجاناً' }
    ];
    
    localStorage.setItem('stationeryOffers', JSON.stringify(defaultOffers));
    return defaultOffers;
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
    
    // Visual feedback
    const button = event.target;
    button.style.transform = 'scale(1.3)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 200);
}

// Update Cart Display
function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartBadge = document.getElementById('cartBadge');
    const cartFooter = document.getElementById('cartFooter');
    const cartTotal = document.getElementById('cartTotal');

    // Update badge
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (totalItems > 0) {
        cartBadge.style.display = 'flex';
        cartBadge.textContent = totalItems;
    } else {
        cartBadge.style.display = 'none';
    }

    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <p>سلة المشتريات فارغة</p>
                <p style="font-size: 0.875rem; margin-top: 0.5rem;">أضف بعض المنتجات للبدء</p>
            </div>
        `;
        cartFooter.style.display = 'none';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">${item.image}</div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${item.price} ريال</div>
                </div>
                <div class="cart-item-controls">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">−</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="qty-btn plus" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    <button class="remove-item-btn" onclick="removeFromCart(${item.id})">×</button>
                </div>
                <button class="remove-item-btn" onclick="removeFromCart(${item.id})">×</button>
            </div>
        `).join('');
        
        cartFooter.style.display = 'block';
        
        // Update total
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `${total.toFixed(2)} ريال`;
    }
}

// Update Quantity
function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
    } else {
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity = newQuantity;
            updateCart();
        }
    }
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Toggle Cart Modal
function toggleCart() {
    const modal = document.getElementById('cartModal');
    modal.classList.toggle('show');
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('سلة المشتريات فارغة!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`شكراً لك! إجمالي المشتريات: ${total.toFixed(2)} ريال يمني\n\nسيتم التواصل معك قريباً لإتمام الطلب.`);
    
    // Clear cart
    cart = [];
    updateCart();
    toggleCart();
}

// Close modal on outside click
document.getElementById('cartModal').addEventListener('click', function(e) {
    if (e.target === this) {
        toggleCart();
    }
});
