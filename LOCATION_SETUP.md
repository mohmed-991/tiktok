# نظام البحث والملاحة (Location Intelligence System) - دليل الإعدادات

## ماتم تنفيذه:

### 1. **Frontend Integration**

#### Google Maps Services المستخدمة:
- **Places Autocomplete API**: بحث حي عن العناوين مع اقتراحات (Predictions)
- **Geocoding API**: تحويل الإحداثيات إلى عناوين (Reverse Geocoding)
- **Directions API**: رسم المسار وحساب المسافة والوقت (ETA)

#### الميزات المنفذة:
✅ تحميل مكتبات Google Maps بديناميكية من `import.meta.env.VITE_GOOGLE_MAPS_API_KEY`
✅ نظام Debouncing (300ms) على خانة البحث لتقليل عدد الطلبات
✅ Location Biasing - الاقتراحات تظهر بناءً على موقع المستخدم الحالي
✅ Reverse Geocoding - عند سحب الدبوس على الخريطة، يتم تحويل الموقع لعنوان مباشرة
✅ رسم المسار (Polyline) على الخريطة الخاصة بـ Leaflet
✅ استلام المسافة بالكيلومتر والوقت المتوقع (ETA) من Google Directions

#### المتغيرات الجديدة في الـ State:
- `googleReady`: التحقق من جاهزية Google Maps
- `routeDistanceKm`: المسافة بالكيلومتر من API
- `routeDurationText`: الوقت المتوقع (نصي)
- `routeDurationMinutes`: الوقت بالدقائق
- `autocompleteService`: خدمة البحث
- `placesService`: خدمة تفاصيل الأماكن
- `geocoder`: خدمة التحويل (Coordinates ↔ Address)
- `directionsService`: خدمة المسارات
- `userLocation`: موقع المستخدم الحالي

### 2. **Backend Updates**

#### ملفات جديدة:
- `app/Http/Controllers/LocationController.php`: معالجة حسابات الأسعار

#### الحقول الجديدة في جدول `ride_requests`:
```sql
- route_distance_km: المسافة من Google
- route_duration_minutes: الوقت بالدقائق
- estimated_fare: السعر المحسوب
- route_polyline: مسار Google (Polyline)
- directions_json: بيانات Google Directions كاملة (JSON)
```

#### معادلة حساب السعر:
```
Base Fare = 25 جنيه
Distance Fare = distance_km × 9 جنيه/كم
Duration Fare = duration_minutes × 0.5 جنيه/دقيقة
Total = max(25, Base + Distance + Duration)
```

#### API Endpoints الجديدة:
- `POST /api/location/calculate-fare`: حساب السعر بناءً على المسافة والوقت

### 3. **Frontend .env Configuration**

إنشاء ملف `.env` في المجلد `frontend/`:
```env
VITE_GOOGLE_MAPS_API_KEY=your_key_here
```

## خطوات الإعدادات:

### أولاً: الحصول على Google Maps API Key:

1. اذهب إلى [Google Cloud Console](https://console.cloud.google.com/)
2. أنشئ مشروع جديد
3. فعّل الـ APIs التالية:
   - Maps JavaScript API
   - Places API
   - Geocoding API
   - Directions API
4. أنشئ API Key من Credentials
5. أضِف قيود على الـ Key:
   - **HTTP referrers**: `http://localhost:5173/*`, `http://192.168.8.120:5173/*`
   - **API restrictions**: اختر الـ APIs المذكورة أعلاه فقط

### ثانياً: إضافة الـ API Key في الـ Frontend:

في ملف `frontend/.env`:
```env
VITE_GOOGLE_MAPS_API_KEY=AIzaSyD...your_actual_key_here
```

### ثالثاً: تشغيل الخوادم:

**الـ Backend:**
```bash
cd backend
php artisan serve
```

**الـ Frontend:**
```bash
cd frontend
npm run dev
```

## كيفية الاستخدام:

### تدفق المستخدم:

1. **البحث عن عنوان**:
   - المستخدم يكتب في خانة البحث
   - بعد 300ms من التوقف عن الكتابة، يتم إرسال طلب للـ API
   - تظهر الاقتراحات المحدثة بناءً على الموقع الحالي

2. **اختيار العنوان**:
   - المستخدم يختار من الاقتراحات
   - يتم استلام `place_id` والبيانات الكاملة من Google
   - تحديث الإحداثيات والعنوان في الـ UI

3. **سحب الدبوس**:
   - المستخدم يسحب الدبوس على الخريطة
   - عند التوقف، يتم عمل Reverse Geocoding
   - يظهر العنوان تحت الخريطة تلقائياً

4. **حساب المسار**:
   - بعد اختيار البداية والنهاية، يتم حساب المسار الفعلي
   - يظهر الـ Polyline (خط المسار) على الخريطة
   - يتم عرض المسافة الفعلية و ETA

5. **إنشاء الطلب**:
   - المستخدم يضع السعر ويضغط "اطلب الرحلة"
   - يتم إرسال البيانات للـ Backend:
     - الإحداثيات والعناوين
     - المسافة من Google Directions
     - الوقت المتوقع
     - السعر المحسوب
   - الـ Backend يحفظ كل البيانات في قاعدة البيانات

## ملاحظات أمان:

⚠️ **تصريح الـ API Key**:
- لا تستخدم نفس Key في الإنتاج والتطوير
- استخدم HTTP Referrers restrictions دائماً
- حدّد الـ APIs المسموحة فقط
- راقب استخدام الـ API في Console

⚠️ **المسافات والأسعار**:
- Google Directions API يحسب المسافة بدقة أعلى من Haversine
- التسعير بناءً على المسافة الفعلية من الخريطة وليس البسيطة
- الوقت يأخذ حالة المرور في الاعتبار (traffic_model: 'best_guess')

## استكشاف الأخطاء:

### المشكلة: "خدمة بحث Google غير جاهزة"
**الحل**: تحقق من:
- هل تم تحميل `VITE_GOOGLE_MAPS_API_KEY` بشكل صحيح؟
- هل الـ API Key فعّال وليس معطّل؟
- هل تم تفعيل Places API في Google Cloud Console؟

### المشكلة: "تعذّر الحصول على المسار"
**الحل**:
- تحقق من تفعيل Directions API
- تأكد أن الإحداثيات صحيحة
- راجع الأخطاء في Console

### المشكلة: "السعر المحسوب خاطئ"
**الحل**:
- تحقق من معادلة التسعير في LocationController
- تأكد من تحديث الـ Migration بنجاح
- تحقق من البيانات المرسلة من الـ Frontend

## References:

- [Google Places API Docs](https://developers.google.com/maps/documentation/places/web-service/overview)
- [Google Geocoding API Docs](https://developers.google.com/maps/documentation/geocoding/overview)
- [Google Directions API Docs](https://developers.google.com/maps/documentation/directions/overview)
- [Leaflet Polyline Docs](https://leafletjs.com/reference.html#polyline)
