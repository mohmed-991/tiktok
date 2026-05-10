import React from 'react';

export default function LandingPage({ onStart, onBecomeDriver, onLogin, onRegister }) {
  return (
    <section className="hero">
      <div>
        <p className="eyebrow">Toktok Booking</p>
        <h1>حدد سعرك... واختار السواق المناسب ليك</h1>
        <p>اختر نقطة الانطلاق والوصول، اضبط السعر، واستقبل عروض السواقين مباشرة.</p>
        <div className="hero-actions">
          <button onClick={onStart}>ابدأ الرحلة الآن</button>
          <button className="secondary-btn" onClick={onBecomeDriver}>
            كن سائق
          </button>
        </div>
      </div>
      <div className="hero-card">
        <p>إبدأ دلوقتي:</p>
        <ul>
          <li>اختر موقعك أو اكتب العنوان يدويًا</li>
          <li>السائق هو اللي بيعرض السعر</li>
          <li>إدارة تراجع الحساب قبل التفعيل</li>
          <li>لوحة تحكم كاملة للمدير</li>
        </ul>
      </div>
    </section>
  );
}
