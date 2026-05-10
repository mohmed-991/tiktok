import React from 'react';

export default function AdminDashboard({ adminDrivers, loadPendingAccounts, approveAccount, onLogout }) {
  return (
    <>
      <div className="dashboard-header">
        <div>
          <p>أهلاً بك في لوحة الإدارة</p>
          <h2>التحكم الكامل في الموقع</h2>
          <p>راجع الحسابات المعلقة وافعل الحسابات بعد التحقق من المستندات.</p>
        </div>
        <button className="secondary-btn" onClick={onLogout}>
          خروج
        </button>
      </div>
      <button className="secondary-btn" onClick={loadPendingAccounts}>
        تحميل الحسابات المعلقة
      </button>
      <div className="offer-list">
        {adminDrivers.length === 0 ? (
          <div className="empty-state">لا توجد حسابات قيد الانتظار.</div>
        ) : (
          adminDrivers.map((account) => (
            <div key={account.id} className="offer-card">
              <div>
                <p>الاسم: {account.name}</p>
                <p>الهاتف: {account.phone}</p>
                <p>الدور: {account.role === 'driver' ? 'سائق' : 'مستخدم'}</p>
                {account.role === 'driver' && <p>التوكتوك: {account.vehicle_number}</p>}
                <p>العنوان: {account.address || 'غير متوفر'}</p>
                {account.role === 'driver' && <p>الرخصة: {account.license_number || 'غير متوفر'}</p>}
                <p>المستندات: {account.document_front || account.document_back ? 'موجودة' : 'غير متاحة'}</p>
              </div>
              <button onClick={() => approveAccount(account.id)}>تفعيل الحساب</button>
            </div>
          ))
        )}
      </div>
    </>
  );
}
