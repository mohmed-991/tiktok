
import { useNavigate } from "react-router-dom";
    export default function Navbar() {
        const navigate = useNavigate();
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
            onClick={() =>
    navigate("/auth", {
        state: {
        role: "customer",
        mode: "register",
        },
    })
    }

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