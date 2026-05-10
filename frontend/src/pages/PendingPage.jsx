import React from 'react';

export default function PendingPage({ pendingMessage, onLogout }) {
  return (
    <div className="tracking-card">
      <h2>حسابك تحت المراجعة</h2>
      <p>{pendingMessage}</p>
      <p>سنراجع بياناتك ونفعّل الحساب بعد التحقق من المستندات.</p>
      <button className="secondary-btn" onClick={onLogout}>
        خروج
      </button>
    </div>
  );
}
