import React from 'react';

export default function AuthPage({
  mode,
  role,
  name,
  phone,
  password,
  vehicleNumber,
  licenseNumber,
  driverAddress,
  setRole,
  setName,
  setPhone,
  setPassword,
  setVehicleNumber,
  setLicenseNumber,
  setDriverAddress,
  setDocumentFront,
  setDocumentBack,
  setToktokPhoto,
  onLogin,
  onRegister,
  onSwitchMode,
  loading,
}) {
  return (
    <div className="auth-shell">
      <h2>{mode === 'login' ? 'تسجيل دخول' : 'إنشاء حساب'}</h2>
      <div className="role-box">
        <button className={role === 'user' ? 'active' : ''} onClick={() => setRole('user')}>
          مستخدم
        </button>
        <button className={role === 'driver' ? 'active' : ''} onClick={() => setRole('driver')}>
          سائق
        </button>
      </div>
      <div className="form-grid">
        {mode === 'register' && <input value={name} placeholder="الاسم" onChange={(e) => setName(e.target.value)} />}
        <input value={phone} placeholder="رقم الموبايل" onChange={(e) => setPhone(e.target.value)} />
        <input type="password" value={password} placeholder="كلمة المرور" onChange={(e) => setPassword(e.target.value)} />

        {mode === 'register' && role === 'driver' && (
          <>
            <input value={vehicleNumber} placeholder="رقم التوكتوك" onChange={(e) => setVehicleNumber(e.target.value)} />
            <input value={licenseNumber} placeholder="رقم رخصة السائق" onChange={(e) => setLicenseNumber(e.target.value)} />
            <input value={driverAddress} placeholder="عنوانك بالتفصيل" onChange={(e) => setDriverAddress(e.target.value)} />
            <input type="file" accept="image/*" onChange={(e) => setDocumentFront(e.target.files[0])} />
            <input type="file" accept="image/*" onChange={(e) => setDocumentBack(e.target.files[0])} />
            <input type="file" accept="image/*" onChange={(e) => setToktokPhoto(e.target.files[0])} />
          </>
        )}

        <button disabled={loading} onClick={mode === 'login' ? onLogin : onRegister}>
          {mode === 'login' ? 'دخول' : 'إنشاء حساب'}
        </button>
        <button className="secondary-btn" onClick={onSwitchMode}>
          {mode === 'login' ? 'ليس لديك حساب؟ سجل الآن' : 'لديك حساب؟ سجل دخول'}
        </button>
      </div>
    </div>
  );
}
