// Initialize admin panel
document.addEventListener('DOMContentLoaded', function() {
    // التحقق من تسجيل الدخول
    if (!checkAdminAuth()) {
        return;
    }
    
    // عرض اسم المدير
    displayAdminInfo();
    
    loadCategories();
    loadProducts();
    loadAds();
    loadOffers();
    updateStats();
    populateCategoryDropdown();
});

// التحقق من تسجيل دخول المدير
function checkAdminAuth() {
    const localAuth = localStorage.getItem('adminAuth');
    const sessionAuth = sessionStorage.getItem('adminAuth');
    
    if (!localAuth && !sessionAuth) {
        window.location.href = 'admin-login.html';
        return false;
    }
    
    const authData = JSON.parse(localAuth || sessionAuth);
    if (!authData.isLoggedIn) {
        window.location.href = 'admin-login.html';
        return false;
    }
    
    return true;
}

// عرض معلومات المدير
function displayAdminInfo() {
    const localAuth = localStorage.getItem('adminAuth');
    const sessionAuth = sessionStorage.getItem('adminAuth');
    const authData = JSON.parse(localAuth || sessionAuth);
    
    const usernameElement = document.getElementById('adminUsername');
    if (usernameElement) {
        usernameElement.textContent = `مرحباً، ${authData.username}`;
    }
}

// تسجيل الخروج
function logout() {
    if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
        localStorage.removeItem('adminAuth');
        sessionStorage.removeItem('adminAuth');
        window.location.href = 'admin-login.html';
    }
}

// Show section
function showSection(section) {
    document.querySelectorAll('.content-section').forEach(sec => {
        sec.classList.remove('active');
    });
    
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    event.target.classList.add('active');
    
    if (section === 'products') {
        document.getElementById('productsSection').classList.add('active');
        document.getElementById('sectionTitle').textContent = 'إدارة المنتجات';
    } else if (section === 'categories') {
        document.getElementById('categoriesSection').classList.add('active');
        document.getElementById('sectionTitle').textContent = 'إدارة الأقسام';
    } else if (section === 'ads') {
        document.getElementById('adsSection').classList.add('active');
        document.getElementById('sectionTitle').textContent = 'الإعلانات والعروض';
    } else if (section === 'orders') {
        document.getElementById('ordersSection').classList.add('active');
        document.getElementById('sectionTitle').textContent = 'الطلبات';
    }
}

