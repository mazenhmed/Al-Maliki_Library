// بيانات المدير الافتراضية (في التطبيق الحقيقي، يجب أن تكون في قاعدة البيانات)
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123',
    email: 'admin@stationery.com'
};

// التحقق من تسجيل الدخول عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // إذا كان المدير مسجل دخوله بالفعل، انتقل إلى لوحة التحكم
    if (isAdminLoggedIn()) {
        window.location.href = 'admin.html';
    }
});

// معالجة نموذج تسجيل الدخول
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // التحقق من بيانات الدخول
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        // حفظ حالة تسجيل الدخول
        const loginData = {
            isLoggedIn: true,
            username: username,
            loginTime: new Date().toISOString(),
            rememberMe: rememberMe
        };
        
        if (rememberMe) {
            localStorage.setItem('adminAuth', JSON.stringify(loginData));
        } else {
            sessionStorage.setItem('adminAuth', JSON.stringify(loginData));
        }
        
        // عرض رسالة نجاح
        showSuccess('تم تسجيل الدخول بنجاح! جاري التحويل...');
        
        // الانتقال إلى لوحة التحكم بعد ثانية
        setTimeout(() => {
            window.location.href = 'admin.html';
        }, 1000);
        
    } else {
        showError('اسم المستخدم أو كلمة المرور غير صحيحة');
        
        // هز الحقول
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            input.style.animation = 'shake 0.5s';
            setTimeout(() => {
                input.style.animation = '';
            }, 500);
        });
    }
});

// إظهار/إخفاء كلمة المرور
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.querySelector('.password-toggle');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        toggleIcon.textContent = '👁️';
    }
}

// نسيت كلمة المرور
function forgotPassword() {
    alert(`للحصول على كلمة مرور جديدة، يرجى التواصل مع:\n\nالبريد الإلكتروني: ${ADMIN_CREDENTIALS.email}\n\nبيانات المدير الافتراضية:\nاسم المستخدم: admin\nكلمة المرور: admin123`);
}

// التحقق من تسجيل دخول المدير
function isAdminLoggedIn() {
    const localAuth = localStorage.getItem('adminAuth');
    const sessionAuth = sessionStorage.getItem('adminAuth');
    
    if (localAuth || sessionAuth) {
        const authData = JSON.parse(localAuth || sessionAuth);
        return authData.isLoggedIn === true;
    }
    
    return false;
}

// عرض رسالة خطأ
function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}

// عرض رسالة نجاح
function showSuccess(message) {
    const successDiv = document.getElementById('successMessage');
    successDiv.textContent = message;
    successDiv.style.display = 'block';
}

// منع العودة بعد تسجيل الخروج
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        window.location.reload();
    }
});
