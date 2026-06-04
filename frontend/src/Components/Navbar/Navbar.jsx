
    export default function Navbar() {
    return (
        <nav>
        <ul
            className="
            hidden
            md:flex
            items-center
            gap-10
            font-semibold
            text-lg
            "
        >
            <li>
            <a href="#">كيف يعمل</a>
            </li>

            <li>
            <a href="#">المميزات</a>
            </li>

            <li>
            <a href="#">تواصل معنا</a>
            </li>

            <li>
            <button
                className="
                bg-green-600
                text-white
                px-5
                py-2
                rounded-xl
                text-sm
                "
            >
                دخول
            </button>
            </li>
        </ul>
        </nav>
    );
    }