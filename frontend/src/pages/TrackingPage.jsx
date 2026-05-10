import React from 'react';

export default function TrackingPage() {
  return (
    <div className="tracking-card tracking-shell">
      <div className="track-map-panel">
        <h2>تتبع الرحلة</h2>
        <p>السائق يتجه نحو نقطة الالتقاء الآن.</p>
      </div>
      <div className="track-bottom-panel">
        <div>
          <p className="driver-name">سائقك: أحمد</p>
          <p>رقم العربية: 12345</p>
          <p>ETA: 7 دقائق</p>
        </div>
        <div className="chat-actions">
          <button>📞 اتصل</button>
          <button>💬 دردشة</button>
        </div>
      </div>
    </div>
  );
}
