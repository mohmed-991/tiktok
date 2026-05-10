import React from 'react';

export default function UserDashboard({
  user,
  mapRef,
  distanceText,
  fromAddress,
  toAddress,
  searchTerm,
  searchMode,
  searchResults,
  locationError,
  suggestedPrice,
  loading,
  onDetectLocation,
  onSearchAddress,
  onSelectSearchResult,
  setSearchMode,
  setSearchTerm,
  setFromAddress,
  setToAddress,
  setSuggestedPrice,
  onCreateRequest,
  onLogout,
}) {
  return (
    <>
      <div className="dashboard-header">
        <div>
          <p>مرحبًا {user.name}</p>
          <h2>حدد سعرك وابدأ المفاوضة</h2>
          <p>{distanceText}</p>
        </div>
        <button className="secondary-btn" onClick={onLogout}>
          خروج
        </button>
      </div>

      <div className="booking-shell">
        <div className="booking-panel">
          <div className="booking-step">
            <h3>1. اختر الموقع</h3>
            <div className="location-actions">
              <button type="button" onClick={onDetectLocation}>
                استخدم موقعي الحالي
              </button>
              <button type="button" onClick={() => setSearchMode('from')}>
                نقطة الانطلاق
              </button>
              <button type="button" onClick={() => setSearchMode('to')}>
                نقطة الوصول
              </button>
            </div>
            <input value={searchTerm} placeholder="ابحث عن عنوان أو شارع" onChange={(e) => setSearchTerm(e.target.value)} />
            <button type="button" onClick={onSearchAddress}>
              بحث
            </button>
            {searchResults.length > 0 && (
              <div className="search-results">
                {searchResults.map((item) => (
                  <button key={item.place_id} type="button" onClick={() => onSelectSearchResult(item)}>
                    {item.description}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="booking-step">
            <h3>2. حدد سعرك</h3>
            <input
              type="range"
              min="15"
              max="120"
              value={suggestedPrice}
              onChange={(e) => setSuggestedPrice(e.target.value)}
            />
            <div className="price-summary">
              <strong>{suggestedPrice} جنيه</strong>
              <span>السعر المقترح من النظام</span>
            </div>
          </div>

          <div className="booking-step">
            <h3>3. اطلب الرحلة</h3>
            <div className="form-grid">
              <input value={fromAddress} placeholder="من" onChange={(e) => setFromAddress(e.target.value)} />
              <input value={toAddress} placeholder="إلى" onChange={(e) => setToAddress(e.target.value)} />
              <button disabled={loading} onClick={onCreateRequest}>
                اطلب الرحلة الآن
              </button>
            </div>
            {locationError && <div className="message-box">{locationError}</div>}
          </div>
        </div>

        <div className="map-panel">
          <div ref={mapRef} id="map-container" className="map-box"></div>
        </div>
      </div>
    </>
  );
}
