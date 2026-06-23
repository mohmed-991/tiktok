    export default function Footer() {
    return (
        <footer
        className="
        border-t
        border-gray-200
        py-8
        px-5
        "
        >
        <div
            className="
            max-w-7xl
            mx-auto
            flex
            flex-col
            md:flex-row
            justify-between
            items-center
            gap-6
            "
        >
            <div
            className="
            flex
            gap-8
            text-gray-600
            "
            >
            <a
                href="#"
                className="hover:text-green-600 transition"
            >
                سياسة الخصوصية
            </a>

            <a
                href="#"
                className="hover:text-green-600 transition"
            >
                الشروط والأحكام
            </a>

            <a
                href="#"
                className="hover:text-green-600 transition"
            >
                الدعم
            </a>
            </div>

            <p className="text-gray-500">
            © 2026 مشوار — جميع الحقوق محفوظة
            </p>
        </div>
        </footer>
    );
    }