# 🚀 دليل رفع الموقع على GitHub Pages

## الطريقة الأولى: باستخدام GitHub Desktop (الأسهل)

### الخطوة 1: تحميل GitHub Desktop
1. اذهب إلى: https://desktop.github.com
2. حمّل وثبّت البرنامج

### الخطوة 2: تسجيل الدخول
1. افتح GitHub Desktop
2. اضغط على "File" → "Options" → "Sign in"
3. سجل دخولك بحساب GitHub

### الخطوة 3: إضافة المشروع
1. اضغط "File" → "Add local repository"
2. اختر مجلد المشروع: `stationery-simple`
3. إذا لم يكن repository، اضغط "Create repository"

### الخطوة 4: رفع المشروع
1. في GitHub Desktop، اكتب رسالة في "Summary": `Initial commit - المكتبة المتكاملة`
2. اضغط "Commit to main"
3. اضغط "Publish repository"
4. اختر اسم للـ repository (مثال: `stationery-store`)
5. احذف علامة ✓ من "Keep this code private" (لجعله عام)
6. اضغط "Publish repository"

### الخطوة 5: تفعيل GitHub Pages
1. اذهب إلى الموقع: https://github.com
2. افتح الـ repository الخاص بك
3. اضغط على "Settings" (أعلى يمين)
4. من القائمة اليسرى، اضغط "Pages"
5. في "Source"، اختر "main" branch
6. اضغط "Save"
7. انتظر دقيقة، وسيظهر لك الرابط!

### الرابط سيكون بصيغة:
```
https://username.github.io/stationery-store/
```

---

## الطريقة الثانية: باستخدام Git من Command Line

### الخطوة 1: تثبيت Git
- حمّل من: https://git-scm.com/download/win

### الخطوة 2: تهيئة المشروع
افتح PowerShell في مجلد المشروع واكتب:

```bash
git init
git add .
git commit -m "Initial commit - المكتبة المتكاملة"
```

### الخطوة 3: إنشاء Repository على GitHub
1. اذهب إلى: https://github.com/new
2. اكتب اسم للـ repository (مثال: `stationery-store`)
3. اجعله Public
4. اضغط "Create repository"

### الخطوة 4: ربط المشروع ورفعه
```bash
git remote add origin https://github.com/USERNAME/stationery-store.git
git branch -M main
git push -u origin main
```
(استبدل USERNAME باسم المستخدم الخاص بك)

### الخطوة 5: تفعيل GitHub Pages
اتبع نفس الخطوات من الطريقة الأولى (الخطوة 5)

---

## 📋 ملاحظات مهمة

### ✅ بيانات تسجيل الدخول الافتراضية للمدير:
- **اسم المستخدم:** admin
- **كلمة المرور:** admin123

⚠️ **تنبيه أمني:** قم بتغيير هذه البيانات في ملف `admin-login.js` قبل الرفع!

### 🔄 تحديث الموقع
عند إجراء تعديلات:
1. احفظ التغييرات
2. في GitHub Desktop، اكتب وصف التغيير
3. اضغط "Commit" ثم "Push origin"
4. انتظر دقيقة حتى يتم التحديث تلقائياً

### 📱 مشاركة الرابط مع العميل
بعد الرفع، أرسل للعميل:
- **رابط الموقع:** https://username.github.io/stationery-store/
- **رابط لوحة التحكم:** https://username.github.io/stationery-store/admin-login.html

---

## 🆘 حل المشاكل الشائعة

### الصور لا تظهر؟
- تأكد من أن ملف `logo.jpg` موجود في المجلد
- تأكد من رفع جميع الملفات

### الموقع لا يعمل؟
- انتظر 2-3 دقائق بعد التفعيل
- تأكد من اختيار "main" branch في الإعدادات
- حدّث الصفحة بـ Ctrl+F5

### خطأ في Git؟
- تأكد من تثبيت Git بشكل صحيح
- أعد تشغيل PowerShell بعد التثبيت

---

## 🎉 بعد الرفع
✅ الموقع سيكون متاحاً للجميع
✅ يعمل على الموبايل والكمبيوتر
✅ سريع وآمن
✅ مجاني بالكامل!
