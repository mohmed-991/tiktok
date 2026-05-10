import React from 'react';

export default function OffersPage({
  offers,
  loadOffers,
  sortOffers,
  setSortOffers,
  selectedOfferId,
  setSelectedOfferId,
  acceptOffer,
  rideInfo,
  loading,
}) {
  return (
    <>
      <div className="dashboard-header">
        <div>
          <p>عروض السائقين</p>
          <h2>اختر السائق المناسب لك</h2>
          <p>السعر المقترح: {rideInfo?.suggested_price || '--'} جنيه</p>
        </div>
        <button className="secondary-btn" onClick={loadOffers}>
          تحديث العروض
        </button>
      </div>

      <div className="sort-bar">
        <p>الفرز حسب:</p>
        <button className={sortOffers === 'price' ? 'active' : ''} onClick={() => setSortOffers('price')}>
          السعر
        </button>
        <button className={sortOffers === 'newest' ? 'active' : ''} onClick={() => setSortOffers('newest')}>
          الأحدث
        </button>
      </div>

      <div className="offer-list">
        {offers.length === 0 ? (
          <div className="empty-state">لا توجد عروض حتى الآن، حاول التحديث بعد قليل.</div>
        ) : (
          [...offers]
            .sort((a, b) => {
              if (sortOffers === 'newest') return new Date(b.created_at) - new Date(a.created_at);
              return a.price - b.price;
            })
            .map((offer) => (
              <div key={offer.id} className={`offer-card ${selectedOfferId === offer.id ? 'selected-card' : ''}`}>
                <div>
                  <h3>{offer.driver_name || 'سائق'}</h3>
                  <p>السعر: {offer.price} جنيه</p>
                  <p>التوكتوك: {offer.vehicle_number || 'غير محدد'}</p>
                  <p>الحالة: {offer.status}</p>
                </div>
                <div className="offer-actions">
                  <button
                    disabled={loading}
                    onClick={() => {
                      setSelectedOfferId(offer.id);
                      acceptOffer(offer.id);
                    }}
                  >
                    اختر العرض
                  </button>
                  <button className="secondary-btn" onClick={() => setSelectedOfferId(offer.id)}>
                    عرض التفاصيل
                  </button>
                </div>
              </div>
            ))
        )}
      </div>
    </>
  );
}
