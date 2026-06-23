    import { useState } from "react";
    import { useLocation, useNavigate } from "react-router-dom";

    export default function Auth() {

        const location = useLocation();
        const navigate = useNavigate();

        
    const [mode, setMode] = useState(
    location.state?.mode || "register"
);

const [role, setRole] = useState(
    location.state?.role || "customer"
);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log({
        mode,
        role,
        ...formData,
        });

        alert(
        mode === "register"
            ? "تم إنشاء الحساب بنجاح"
            : "تم تسجيل الدخول"
        );
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-6">

            {/* Logo */}
            <div className="text-center mb-6">
            <div className="w-14 h-14 bg-green-600 rounded-2xl mx-auto flex items-center justify-center text-white text-2xl font-bold">
                م
            </div>

            <h1 className="text-2xl font-bold mt-3">
                مشوار
            </h1>
            </div>

            {/* Tabs */}
            <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            <button
                onClick={() => setMode("login")}
                className={`cursor-pointer w-1/2 py-3 rounded-lg font-medium transition-all ${
                mode === "login"
                    ? "bg-white shadow text-green-600"
                    : "text-gray-500"
                }`}
            >
                تسجيل دخول
            </button>

            <button
                onClick={() => setMode("register")}
                className={`cursor-pointer w-1/2 py-3 rounded-lg font-medium transition-all ${
                mode === "register"
                    ? "bg-white shadow text-green-600"
                    : "text-gray-500"
                }`}
            >
                حساب جديد
            </button>
            </div>

            {/* Account Type */}
            <div className="mb-6">
            <h3 className="font-semibold mb-3">
                نوع الحساب
            </h3>

            <div className="flex gap-3">
                <button
                type="button"
                onClick={() => setRole("customer")}
                className={`cursor-pointer flex-1 py-3 rounded-xl border transition-all ${
                    role === "customer"
                    ? "border-green-600 bg-green-50 text-green-600"
                    : "border-gray-300"
                }`}
                >
                عميل
                </button>

                <button
                type="button"
                onClick={() => setRole("driver")}
                className={`cursor-pointer flex-1 py-3 rounded-xl border transition-all ${
                    role === "driver"
                    ? "border-green-600 bg-green-50 text-green-600"
                    : "border-gray-300"
                }`}
                >
                سائق
                </button>
            </div>
            </div>

            {/* Form */}
            <form
            onSubmit={handleSubmit}
            className="space-y-4"
            >
            {mode === "register" && (
                <div>
                <label className="block mb-2 font-medium">
                    الاسم بالكامل
                </label>

                <input
                    type="text"
                    name="name"
                    placeholder="أدخل الاسم"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border rounded-xl p-3 outline-none focus:border-green-600"
                />
                </div>
            )}

            <div>
                <label className="block mb-2 font-medium">
                رقم الموبايل
                </label>

                <input
                type="tel"
                name="phone"
                placeholder="01xxxxxxxxx"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 outline-none focus:border-green-600"
                />
            </div>

            <div>
                <label className="block mb-2 font-medium">
                كلمة المرور
                </label>

                <input
                type="password"
                name="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 outline-none focus:border-green-600"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition-all cursor-pointer"
            >
                {mode === "register"
                ? "إنشاء الحساب"
                : "تسجيل الدخول"}
            </button>
            </form>

            <div className="text-center mt-6">
            <button
    onClick={() => navigate("/")}
    className="text-gray-500 hover:text-green-600 cursor-pointer"
>
                رجوع للصفحة الرئيسية
            </button>
            </div>
        </div>
        </div>
    );
    }