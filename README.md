# Toktok Booking Website

هذا المشروع هو نسخة MVP لموقع حجز توكتوك أونلاين بنظام مستخدم/سائق وميزة عروض السعر.

## المجلدات الموجودة

- `backend/` : يحتوي على ملفات Laravel الخاصة بالباك إند.
- `frontend/` : يحتوي على واجهة React الجاهزة.
- `sql/schema.sql` : ملف إنشاء قواعد البيانات والجداول.

---

## الخطوات الأساسية على ويندوز

### 1. تثبيت الأدوات

1. إذا عندك Wampserver مثبت، استخدمه لأنه يوفّر PHP وMySQL جاهزين.
   - افتح Wampserver وشغّل `Apache` و `MySQL`.
2. أضف مسار PHP من Wampserver إلى PATH:
   - افتح إعدادات البيئة `Environment Variables`
   - تحت `System variables` عدّل `Path`
   - أضف مثلاً: `C:\wamp64\bin\php\php8.1.0` أو المسار الموجود عندك داخل `wamp64\bin\php`
3. نزّل Composer من:
   - https://getcomposer.org/download/
   - أثناء التثبيت اختر مسار PHP الخاص بـ Wampserver مثل:
     - `C:\wamp64\bin\php\php8.1.0\php.exe`
4. نزّل Node.js من:
   - https://nodejs.org/
5. نزّل VS Code.

### 2. تأكد أن البيئة تشتغل

افتح CMD جديد واكتب:

```powershell
php -v
composer -v
node -v
npm -v
```

إذا ظهرت أي مشكلة في `php` أو `composer`، فتأكد من أنك أضفت مسار PHP الخاص بـ Wampserver إلى PATH، وأن ملف `php.ini` في ذلك المجلد مفعل فيه `extension=openssl`.

---

## 3. إنشاء قاعدة البيانات

1. افتح: `http://localhost/phpmyadmin`
2. أنشئ قاعدة بيانات باسم:
   - `toktok`
3. نفّذ محتوى `sql/schema.sql` لإنشاء الجداول.

---

## 4. إعداد Laravel Backend

1. افتح CMD في مجلد المشروع أو في:
   - `C:\Users\<YourName>\Desktop\tik tok`
2. أنشئ مشروع Laravel داخل `backend`:

```powershell
composer create-project laravel/laravel backend
```

3. افتح `backend/.env` وعدّل:

```dotenv
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=toktok
DB_USERNAME=root
DB_PASSWORD=
```

4. إذا نسخت الملف `.env.example`، فانسخه إلى `.env` في مجلد `backend` ثم شغّل:

```powershell
php artisan key:generate
```

> ملاحظة: قاعدة البيانات الحالية للمشروع هي `toktok`.
> هناك حساب مدير جاهز للتجربة: رقم الهاتف `01000000000` وكلمة المرور `admin123`.
>
5. انسخ ملفات `backend/app/Http/Controllers` و `backend/routes/api.php` و `backend/app/Http/Middleware/ApiTokenMiddleware.php` و `backend/app/Http/Middleware/EnsureRole.php` و `backend/database/migrations` إلى مشروع Laravel الذي أنشأته.

   ثم افتح `backend/app/Http/Kernel.php` وأضف هذا السطر إلى مصفوفة `$routeMiddleware`:

   ```php
   'api_token' => \App\Http\Middleware\ApiTokenMiddleware::class,
   'role' => \App\Http\Middleware\EnsureRole::class,
   ```

5. شغّل Laravel:

```powershell
cd backend
php artisan serve
```

سيعمل السيرفر على:

```
http://127.0.0.1:8000
```

---

## 5. إعداد React Frontend

1. افتح CMD في مجلد المشروع:
   - `C:\Users\<YourName>\Desktop\tik tok`
2. أنشئ مشروع React باستخدام Vite:

```powershell
npm create vite@latest frontend -- --template react
```

3. انسخ ملفات `frontend/package.json`, `frontend/vite.config.js`, `frontend/index.html`, و `frontend/src/*` إلى المشروع.
4. ثبّت الاعتمادات:

```powershell
cd frontend
npm install
npm run dev
```

---

## 6. مسار العمل

### تسجيل مستخدم
- `POST /api/register`
- `POST /api/login`

### المستخدم
- إنشاء طلب رحلة
- عرض العروض
- اختيار عرض
- متابعة الرحلة

### السائق
- رؤية الطلبات القريبة
- تقديم عرض سعر
- قبول الطلب وإدارة الرحلة

---

## 7. تشغيل المشروع

1. شغّل XAMPP (`Apache`, `MySQL`).
2. شغّل `php artisan serve` داخل `backend`.
3. شغّل `npm run dev` داخل `frontend`.
4. افتح المتصفح على عنوان Vite المعروض.

---

## 8. رفع المشروع

- منشئ الويب `frontend` يبنى بـ:

```powershell
npm run build
```

- `backend` يرفع على سيرفر VPS أو استضافة تدعم PHP 8.1+ و MySQL.
- استخدم HTTPS و SSL.

---

## ملاحظات مهمة

- المشروع مصمم كـ MVP قابل للتطوير.
- إذا أردت أن أضيف لك بعد ذلك خريطة Google Maps وتتبّع حي، أقدر أجهز لك الخطوات التالية.
- هذه النسخة تعمل كنقطة انطلاق كاملة مع نظام مستخدم/سائق.