// Load products from localStorage
function loadProducts() {
    const products = getProducts();
    const tbody = document.getElementById('productsTableBody');
    tbody.innerHTML = '';
    
    products.forEach(product => {
        const row = document.createElement('tr');
        
        // Display image
        let imageDisplay = '';
        if (product.image) {
            if (product.image.startsWith('http') || product.image.startsWith('data:image') || product.image.startsWith('logo.')) {
                imageDisplay = `<img src="${product.image}" style="width: 40px; height: 40px; object-fit: contain; border-radius: 5px;" onerror="this.outerHTML='<span class=\"product-icon\">📚</span>'">`;
            } else {
                imageDisplay = `<span class="product-icon">${product.image}</span>`;
            }
        } else {
            imageDisplay = '<span class="product-icon">📚</span>';
        }
        
        row.innerHTML = `
            <td>${imageDisplay}</td>
            <td>${product.name}</td>
            <td>${product.price} ريال</td>
            <td>${product.category}</td>
            <td class="product-actions">
                <button class="btn btn-edit" onclick="editProduct(${product.id})">✏️ تعديل</button>
                <button class="btn btn-danger" onclick="deleteProduct(${product.id})">🗑️ حذف</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Get products from localStorage
function getProducts() {
    const stored = localStorage.getItem('stationeryProducts');
    if (stored) {
        return JSON.parse(stored);
    }
    
    // Default products
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

// Update stats
function updateStats() {
    const products = getProducts();
    document.getElementById('totalProducts').textContent = products.length;
}

// Show add product modal
function showAddProductModal() {
    document.getElementById('modalTitle').textContent = 'إضافة منتج جديد';
    document.getElementById('productForm').reset();
    document.getElementById('productId').value = '';
    document.getElementById('productModal').classList.add('show');
}

// Close product modal
function closeProductModal() {
    document.getElementById('productModal').classList.remove('show');
}

// Save product
function saveProduct(event) {
    event.preventDefault();
    
    const products = getProducts();
    const id = document.getElementById('productId').value;
    const imageInput = document.getElementById('productImage').value || '📚';
    
    const product = {
        id: id ? parseInt(id) : Date.now(),
        name: document.getElementById('productName').value,
        price: parseFloat(document.getElementById('productPrice').value),
        category: document.getElementById('productCategory').value,
        image: imageInput
    };
    
    if (id) {
        const index = products.findIndex(p => p.id === parseInt(id));
        products[index] = product;
    } else {
        products.push(product);
    }
    
    localStorage.setItem('stationeryProducts', JSON.stringify(products));
    
    loadProducts();
    updateStats();
    closeProductModal();
    
    alert('تم حفظ المنتج بنجاح!');
}

// Handle image upload
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('productImage').value = e.target.result;
            
            // Show preview
            const preview = document.getElementById('imagePreview');
            const previewImg = document.getElementById('previewImg');
            previewImg.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

// Edit product
function editProduct(id) {
    const products = getProducts();
    const product = products.find(p => p.id === id);
    
    if (product) {
        document.getElementById('modalTitle').textContent = 'تعديل المنتج';
        document.getElementById('productId').value = product.id;
        document.getElementById('productName').value = product.name;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productCategory').value = product.category;
        document.getElementById('productImage').value = product.image || '';
        
        // Show preview if it's an image URL or base64
        if (product.image && (product.image.startsWith('http') || product.image.startsWith('data:image'))) {
            const preview = document.getElementById('imagePreview');
            const previewImg = document.getElementById('previewImg');
            previewImg.src = product.image;
            preview.style.display = 'block';
        }
        
        document.getElementById('productModal').classList.add('show');
    }
}

// Delete product
function deleteProduct(id) {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
        const products = getProducts();
        const filtered = products.filter(p => p.id !== id);
        
        localStorage.setItem('stationeryProducts', JSON.stringify(filtered));
        
        loadProducts();
        updateStats();
        
        alert('تم حذف المنتج بنجاح!');
    }
}

// Load advertisements
function loadAds() {
    const ads = getAds();
    const adsList = document.getElementById('adsList');
    
    if (ads.length === 0) {
        adsList.innerHTML = '<p style="color: #94a3b8; padding: 1rem;">لا توجد إعلانات</p>';
        return;
    }
    
    adsList.innerHTML = ads.map((ad, index) => {
        // Display image
        let imageDisplay = '';
        if (ad.icon) {
            if (ad.icon.startsWith('http') || ad.icon.startsWith('data:image') || ad.icon.startsWith('logo.')) {
                imageDisplay = `<img src="${ad.icon}" style="width: 60px; height: 60px; object-fit: contain; border-radius: 8px;" onerror="this.outerHTML='<span style=\"font-size: 2rem;\">🎉</span>'">`;
            } else {
                imageDisplay = `<span style="font-size: 2rem;">${ad.icon}</span>`;
            }
        } else {
            imageDisplay = '<span style="font-size: 2rem;">🎉</span>';
        }
        
        return `
            <div class="ad-item">
                <div class="ad-preview">
                    <div class="ad-image">${imageDisplay}</div>
                    <div>
                        <h4>${ad.title}</h4>
                        <p style="color: #64748b; font-size: 0.875rem;">${ad.description}</p>
                    </div>
                </div>
                <div style="display: flex; gap: 0.5rem;">
                    <button class="btn btn-edit" onclick="editAd(${index})">✏️</button>
                    <button class="btn btn-danger" onclick="deleteAd(${index})">🗑️</button>
                </div>
            </div>
        `;
    }).join('');
}

// Get ads
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

// Show add advertisement modal
function showAddAdModal() {
    document.getElementById('adModalTitle').textContent = 'إضافة إعلان جديد';
    document.getElementById('adForm').reset();
    document.getElementById('adIndex').value = '';
    document.getElementById('adImagePreview').style.display = 'none';
    document.getElementById('adModal').classList.add('show');
}

// Close advertisement modal
function closeAdModal() {
    document.getElementById('adModal').classList.remove('show');
}

// Handle ad image upload
function handleAdImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('adIcon').value = e.target.result;
            
            // Show preview
            const preview = document.getElementById('adImagePreview');
            const previewImg = document.getElementById('adPreviewImg');
            previewImg.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

// Save advertisement
function saveAd(event) {
    event.preventDefault();
    
    const ads = getAds();
    const index = document.getElementById('adIndex').value;
    const iconInput = document.getElementById('adIcon').value || '🎉';
    
    const ad = {
        title: document.getElementById('adTitle').value,
        description: document.getElementById('adDescription').value,
        icon: iconInput
    };
    
    if (index !== '') {
        ads[parseInt(index)] = ad;
    } else {
        ads.push(ad);
    }
    
    localStorage.setItem('stationeryAds', JSON.stringify(ads));
    loadAds();
    closeAdModal();
    
    alert('تم حفظ الإعلان بنجاح!');
}

// Edit advertisement
function editAd(index) {
    const ads = getAds();
    const ad = ads[index];
    
    document.getElementById('adModalTitle').textContent = 'تعديل الإعلان';
    document.getElementById('adIndex').value = index;
    document.getElementById('adTitle').value = ad.title;
    document.getElementById('adDescription').value = ad.description;
    document.getElementById('adIcon').value = ad.icon || '';
    
    // Show preview if it's an image URL or base64
    if (ad.icon && (ad.icon.startsWith('http') || ad.icon.startsWith('data:image'))) {
        const preview = document.getElementById('adImagePreview');
        const previewImg = document.getElementById('adPreviewImg');
        previewImg.src = ad.icon;
        preview.style.display = 'block';
    }
    
    document.getElementById('adModal').classList.add('show');
}

// Delete ad
function deleteAd(index) {
    if (confirm('هل تريد حذف هذا الإعلان؟')) {
        const ads = getAds();
        ads.splice(index, 1);
        
        localStorage.setItem('stationeryAds', JSON.stringify(ads));
        loadAds();
    }
}

// Load offers
function loadOffers() {
    const offers = getOffers();
    const offersList = document.getElementById('offersList');
    
    if (offers.length === 0) {
        offersList.innerHTML = '<p style="color: #94a3b8; padding: 1rem;">لا توجد عروض</p>';
        return;
    }
    
    offersList.innerHTML = offers.map((offer, index) => {
        // Display image
        let imageDisplay = '';
        if (offer.icon) {
            if (offer.icon.startsWith('http') || offer.icon.startsWith('data:image') || offer.icon.startsWith('logo.')) {
                imageDisplay = `<img src="${offer.icon}" style="width: 60px; height: 60px; object-fit: contain; border-radius: 8px;" onerror="this.outerHTML='<span style=\"font-size: 2rem;\">🎁</span>'">`;
            } else {
                imageDisplay = `<span style="font-size: 2rem;">${offer.icon}</span>`;
            }
        } else {
            imageDisplay = '<span style="font-size: 2rem;">🎁</span>';
        }
        
        return `
            <div class="offer-item">
                <div class="ad-preview">
                    <div class="ad-image">${imageDisplay}</div>
                    <div>
                        <h4>${offer.title}</h4>
                        <p style="color: #64748b; font-size: 0.875rem;">${offer.discount}</p>
                    </div>
                </div>
                <div style="display: flex; gap: 0.5rem;">
                    <button class="btn btn-edit" onclick="editOffer(${index})">✏️</button>
                    <button class="btn btn-danger" onclick="deleteOffer(${index})">🗑️</button>
                </div>
            </div>
        `;
    }).join('');
}

// Get offers
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

// Show add offer modal
function showAddOfferModal() {
    document.getElementById('offerModalTitle').textContent = 'إضافة عرض جديد';
    document.getElementById('offerForm').reset();
    document.getElementById('offerIndex').value = '';
    document.getElementById('offerImagePreview').style.display = 'none';
    document.getElementById('offerModal').classList.add('show');
}

// Close offer modal
function closeOfferModal() {
    document.getElementById('offerModal').classList.remove('show');
}

// Handle offer image upload
function handleOfferImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('offerIcon').value = e.target.result;
            
            // Show preview
            const preview = document.getElementById('offerImagePreview');
            const previewImg = document.getElementById('offerPreviewImg');
            previewImg.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

// Save offer
function saveOffer(event) {
    event.preventDefault();
    
    const offers = getOffers();
    const index = document.getElementById('offerIndex').value;
    const iconInput = document.getElementById('offerIcon').value || '🎁';
    
    const offer = {
        title: document.getElementById('offerTitle').value,
        discount: document.getElementById('offerDiscount').value,
        icon: iconInput
    };
    
    if (index !== '') {
        offers[parseInt(index)] = offer;
    } else {
        offers.push(offer);
    }
    
    localStorage.setItem('stationeryOffers', JSON.stringify(offers));
    loadOffers();
    closeOfferModal();
    
    alert('تم حفظ العرض بنجاح!');
}

// Edit offer
function editOffer(index) {
    const offers = getOffers();
    const offer = offers[index];
    
    document.getElementById('offerModalTitle').textContent = 'تعديل العرض';
    document.getElementById('offerIndex').value = index;
    document.getElementById('offerTitle').value = offer.title;
    document.getElementById('offerDiscount').value = offer.discount;
    document.getElementById('offerIcon').value = offer.icon || '';
    
    // Show preview if it's an image URL or base64
    if (offer.icon && (offer.icon.startsWith('http') || offer.icon.startsWith('data:image'))) {
        const preview = document.getElementById('offerImagePreview');
        const previewImg = document.getElementById('offerPreviewImg');
        previewImg.src = offer.icon;
        preview.style.display = 'block';
    }
    
    document.getElementById('offerModal').classList.add('show');
}

// Delete offer
function deleteOffer(index) {
    if (confirm('هل تريد حذف هذا العرض؟')) {
        const offers = getOffers();
        offers.splice(index, 1);
        
        localStorage.setItem('stationeryOffers', JSON.stringify(offers));
        loadOffers();
    }
}

// ========== Categories Management ==========

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

// Load categories
function loadCategories() {
    const categories = getCategories();
    const categoriesList = document.getElementById('categoriesList');
    
    if (!categoriesList) return;
    
    if (categories.length === 0) {
        categoriesList.innerHTML = '<p style="color: #94a3b8; padding: 1rem;">لا توجد أقسام</p>';
        return;
    }
    
    categoriesList.innerHTML = categories.map((category, index) => `
        <div class="ad-item">
            <div class="ad-preview">
                <div class="ad-image">${category.icon}</div>
                <div>
                    <h4>${category.name}</h4>
                </div>
            </div>
            <div style="display: flex; gap: 0.5rem;">
                <button class="btn btn-edit" onclick="editCategory(${index})">✏️</button>
                <button class="btn btn-danger" onclick="deleteCategory(${index})">🗑️</button>
            </div>
        </div>
    `).join('');
}

// Show add category modal
function showAddCategoryModal() {
    document.getElementById('categoryModalTitle').textContent = 'إضافة قسم جديد';
    document.getElementById('categoryForm').reset();
    document.getElementById('categoryIndex').value = '';
    document.getElementById('categoryModal').classList.add('show');
}

// Close category modal
function closeCategoryModal() {
    document.getElementById('categoryModal').classList.remove('show');
}

// Save category
function saveCategory(event) {
    event.preventDefault();
    
    const categories = getCategories();
    const index = document.getElementById('categoryIndex').value;
    
    const category = {
        name: document.getElementById('categoryName').value,
        icon: document.getElementById('categoryIcon').value
    };
    
    if (index !== '') {
        categories[parseInt(index)] = category;
    } else {
        categories.push(category);
    }
    
    localStorage.setItem('stationeryCategories', JSON.stringify(categories));
    
    loadCategories();
    populateCategoryDropdown();
    closeCategoryModal();
    
    alert('تم حفظ القسم بنجاح!');
}

// Edit category
function editCategory(index) {
    const categories = getCategories();
    const category = categories[index];
    
    document.getElementById('categoryModalTitle').textContent = 'تعديل القسم';
    document.getElementById('categoryIndex').value = index;
    document.getElementById('categoryName').value = category.name;
    document.getElementById('categoryIcon').value = category.icon;
    
    document.getElementById('categoryModal').classList.add('show');
}

// Delete category
function deleteCategory(index) {
    if (confirm('هل تريد حذف هذا القسم؟ سيتم حذف جميع المنتجات في هذا القسم أيضاً.')) {
        const categories = getCategories();
        const categoryName = categories[index].name;
        
        // Remove category
        categories.splice(index, 1);
        localStorage.setItem('stationeryCategories', JSON.stringify(categories));
        
        // Remove products in this category
        const products = getProducts();
        const filteredProducts = products.filter(p => p.category !== categoryName);
        localStorage.setItem('stationeryProducts', JSON.stringify(filteredProducts));
        
        loadCategories();
        loadProducts();
        populateCategoryDropdown();
        updateStats();
        
        alert('تم حذف القسم والمنتجات المرتبطة به بنجاح!');
    }
}

// Populate category dropdown
function populateCategoryDropdown() {
    const categories = getCategories();
    const dropdown = document.getElementById('productCategory');
    
    if (!dropdown) return;
    
    dropdown.innerHTML = categories.map(cat => 
        `<option value="${cat.name}">${cat.icon} ${cat.name}</option>`
    ).join('');
}
