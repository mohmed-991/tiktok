import React from 'react';

export default function DriverDashboard({
  user,
  driverRequests,
  offerPrice,
  setOfferPrice,
  onUpdateLocation,
  onLoadRequests,
  onSubmitOffer,
  isDriverOnline,
  setIsDriverOnline,
  onLogout,
}) {
  return (
    <>
      <div className="dashboard-header">
        <div>
          <p>مرحبا {user.name}</p>
          <h2>لوحة السائق</h2>
          <p>الحالة: {isDriverOnline ? 'متصل الآن' : 'غير متصل'}</p>
        </div>
        <button className="secondary-btn" onClick={onLogout}>
          خروج
        </button>
      </div>

      <div className="form-grid driver-controls">
        <button type="button" onClick={onUpdateLocation}>
          حفظ موقعي الحالي
        </button>
        <button type="button" onClick={onLoadRequests}>
          عرض الطلبات الجديدة
        </button>
        <button type="button" className={isDriverOnline ? 'secondary-btn' : ''} onClick={() => setIsDriverOnline((prev) => !prev)}>
          {isDriverOnline ? 'الانتقال إلى أوفلاين' : 'العودة إلى أونلاين'}
        </button>
      </div>

      <div className="offer-list">
        {driverRequests.length === 0 ? (
          <div className="empty-state">لا توجد طلبات جديدة الآن. جرب التحديث.</div>
        ) : (
          driverRequests.map((request) => (
            <div key={request.id} className="offer-card">
              <div>
                <h3>طلب جديد</h3>
                <p>من: {request.from_address}</p>
                <p>إلى: {request.to_address}</p>
                <p>السعر المقترح: {request.suggested_price || 'غير محدد'} جنيه</p>
                {request.distance && <p>المسافة منك: {request.distance.toFixed(1)} كم</p>}
              </div>
              <div className="offer-actions">
                <input
                  type="number"
                  placeholder="سعر العرض"
                  value={offerPrice}
                  onChange={(e) => setOfferPrice(e.target.value)}
                />
                <button onClick={() => onSubmitOffer(request.id)}>أرسل عرض</button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
